import { useEffect, useState } from "react";
import AnimeFetcher from "../components/AnimeFetcher";
import Footer from "../components/Footer";
import Heart from "../styles/images/heart.png";
import Cross from "../styles/images/cross.png";
import AppButton from "../components/AppButton";
import Gear from "../styles/images/gear.png"

export default function App() {
  const animeList = AnimeFetcher();
  const [currentAnime, setCurrentAnime] = useState(null);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  useEffect(() => {
    if (animeList.length > 0 && !currentAnime) {
      setCurrentAnime(animeList[0]);
      setGeneratedNumbers([0]);
    }
  }, [animeList, currentAnime]);

  const nextAnime = () => {
    if (generatedNumbers.length === animeList.length) {
      // All anime have been shown, reset the generated numbers
      setGeneratedNumbers([]);
    }

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * animeList.length);
    } while (generatedNumbers.includes(nextIndex));

    setGeneratedNumbers(prevNumbers => [...prevNumbers, nextIndex]);
    setCurrentAnime(animeList[nextIndex]);
  };

  if (!currentAnime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center box-border">
      <div className="window w-1/4 h-5/6 border-2 border-cyan-900 rounded-xl flex flex-col items-center">
        <div className="screen w-full h-full border-2 border-cyan-900 rounded-xl relative overflow-hidden flex flex-col items-center">
          <div className="w-4/5 h-2/4 rounded-xl mt-8">
            {currentAnime.videoUrl ? (
              <iframe className="rounded-xl"
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
              filter: "brightness(80%) blur(5px)", // Adjust these values as needed
              zIndex: -1,
            }}
          ></div>
          <div className="z-10 p-2 left-3 text-xl flex-col absolute bottom-44">
            <p className="text-white text-3xl">{currentAnime.title}</p>
            <div className="rating">rating: {currentAnime.score}</div>
            <div className="popularity">popularity: {currentAnime.popularity}</div>
            <div className="ranked">ranked: {currentAnime.rank}</div>
          </div>
          <div className="absolute bottom-12 w-full flex justify-center">
          <AppButton
              icon={Heart}
              onClick={nextAnime}
            />
            <AppButton
              icon={Cross}
              onClick={nextAnime}
            />
            <AppButton
              icon={Gear}
              onClick={nextAnime}
            />
          </div>
          <div className="absolute bottom-0">
            <Footer synopsis={currentAnime.synopsis} />
          </div>
        </div>
      </div>
    </div>
  );
}
