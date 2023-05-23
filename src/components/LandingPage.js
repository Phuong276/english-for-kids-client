import React, { useEffect, useState } from "react";
import Games from "./Games";
import { getAllData } from "../helper/helper";
import { useDispatch } from "react-redux";
import { setGames } from "../redux/game_reducer";

export default function LandingPage() {
  const [games, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchAllGame = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/games`
      );
      setGamesData(data);
      dispatch(setGames({ games: data }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return;

  return (
    <div>
      {/* <div>
        <div
          className="carousel relative container mx-auto"
          style={{
            maxWidth: "1600px",
          }}
        >
          {games.map((item) => (
            <Games
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
            />
          ))}
        </div>
      </div> */}
      <div
        className="carousel relative container mx-auto"
        style={{
          maxWidth: "1600px",
        }}
      >
        <section className="bg-white py-8">
          <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <nav id="store" className="w-full z-30 top-0 px-6 py-1">
              <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                <a
                  className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                  href="/"
                >
                  LET'S PLAY GAME
                </a>
              </div>
            </nav>
          </div>
          <div className="grid grid-cols-3 gap-16">
            {games.map((item) => (
              <Games
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
