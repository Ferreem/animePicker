export default function AnimeFetcher(limit = 1000, genres = [], themes = []) {
  const PAGE_SIZE = 25;

  const fetchAnime = async (genreIds, themeIds, fetchLimit) => {
    let allAnime = [];
    let page = 1;

    while (allAnime.length < fetchLimit) {
      const remainingLimit = fetchLimit - allAnime.length;
      const currentPageSize = Math.min(remainingLimit, PAGE_SIZE);

      let url = `https://api.jikan.moe/v4/anime?order_by=score&sort=desc&page=${page}&limit=${currentPageSize}`;
      
      if (genreIds.length > 0) {
        url += `&genres=${genreIds.join(",")}`;
      }
      if (themeIds.length > 0) {
        url += `&themes=${themeIds.join(",")}`;
      }

      console.log(`Fetching page ${page}, requesting ${currentPageSize} items...`);

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`API error: ${data.error || response.statusText}`);
      }

      if (!data || !data.data || !Array.isArray(data.data)) {
        console.error("Unexpected API response structure:", data);
        break;
      }

      const formattedData = data.data.map((anime) => ({
        id: anime.mal_id,
        title: anime.title,
        imageUrl: anime.images?.jpg?.image_url || "",
        videoUrl: anime.trailer?.url,
        synopsis: anime.synopsis,
        score: anime.score,
        rank: anime.rank,
        popularity: anime.popularity,
        link: anime.url,
        genres: anime.genres,
        themes: anime.themes,
      }));

      allAnime = [...allAnime, ...formattedData];

      if (data.pagination?.has_next_page === false) {
        break;
      }

      page++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return allAnime;
  };

  const fetchCount = async (genreIds, themeIds) => {
    let url = `https://api.jikan.moe/v4/anime?`;
    
    if (genreIds.length > 0) {
      url += `genres=${genreIds.join(",")}&`;
    }
    if (themeIds.length > 0) {
      url += `themes=${themeIds.join(",")}&`;
    }

    url += 'limit=1';

    console.log(`Fetching count for genres ${genreIds} and themes ${themeIds}`);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API error: ${data.error || response.statusText}`);
    }

    return data.pagination?.items?.total || 0;
  };

  return {
    fetch: async () => {
      try {
        if (genres.length === 0 && themes.length === 0) {
          // Default behavior: fetch top anime
          console.log("Fetching top anime");
          return await fetchAnime([], [], limit);
        } else {
          let counts = {};
          let lowestCount = Infinity;
          let lowestCountCategory = null;

          // Get counts for each genre and theme
          for (const genre of genres) {
            counts[`genre_${genre}`] = await fetchCount([genre], []);
            if (counts[`genre_${genre}`] < lowestCount) {
              lowestCount = counts[`genre_${genre}`];
              lowestCountCategory = { type: 'genre', id: genre };
            }
          }

          for (const theme of themes) {
            counts[`theme_${theme}`] = await fetchCount([], [theme]);
            if (counts[`theme_${theme}`] < lowestCount) {
              lowestCount = counts[`theme_${theme}`];
              lowestCountCategory = { type: 'theme', id: theme };
            }
          }

          console.log("Anime counts:", counts);
          console.log("Lowest count category:", lowestCountCategory);

          let filteredAnime = [];
          let fetchedCount = 0;

          while (filteredAnime.length < limit) {
            // Fetch more anime based on the lowest count category
            const fetchedAnime = await fetchAnime(
              lowestCountCategory.type === 'genre' ? [lowestCountCategory.id] : [],
              lowestCountCategory.type === 'theme' ? [lowestCountCategory.id] : [],
              PAGE_SIZE
            );

            if (fetchedAnime.length === 0) {
              console.log("No more anime available to fetch");
              break;
            }

            // Filter the fetched anime to ensure they have all specified genres and themes
            const newFilteredAnime = fetchedAnime.filter(anime => 
              genres.every(genreId => anime.genres.some(g => g.mal_id === parseInt(genreId))) &&
              themes.every(themeId => anime.themes.some(t => t.mal_id === parseInt(themeId)))
            );

            filteredAnime = [...filteredAnime, ...newFilteredAnime];
            fetchedCount += fetchedAnime.length;

            console.log(`Fetched ${fetchedCount} anime, filtered ${filteredAnime.length}`);

            if (fetchedCount >= lowestCount) {
              console.log("Reached the total count for the lowest category");
              break;
            }
          }

          console.log(`Total anime after filtering: ${filteredAnime.length}`);
          return filteredAnime.slice(0, limit);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
  };
}