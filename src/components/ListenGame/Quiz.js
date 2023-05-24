import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import QuestionListenGame from "./Question";

export default function QuizListenGame() {
  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");

  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllQuestion = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/${roundId}`
      );
      setQuestionsData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fecthAllQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = useParams();
  const link = `/gamelisten/${params.id}`;
  const navigate = useNavigate();
  const Quit = () => {
    navigate(link);
  };

  if (isLoading) return;
  return (
    <div className="bg-lime-100">
      <div className="container mx-auto text-center pt-10 py-10">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pt-5 text-center">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            LISTEN GAME
          </span>
        </h1>
        <section className="py-10 pt-10">
          <div className="container mx-auto flex items-center flex-wrap pt-4">
            <div className="grid grid-cols-4 gap-16">
              {questions.map((item) => (
                <QuestionListenGame question={item} />
              ))}
            </div>
          </div>
        </section>
        <button
          className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-4 px-12 rounded-full text-2xl"
          onClick={Quit}
        >
          Quit
        </button>
      </div>
    </div>
  );
}
