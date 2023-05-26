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
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/questions/${roundId}`
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
    <div className="bg-purple-100">
      <div className="container mx-auto text-center pt-10 py-10">
        <section className="py-10 pt-10">
          <div className="container mx-auto flex items-center flex-wrap pt-4">
            <div className="grid grid-cols-4 gap-16">
              {questions.map((item) => (
                <QuestionListenGame question={item} />
              ))}
            </div>
          </div>
        </section>
        <div className="pb-10 grid grid-cols-4 pt-5">
          <div></div>
          <div>
            <button
              className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-5 pt-6 px-12 rounded-full text-2xl border-4 border-purple-500"
              onClick={Quit}
            >
              Quit
            </button>
          </div>
          <div>
            <button className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-5 pt-6 px-12 rounded-full text-2xl border-4 border-purple-500">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
