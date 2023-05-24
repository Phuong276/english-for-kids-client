import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import RoundHangmanGame from "./Round";

export default function HomeHangmanGame() {
  const params = useParams();
  const [rounds, setRoundsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllRound = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/games/${params.id}`
      );
      setRoundsData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fecthAllRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return;

  return (
    <div className="bg-lime-100">
      <div className="container mx-auto">
        <section className="py-8 pl-20 pr-20">
          <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <div className="grid grid-cols-4 gap-16">
              {rounds.map((item) => (
                <RoundHangmanGame
                  gameId={params.id}
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
