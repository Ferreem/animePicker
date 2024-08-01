import { useEffect, useState } from "react";
import AnimeFetcher from "../components/AnimeFetcher";
import Footer from "../components/Footer";
import Heart from "../styles/images/heart.png";
import Cross from "../styles/images/cross.png";
import AppButton from "../components/AppButton";
import Settings from "../components/Settings";
import Result from "../components/Result";
import Stop from "../styles/images/stop.png";
import Background from "../styles/images/background.jpg"; // Import the background image

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1`
    : null;
}

export default function App() {
  const [currentAnime, setCurrentAnime] = useState(null);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [savedAnimeArray, setSavedAnimeArray] = useState([]);
  const [showSettings, setShowSettings] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [animeList, setAnimeList] = useState([]);
  const [animeCount, setAnimeCount] = useState(25); 

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const fetcher = AnimeFetcher(animeCount); // Use animeCount instead of hardcoded value
        const fetchedAnimeList = await fetcher.fetch();
        console.log('Fetched anime list:', fetchedAnimeList);
        if (fetchedAnimeList.length === 0) {
          console.error('No anime data fetched');
        } else {
          setAnimeList(fetchedAnimeList);
        }
      } catch (error) {
        console.error('Error in fetchAnime:', error);
      }
    };
  
    fetchAnime();
  }, [animeCount]); // Add animeCount as a dependency

  useEffect(() => {
    if (animeList.length > 0 && generatedNumbers.length === 0) {
      setCurrentAnime(animeList[0]);
      setGeneratedNumbers([0]);
    }
  }, [animeList, generatedNumbers]);

  useEffect(() => {
    setGeneratedNumbers([]);
  }, [animeList]);

  const nextAnime = () => {
    if (generatedNumbers.length >= animeList.length) {
      if (animeList.length == 1) {
        console.log("YOU DID IT");
        return;
      }
      setGeneratedNumbers([]);
      setShowResult(true);
      return;
    }
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * animeList.length);
    } while (generatedNumbers.includes(nextIndex));

    setGeneratedNumbers((prevNumbers) => [...prevNumbers, nextIndex]);
    setCurrentAnime(animeList[nextIndex]);
  };

  const savedAnime = () => {
    if (!savedAnimeArray.some((anime) => anime.id === currentAnime.id)) {
      setSavedAnimeArray((prevArray) => [...prevArray, currentAnime]);
    }
    nextAnime();
  };

  const triggerNewFetch = () => {
    setGeneratedNumbers([]);
    setCurrentAnime(null);
    // The useEffect will handle the actual fetching
  };

  if (!currentAnime) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="h-screen w-screen flex items-center justify-center box-border bg-cover -z-10"
      style={{
        backgroundImage: `url(${Background})`,
        zIndex: -2,
      }}
    >
      <div className="window w-1/4 min-w-[370px] h-5/6 border-2 border-cyan-900 rounded-xl flex flex-col items-center flex-shrink-0">
        <div className="screen w-full h-full border-2 border-cyan-900 rounded-xl relative overflow-hidden flex flex-col items-center flex-shrink-0">
          {showSettings ? (
            <Settings showSettings={showSettings} 
             setShowSettings={setShowSettings}
             animeCount={animeCount}
             setAnimeCount={setAnimeCount}
             triggerNewFetch={triggerNewFetch}
             />
             
          ) : showResult ? (
            <Result
              showResult={showResult}
              setShowResult={setShowResult}
              savedAnimeArray={savedAnimeArray}
              setSavedAnimeArray={setSavedAnimeArray}
              setAnimeList={setAnimeList}
              setGeneratedNumbers={setGeneratedNumbers}
              nextAnime={nextAnime}
              setCurrentAnime={setCurrentAnime}
            />
          ) : (
            <>
              <div className="w-4/5 h-2/4 rounded-xl mt-8 flex-shrink-0 z-50">
              {currentAnime.videoUrl && getYouTubeEmbedUrl(currentAnime.videoUrl) ? (
    <iframe
      className="rounded-xl w-full h-full z-50"
      src={getYouTubeEmbedUrl(currentAnime.videoUrl)}
      title={currentAnime.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      onError={(e) => console.error("iframe error:", e)}
    >
      <p>Your browser does not support iframes.</p>
    </iframe>
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <p>No video available or failed to load</p>
    </div>
  )}      </div>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${currentAnime.imageUrl})`,
                  filter: "brightness(80%) blur(5px)",
                  
                }}
              ></div>

              <div className="z-10 p-2 left-3 text-xl flex flex-col items-start w-full overflow-y-auto flex-grow">
                <div className="flex-wrap w-full">
                  <p className="text-3xl font-bold break-words">
                    {currentAnime.title}
                  </p>
                </div>
                <ul className="genres flex mt-3 flex-wrap w-full">
                  {[
                    ...(currentAnime.genres?.map((g) => ({ ...g, type: "genre" })) || []),
                    ...(currentAnime.themes?.map((t) => ({ ...t, type: "theme" })) || []),
                  ].map((item, index) => (
                    <li
                      className={`mr-2 mb-1 mt-2 text-xs rounded-full p-1 ${
                        item.type === "genre" ? "bg-white text-slate-900" : "bg-slate-700 text-white"
                      }`}
                      key={index}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>

                <div className="rating font-semibold">
                  Rating: {currentAnime.score}
                </div>
                <div className="popularity font-semibold">
                  Popularity: {currentAnime.popularity}
                </div>
                <div className="ranked font-semibold">
                  Ranked: {currentAnime.rank}
                </div>
              </div>
              <div className="absolute bottom-8 w-full flex justify-center z-20">
                <AppButton icon={Heart} onClick={savedAnime} />
                <AppButton icon={Cross} onClick={nextAnime} />
                <AppButton icon={Stop} onClick={() => setShowResult(true)} />
              </div>
              <div className="flex justify-center">
                <div className=" w-full">
                  <Footer synopsis={currentAnime.synopsis} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
