export default function AnimeFetcher(limit = 1000, genres = [], themes = []) {
  const PAGE_SIZE = 25; 

  return {
    fetch: async () => {
      try {
        let allAnime = [];
        let page = 1;

        while (allAnime.length < limit) {
          const remainingLimit = limit - allAnime.length;
          const currentPageSize = Math.min(remainingLimit * 2, PAGE_SIZE);

          let url = `https://api.jikan.moe/v4/anime?order_by=score&sort=desc&page=${page}&limit=${currentPageSize}`;
          
          if (genres.length > 0) {
            url += `&genres=${genres.join(",")}`;
          }
          if (themes.length > 0) {
            url += `&themes=${themes.join(",")}`;
          }

          console.log(`Fetching page ${page}, requesting ${currentPageSize} items...`);

          const response = await fetch(url);
          const data = await response.json();
          console.log(`API Response for page ${page}:`, data);

          if (!response.ok) {
            throw new Error(`API error: ${data.error || response.statusText}`);
          }

          if (!data || !data.data || !Array.isArray(data.data)) {
            console.error("Unexpected API response structure:", data);
            break;
          }

          const formattedData = data.data
            .filter(anime => 
              genres.every(genreId => anime.genres.some(g => g.mal_id === parseInt(genreId))) &&
              themes.every(themeId => anime.themes.some(t => t.mal_id === parseInt(themeId)))
            )
            .map((anime) => ({
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

          console.log(`Total anime fetched so far: ${allAnime.length}`);

          if (data.pagination?.has_next_page === false || allAnime.length >= limit) {
            console.log("No more pages available or limit reached");
            break;
          }

          page++;

          // Add a delay to respect rate limiting
          console.log("Waiting for 1 second before next request...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        console.log(`Final total anime fetched: ${allAnime.length}`);
        return allAnime.slice(0, limit);
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
  };
}