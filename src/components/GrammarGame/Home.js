import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import RoundGrammarGame from "./Round";

export default function HomeGrammarGame() {
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
                    and many words.
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FScreenshot%20from%202023-06-15%2013-43-51.png?alt=media&token=38e846fa-9a54-4f19-9608-a83d0a3735e8"
                      alt=""
                      className="w-[650px] h-[350px] pt-5"
                    />
                  </p>
                  <p className="my-4 text-slate-500 text-3xl leading-relaxed min-w-[600px] pt-10">
                    Step 2: You need to drag and drop words to make meaningful
                    sentences.
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FScreenshot%20from%202023-06-15%2013-44-15.png?alt=media&token=bea4e21e-2cbf-467e-ad90-ada9659be5d2"
                      alt=""
                      className="w-[650px] h-[350px] pt-5"
                    />
                  </p>
                  <p className="my-4 text-slate-500 text-3xl leading-relaxed min-w-[600px] pt-10">
                    Step 3: You can drag it back if it's not correct and correct
                    it.
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FScreenshot%20from%202023-06-15%2013-44-26.png?alt=media&token=6130baaa-751a-4c6a-a413-0c83993881e7"
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
                <RoundGrammarGame
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
