import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useFetchGames } from "../hooks/FetchGames";
import "../styles/LandingPage.css";
import Games from "./Games";
import { getAllData } from "../helper/helper";
import { useDispatch } from "react-redux";
import { setGames } from "../redux/game_reducer";

export default function LandingPage() {
  const [games, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  // const [{ isLoading, serverError }] = useFetchGames();
  // const games = useSelector((state) => state);
  // console.log(games);

  const fetchAllGame = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/games`,
        (data) => data
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

  // if (isLoading) return <h3 className="text-light">isLoading</h3>;
  // if (serverError)
  //   return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;
  if (isLoading) return;

  return (
    <div>
      <div className="LandingPageImage" />
      <p className="welcome">Welcome to English For Kids</p>
      <div>
        <div className="row">
          {games.map((item) => (
            <Games
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
