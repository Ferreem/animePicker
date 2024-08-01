// AnimeFetcher.js
export default function AnimeFetcher(limit = 1000) {
  const PAGE_SIZE = 25; // MyAnimeList API typically allows up to 25 items per page

  return {
    fetch: async () => {
      try {
        let allAnime = [];
        let page = 1;
        
        while (allAnime.length < limit) {
          const remainingLimit = limit - allAnime.length;
          const currentPageSize = Math.min(remainingLimit, PAGE_SIZE);
          
          console.log(`Fetching page ${page}, requesting ${currentPageSize} items...`);
          
          const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&limit=${currentPageSize}`);
          const data = await response.json();

          console.log(`API Response for page ${page}:`, data);

          if (!response.ok) {
            throw new Error(`API error: ${data.error || response.statusText}`);
          }

          if (!data || !data.data || !Array.isArray(data.data)) {
            console.error('Unexpected API response structure:', data);
            break;
          }

          const formattedData = data.data.map(anime => ({
            id: anime.mal_id,
            title: anime.title,
            imageUrl: anime.images?.jpg?.image_url || '',
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

          if (data.pagination?.has_next_page === false) {
            console.log('No more pages available');
            break;
          }

          page++;

          // Add a delay to respect rate limiting
          console.log('Waiting for 1 second before next request...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log(`Final total anime fetched: ${allAnime.length}`);
        return allAnime;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    }
  };
}