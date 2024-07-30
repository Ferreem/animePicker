import { useState, useEffect } from 'react';

const fetchTopAnime = async (limit = 25) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      imageUrl: anime.images.jpg.image_url,
      videoUrl: anime.trailer?.url, // Use videoUrl to be consistent
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const AnimeFetcher = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const loadAnimeData = async () => {
      const formattedAnimeList = await fetchTopAnime();
      console.log(formattedAnimeList);
      setAnimeList(formattedAnimeList);
    };
    loadAnimeData();
  }, []);

  return animeList;
};

export default AnimeFetcher;
