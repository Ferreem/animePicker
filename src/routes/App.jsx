import { useEffect, useState } from "react";
import AnimeFetcher from "../components/AnimeFetcher";

export default function App() {
  const animeList = AnimeFetcher();
  const [currentAnime, setCurrentAnime] = useState(null);

  useEffect(() => {
    if (animeList.length > 0) {
      setCurrentAnime(animeList[0]);
    }
  }, [animeList]);

  if (!currentAnime) {
    return <div>Loading...</div>;
  }

  const nextAnime = () => {
    const currentIndex = animeList.findIndex(
      (anime) => anime.id === currentAnime.id
    );
    const nextIndex = (currentIndex + 1) % animeList.length;
    setCurrentAnime(animeList[nextIndex]);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center box-border">
      <div className="window w-2/6 h-5/6 border-2 border-cyan-900 rounded-xl flex flex-col items-center">
        <div className="screen w-5/6 h-full border-2 border-cyan-900 rounded-xl my-8 relative overflow-hidden flex justify-center">
          <div className="w-4/5 h-2/4 rounded-xl mt-8">
            {currentAnime.videoUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={`${currentAnime.videoUrl.replace("watch?v=", "embed/")}?autoplay=1`}
                title={currentAnime.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No video available</p>
            )}
          </div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentAnime.imageUrl})`,
              filter: 'brightness(80%) blur(5px)', // Adjust these values as needed
              zIndex: -1,
            }}
          ></div>
          <div className="absolute z-10 p-2 left-1 bottom-16 text-2xl">
            <p className="text-white">{currentAnime.title}</p>
          </div>
        </div>
        <button onClick={nextAnime} className="mt-4 px-4 py-2 bg-cyan-900 text-white rounded">
          Next Anime
        </button>
      </div>
    </div>
  );
}
