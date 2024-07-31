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
        <h1 className="flex justify-center text-2xl my-4 font-bold">Anime you picked!</h1>
        <div className="flex-grow overflow-y-auto px-1" style={scrollbarStyle}>
          {savedAnimeArray && savedAnimeArray.length > 0 ? (
            <ul>
              {savedAnimeArray.map((anime, index) => (
                <li key={index} className="mb-2 flex flex-col border-b-2 pb-2 ml-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-bold text-2xl backdrop:">{anime.title}</span>
                      <span className="mt-1">{anime.score}</span>
                      <ul className="genres flex mt-3 flex-wrap">
                        {[
                          ...(anime.genres?.map(g => ({...g, type: 'genre'})) || []),
                          ...(anime.themes?.map(t => ({...t, type: 'theme'})) || [])
                        ].map((item, index) => (
                          <li 
                            className={`mr-2 mb-1 mt-2 text-xs rounded-full p-1 ${
                              item.type === 'genre' ? 'bg-white text-slate-900' : 'bg-slate-700 text-white'
                            }`} 
                            key={index}
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <img src={anime.imageUrl} alt={anime.title} className="h-28" />
                  </div>
                  <div>
                    <button className="text-xs mt-2" onClick={() => {window.open(anime.link)}}>
                      {anime.link}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No anime selected yet.</p>
          )}
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-500 px-4 py-2 rounded m-4"
        >
          Reduce more
        </button>
      </div>
    )
}