import { useState, useEffect } from 'react';

const STORAGE_KEY = 'animeData';

const fetchTopAnime = async (limit = 10) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    return data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      imageUrl: anime.images.jpg.image_url,
      videoUrl: anime.trailer?.url,
      synopsis: anime.synopsis,
      score: anime.score,
      rank: anime.rank,
      popularity: anime.popularity,
      link: anime.url
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const AnimeFetcher = () => {
  const [animeList, setAnimeList] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const loadAnimeData = async () => {
      // Check if data exists in localStorage
      const storedData = localStorage.getItem(STORAGE_KEY);
      
      if (storedData) {
        // If data exists, use it
        setAnimeList(JSON.parse(storedData));
        setIsDataFetched(true);
      } else {
        // If no data in localStorage, fetch it
        const formattedAnimeList = await fetchTopAnime();
        setAnimeList(formattedAnimeList);
        setIsDataFetched(true);
        // Store the fetched data in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formattedAnimeList));
      }
    };

    if (!isDataFetched) {
      loadAnimeData();
    }
  }, [isDataFetched]);

  return animeList;
};

export default AnimeFetcher;