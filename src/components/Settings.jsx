import React from "react";

export default function Settings({ showSettings, setShowSettings, animeCount, setAnimeCount, triggerNewFetch }) {

  const back = () => {
    setShowSettings(false);
    triggerNewFetch();
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

  return (
    <>
      <div className="h-full w-full bg-slate-900 z-50 inset-0 m flex flex-col justify-center items-center font-bold">
        <label className="flex flex-col w-2/4 mb-16">
          How many animes to find (searching from top Ranked):
          <input 
            type="number" 
            className="mt-4 p-1 text-slate-900" 
            value={animeCount} 
            onChange={handleInputChange}
          />
          <button className="mt-8 p-2 border-2" onClick={back}>Submit</button>
        </label>
      </div>
    </>
  );
}