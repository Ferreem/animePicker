import React from "react";

export default function Result({ showResult, setShowResult, savedAnimeArray, setSavedAnimeArray }) {
  
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

    const handleClick = () => {
    setSavedAnimeArray([]);
    setShowResult(false);
    }



  return (
    <div className="h-full w-full bg-slate-900 z-50 inset-0 flex flex-col text-white">
      <h1 className="flex justify-center text-2xl my-4">Anime you picked</h1>
      <div className="flex-grow overflow-y-auto px-1"
        style={scrollbarStyle}>
        <ul>
          {savedAnimeArray.map((anime, index) => (
            <li key={index} className="mb-2 flex flex-col border-b-2 pb-2">
            <div className="flex justify-between">
                <div className="flex flex-col">
                <span className="font-bold">{anime.title}</span>
                <span >{anime.score}</span>
                </div>
                <img src={anime.imageUrl} alt="" className="h-28" />
            </div>
              <div>
              <button className="text-xs" onClick={() => {window.open(anime.link)}}>{anime.link}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-500  px-4 py-2 rounded m-4"
      >
        Reduce more
      </button>
    </div>
  );
}