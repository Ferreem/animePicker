import React, { useState } from "react";

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 5, name: 'Avant Garde' },
  { id: 46, name: 'Award Winning' },
  { id: 28, name: 'Boys Love' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 26, name: 'Girls Love' },
  { id: 47, name: 'Gourmet' },
  { id: 14, name: 'Horror' },
  { id: 7, name: 'Mystery' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 36, name: 'Slice of Life' },
  { id: 30, name: 'Sports' },
  { id: 37, name: 'Supernatural' },
  { id: 41, name: 'Suspense' },
  { id: 9, name: 'Ecchi' },
  { id: 49, name: 'Erotica' },
  { id: 12, name: 'Hentai' },
  { id: 50, name: 'Adult Cast' },
  { id: 51, name: 'Anthropomorphic' },
  { id: 52, name: 'CGDCT' },
  { id: 53, name: 'Childcare' },
  { id: 54, name: 'Combat Sports' },
  { id: 81, name: 'Crossdressing' },
  { id: 55, name: 'Delinquents' },
  { id: 39, name: 'Detective' },
  { id: 56, name: 'Educational' },
  { id: 57, name: 'Gag Humor' },
  { id: 58, name: 'Gore' },
  { id: 35, name: 'Harem' },
  { id: 59, name: 'High Stakes Game' },
  { id: 13, name: 'Historical' },
  { id: 60, name: 'Idols (Female)' },
  { id: 61, name: 'Idols (Male)' },
  { id: 62, name: 'Isekai' },
  { id: 63, name: 'Iyashikei' },
  { id: 64, name: 'Love Polygon' },
  { id: 65, name: 'Magical Sex Shift' },
  { id: 66, name: 'Mahou Shoujo' },
  { id: 17, name: 'Martial Arts' },
  { id: 18, name: 'Mecha' },
  { id: 67, name: 'Medical' },
  { id: 38, name: 'Military' },
  { id: 19, name: 'Music' },
  { id: 6, name: 'Mythology' },
  { id: 68, name: 'Organized Crime' },
  { id: 69, name: 'Otaku Culture' },
  { id: 20, name: 'Parody' },
  { id: 70, name: 'Performing Arts' },
  { id: 71, name: 'Pets' },
  { id: 40, name: 'Psychological' },
  { id: 3, name: 'Racing' },
  { id: 72, name: 'Reincarnation' },
  { id: 73, name: 'Reverse Harem' },
  { id: 74, name: 'Romantic Subtext' },
  { id: 21, name: 'Samurai' },
  { id: 23, name: 'School' },
  { id: 75, name: 'Showbiz' },
  { id: 29, name: 'Space' },
  { id: 11, name: 'Strategy Game' },
  { id: 31, name: 'Super Power' },
  { id: 76, name: 'Survival' },
  { id: 77, name: 'Team Sports' },
  { id: 78, name: 'Time Travel' },
  { id: 32, name: 'Vampire' },
  { id: 79, name: 'Video Game' },
  { id: 80, name: 'Visual Arts' },
  { id: 48, name: 'Workplace' },
  { id: 43, name: 'Josei' },
  { id: 15, name: 'Kids' },
  { id: 42, name: 'Seinen' },
  { id: 25, name: 'Shoujo' },
  { id: 27, name: 'Shounen' }
];

export default function Settings({ showSettings, setShowSettings, animeCount, setAnimeCount, triggerNewFetch, setSelectedGenres, setSelectedThemes }) {
  const [localGenres, setLocalGenres] = useState([]);
  const [localThemes, setLocalThemes] = useState([]);
  const [localAnimeCount, setLocalAnimeCount] = useState(animeCount);


  const scrollbarStyle = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#3B82F6 #1F2937',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#1F2937', 
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#3B82F6', 
      borderRadius: '20px',
      border: '3px solid #1F2937', 
    },
};



const back = () => {
  console.log("Settings - Submitting. Genres:", localGenres, "Themes:", localThemes);
  setShowSettings(false);
  setSelectedGenres(localGenres);
  setSelectedThemes(localThemes);
  setAnimeCount(localAnimeCount);
  triggerNewFetch();
};

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setLocalAnimeCount('');
    } else {
      const numValue = Number(value);
      setLocalAnimeCount(isNaN(numValue) ? '' : numValue);
    }
  };

  const handleGenreChange = (e) => {
    const genreId = Number(e.target.value);
    setLocalGenres(prevGenres => 
      prevGenres.includes(genreId)
        ? prevGenres.filter(id => id !== genreId)
        : [...prevGenres, genreId]
    );
  };

  const handleThemeChange = (e) => {
    const themeId = Number(e.target.value);
    setLocalThemes(prevThemes => 
      prevThemes.includes(themeId)
        ? prevThemes.filter(id => id !== themeId)
        : [...prevThemes, themeId]
    );
  };

  return (
    <>
      <div className="h-full w-full bg-slate-900 z-50 inset-0 m flex flex-col items-center font-bold">
        <div className="flex flex-col w-full my-16 max-h-[80vh] overflow-y-auto px-4" style={scrollbarStyle}>
          <label className="mb-4">
            How many animes to find:
            <input 
              type="number" 
              className="mt-2 p-1 text-slate-900 w-full" 
              value={localAnimeCount} 
              onChange={handleInputChange}
            />
          </label>
          <div className="filters mt-4">
            <p className="mb-2">Select Genres:</p>
            <div className="grid grid-cols-3 gap-2">
              {genres.map(genre => (
                <label key={genre.id} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value={genre.id}
                    checked={localGenres.includes(genre.id)}
                    onChange={handleGenreChange}
                    className="mr-1"
                  />
                  {genre.name}
                </label>
              ))}
            </div>
          </div>
          <button className="mt-8 p-2 border-2" onClick={back}>Submit</button>
        </div>
      </div>
    </>
  );
}