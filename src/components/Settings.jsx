import React, { useState } from "react";

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Cars" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Avant Garde" },
  { id: 6, name: "Demons" },
  { id: 7, name: "Mystery" },
  { id: 8, name: "Drama" },
  { id: 9, name: "Ecchi" },
  { id: 10, name: "Fantasy" },
  { id: 11, name: "Game" },
  { id: 12, name: "Historical" },
  { id: 13, name: "Horror" },
  { id: 14, name: "Kids" },
  { id: 15, name: "Martial Arts" },
  { id: 16, name: "Mecha" },
  { id: 17, name: "Music" },
  { id: 18, name: "Parody" },
  { id: 19, name: "Samurai" },
  { id: 20, name: "Romance" },
  { id: 21, name: "School" },
  { id: 22, name: "Sci-Fi" },
  { id: 23, name: "Shoujo" },
  { id: 24, name: "Shoujo Ai" },
  { id: 25, name: "Shounen" },
  { id: 26, name: "Shounen Ai" },
  { id: 27, name: "Space" },
  { id: 28, name: "Sports" },
  { id: 29, name: "Super Power" },
  { id: 30, name: "Vampire" },
  { id: 31, name: "Harem" },
  { id: 32, name: "Slice of Life" },
  { id: 33, name: "Supernatural" },
  { id: 34, name: "Military" },
  { id: 35, name: "Police" },
  { id: 36, name: "Psychological" },
  { id: 37, name: "Suspense" },
  { id: 38, name: "Seinen" },
  { id: 39, name: "Josei" },
  { id: 40, name: "Award Winning" },
  { id: 41, name: "Gourmet" },
  { id: 42, name: "Work Life" },
  { id: 43, name: "Erotica" }
];

const themes = [
  { id: 62, name: "Isekai" },
  { id: 63, name: "Time Travel" },
  { id: 64, name: "Survival" },
  { id: 65, name: "Reincarnation" },
  { id: 66, name: "Love Polygon" },
  { id: 67, name: "Magical Sex Shift" },
  { id: 68, name: "Anthropomorphic" },
  { id: 69, name: "Mahou Shoujo" },
  { id: 70, name: "Maid" },
  { id: 71, name: "Organized Crime" },
  { id: 72, name: "Romantic Subtext" },
  { id: 73, name: "Male Protagonist" },
  { id: 74, name: "Female Protagonist" },
  { id: 75, name: "Crossdressing" },
  { id: 76, name: "Primarily Adult Cast" },
  { id: 77, name: "Primarily Child Cast" },
  { id: 78, name: "Primarily Teen Cast" },
  { id: 79, name: "School Club" },
  { id: 80, name: "Idol" },
  { id: 81, name: "Combat Sports" },
  { id: 82, name: "Martial Arts" },
  { id: 83, name: "Delinquents" },
  { id: 84, name: "Educational" },
  { id: 85, name: "Gag Humor" },
  { id: 86, name: "Workplace" },
  { id: 87, name: "Family Life" },
  { id: 88, name: "Gore" },
  { id: 89, name: "High Stakes Game" },
  { id: 90, name: "Mythology" },
  { id: 91, name: "Shower Scene" },
  { id: 92, name: "Video Game" },
  { id: 93, name: "Medical" },
  { id: 94, name: "Space Opera" },
  { id: 95, name: "PSI Powers" },
  { id: 96, name: "Memory Manipulation" },
  { id: 97, name: "Otaku Culture" },
  { id: 98, name: "Body Horror" },
  { id: 99, name: "Cosmic Horror" },
  { id: 100, name: "Tragedy" },
  { id: 101, name: "Revenge" },
  { id: 102, name: "Cultivation" },
  { id: 103, name: "Dystopian" },
  { id: 104, name: "Afterlife" },
  { id: 105, name: "Augmented Reality" },
  { id: 106, name: "Monster Girl" },
  { id: 107, name: "Virtual World" },
  { id: 108, name: "Satirical" }
];

export default function Settings({ showSettings, setShowSettings, animeCount, setAnimeCount, triggerNewFetch, setSelectedGenres, setSelectedThemes }) {
  const [localGenres, setLocalGenres] = useState([]);
  const [localThemes, setLocalThemes] = useState([]);


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
    setShowSettings(false);
    setSelectedGenres(localGenres);
    setSelectedThemes(localThemes);
    setShowLoading(true);

  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setAnimeCount('');
    } else {
      const numValue = Number(value);
      setAnimeCount(isNaN(numValue) ? '' : numValue);
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
              value={animeCount} 
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
          <div className="filters mt-4">
            <p className="mb-2">Select Themes:</p>
            <div className="grid grid-cols-3 gap-2">
              {themes.map(theme => (
                <label key={theme.id} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    value={theme.id}
                    checked={localThemes.includes(theme.id)}
                    onChange={handleThemeChange}
                    className="mr-1"
                  />
                  {theme.name}
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