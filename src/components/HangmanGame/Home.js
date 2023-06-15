import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import RoundHangmanGame from "./Round";

export default function HomeHangmanGame() {
  const params = useParams();
  const [rounds, setRoundsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const fecthAllRound = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/games/rounds/${params.id}`
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

  const handleNotShow = () => {
    setShow(false);
  };

  const handleSetShow = () => {
    setShow(true);
  };

  if (isLoading) return;

  return (
    <div className="bg-lime-100 min-h-[850px]">
      {show ? (
        <div>
          <div className=" max-h-[80vh] overflow-hidden my-auto justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className={` max-h-[80vh]  overflow-hidden border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
              >
                <div className="bg-lime-200">
                  <h3 className="text-3xl font-serif p-5">
                    You don't know how to play?
                    <button
                      className="border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => handleNotShow()}
                    >
                      X
                    </button>
                  </h3>
                </div>
                <div className="p-10 flex-auto overflow-auto">
                  <p className="my-4 text-slate-500 text-3xl leading-relaxed min-w-[600px]">
                    Step 1: You have many questions, each question has 1 picture
                    and many letters.
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FScreenshot%20from%202023-06-15%2011-29-42.png?alt=media&token=0ff246be-e288-4340-8f0c-ec4bc612d6db"
                      alt=""
                      className="w-[650px] h-[350px] pt-5"
                    />
                  </p>
                  <p className="my-4 text-slate-500 text-3xl leading-relaxed min-w-[600px] pt-10">
                    Step 2: You need to select the letter to make a meaningful
                    word.
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FScreenshot%20from%202023-06-15%2011-39-45.png?alt=media&token=5c6406b6-d680-4ff3-8a75-deafd3d8562b"
                      alt=""
                      className="w-[650px] h-[350px] pt-5"
                    />
                  </p>
                  <p className="my-4 text-slate-500 text-3xl leading-relaxed min-w-[600px] pt-10">
                    Step 3: If you lose all your lives, you lose.
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FScreenshot%20from%202023-06-15%2011-29-42%20(copy).png?alt=media&token=9c5c1f5f-77f2-4e0c-ab5e-052473027e31"
                      alt=""
                      className="w-[650px] h-[350px] pt-5"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : (
        <div></div>
      )}
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
      <div
        className="absolute top-[15%] right-[4%] cursor-pointer"
        onClick={() => handleSetShow()}
      >
        <svg
          class="h-24 w-24 text-amber-500 bg-amber-200 rounded-[100%]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <circle cx="12" cy="12" r="10" />{" "}
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />{" "}
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    </div>
  );
}
