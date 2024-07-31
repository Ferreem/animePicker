import React from "react";

export default function Settings({ showSettings, setShowSettings, animeCount, setAnimeCount, filterTop, setFilterTop }) {


  const handleAnimeCountChange = (e) => {
    setAnimeCount(e.target.value);
  };

  const handleFilterTopChange = (e) => {
    setFilterTop(e.target.value);
  };

  const back = () => {
    setShowSettings(false);
  };

  return (
    <>
      <div className="h-full w-full bg-slate-900 z-50 inset-0 flex flex-col">
        <button className="mt-4" onClick={back}>Back</button>
        <label className="flex flex-col mt-12">
          How many animes to find:
          <input type="number" className="mt-2 p-1" value={animeCount} onChange={handleAnimeCountChange}/>
        </label>
        <label className="mt-4 flex flex-col">
          Filter top:
          <input type="number" className="mt-2 p-1" value={filterTop} on onChange={handleFilterTopChange}/>
        </label>
      </div>
    </>
  );
}
