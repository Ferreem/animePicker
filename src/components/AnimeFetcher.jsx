// AnimeFetcher.js
export default function AnimeFetcher(limit = 10) {
  return {
    fetch: async () => {
      try {
        // Use a smaller limit, as the API might have restrictions
        await(1000);
        const safeLimit = Math.min(limit, 25); // Restrict to max 25 items
        const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${safeLimit}`);
        const data = await response.json();

        console.log('Raw API response:', data); // Log the raw response

        if (!response.ok) {
          throw new Error(`API error: ${data.error || response.statusText}`);
        }

        if (!data || !data.data || !Array.isArray(data.data)) {
          console.error('Unexpected API response structure:', data);
          return [];
        }
        
        return data.data.map(anime => ({
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
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    }
  };
}