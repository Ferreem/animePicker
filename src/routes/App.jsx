import { useEffect, useState } from "react";
import AnimeFetcher from "../components/AnimeFetcher";
import Footer from "../components/Footer";
import Heart from "../styles/images/heart.png";
import Cross from "../styles/images/cross.png";
import AppButton from "../components/AppButton";
import Gear from "../styles/images/gear.png"
import Settings from "../components/Settings";
import Result from "../components/Result";

export default function App() {
  const [currentAnime, setCurrentAnime] = useState(null);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [savedAnimeArray, setSavedAnimeArray] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showResult, setShowResult] = useState(false);
  /*const [animeCount, setAnimeCount] = useState(0);
  const [filterTop, setFilterTop] = useState(300);*/
  const animeList = AnimeFetcher(/*animeCount, filterTop*/);

  useEffect(() => {
    if (animeList.length > 0 && !currentAnime) {
      setCurrentAnime(animeList[0]);
      setGeneratedNumbers([0]);
    }
  }, [animeList, currentAnime]);

  const nextAnime = () => {
    if (generatedNumbers.length === animeList.length) {
      setShowResult(true);
      return;
    }
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * animeList.length);
    } while (generatedNumbers.includes(nextIndex));

    setGeneratedNumbers(prevNumbers => [...prevNumbers, nextIndex]);
    setCurrentAnime(animeList[nextIndex]);
  };

  const savedAnime = () => {
    setSavedAnimeArray(prevNumbers => [...prevNumbers,currentAnime]);
    console.log(savedAnimeArray);
  }

  if (!currentAnime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center box-border">
      <div className="window w-1/4 h-5/6 border-2 border-cyan-900 rounded-xl flex flex-col items-center">
        <div className="screen w-full h-full border-2 border-cyan-900 rounded-xl relative overflow-hidden flex flex-col items-center">
        {showSettings ? (
          <Settings
            showSettings={showSettings}
            setShowSettings={setShowSettings}
          />
        ) : showResult ? (
          <Result
            showResult={showResult}
            setShowResult={setShowResult}
            savedAnimeArray={savedAnimeArray}
            setSavedAnimeArray={setSavedAnimeArray}
          />
        ) : (
            <>
              <div className="w-4/5 h-2/4 rounded-xl mt-8">
                {currentAnime.videoUrl ? (
                  <iframe
                    className="rounded-xl"
                    width="100%"
                    height="100%"
                    src={`${currentAnime.videoUrl.replace(
                      "watch?v=",
                      "embed/"
                    )}?autoplay=1`}
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
                  filter: "brightness(80%) blur(5px)",
                  zIndex: -1,
                }}
              ></div>
              <div className="z-10 p-2 left-3 text-xl flex-col absolute bottom-44 ">
                <div className="flex-wrap">
                  <p className="text-3xl font-bold flex-wrap">{currentAnime.title}</p>
                </div>
                <ul className="genres flex">
            {currentAnime.genres.map((genre, index) => (
              <li className=" mr-2 text-xs rounded-full p-1 bg-slate-900" key={index}>{genre.name}</li>
            ))}
          </ul>

                <div className="rating font-semibold">Rating: {currentAnime.score}</div>
                <div className="popularity font-semibold">Popularity: {currentAnime.popularity}</div>
                <div className="ranked font-semibold">Ranked: {currentAnime.rank}</div>
              </div>
              <div className="absolute bottom-8 w-full flex justify-center">
                <AppButton
                  icon={Heart}
                  onClick={() => {
                    nextAnime();
                    savedAnime();
                  }}
                />
                <AppButton icon={Cross} onClick={nextAnime} />
                <AppButton icon={Gear} onClick={() => setShowSettings(true)} />
              </div>
              <div className="absolute bottom-0">
                <Footer synopsis={currentAnime.synopsis} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}