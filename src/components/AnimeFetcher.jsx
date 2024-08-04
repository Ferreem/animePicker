export default function AnimeFetcher(limit = 1000, genres = [], themes = []) {
  const PAGE_SIZE = 25;

  const fetchAnime = async (page, fetchLimit) => {
    let url = `https://api.jikan.moe/v4/anime?order_by=score&sort=desc&page=${page}&limit=${fetchLimit}`;
    
    if (genres.length > 0) {
      url += `&genres=${genres.join(",")}`;
    }
    if (themes.length > 0) {
      url += `&themes=${themes.join(",")}`;
    }

    console.log(`AnimeFetcher - Fetching page ${page}, requesting ${fetchLimit} items...`);
    console.log(`AnimeFetcher - URL:`, url);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API error: ${data.error || response.statusText}`);
    }

    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error("Unexpected API response structure:", data);
      return [];
    }

    return data.data.map((anime) => ({
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
  };

  return {
    fetch: async () => {
      console.log("AnimeFetcher - Starting fetch. Limit:", limit, "Genres:", genres, "Themes:", themes);
      try {
        let allAnime = [];
        let page = 1;

        while (allAnime.length < limit) {
          const remainingLimit = limit - allAnime.length;
          const currentPageSize = Math.min(remainingLimit, PAGE_SIZE);

          const fetchedAnime = await fetchAnime(page, currentPageSize);

          if (fetchedAnime.length === 0) {
            console.log("AnimeFetcher - No more anime available to fetch");
            break;
          }

          allAnime = [...allAnime, ...fetchedAnime];

          console.log(`AnimeFetcher - Fetched ${allAnime.length} anime`);

          if (fetchedAnime.length < currentPageSize) {
            break;
          }

          page++;
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Rate limiting
        }

        console.log(`AnimeFetcher - Total anime fetched: ${allAnime.length}`);
        return allAnime.slice(0, limit);
      } catch (error) {
        console.error("AnimeFetcher - Error fetching data:", error);
        return [];
      }
    },
  };
}