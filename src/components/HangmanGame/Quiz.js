import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllData } from "../../helper/helper";
import { upsetPoint } from "../../until/point";
import { generateString } from "../../until/randomText";
import QuestionsHangmanGame from "./Questions";

export default function QuizHangmanGame() {
  const [searchParams] = useSearchParams();

  const roundId = searchParams.get("roundId");
  const [questions, setQuestionsData] = useState([]);
  const totalQuestions = questions.length;
  const [point, setPoint] = useState(0);
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

  const [check, setCheck] = useState(false);
  const [won, setWon] = useState(false);
  const [trace, setTrace] = useState(0);

  const callbackFunction = (childData, statusWon) => {
    setCheck(childData);
    setWon(statusWon);
  };

  const params = useParams();
  const link = `/gamehangman/${params.id}/result`;

  const navigate = useNavigate();
  const moveNextQuestion = async () => {
    if (trace < questions.length) {
      setTrace(trace + 1);
    }
  };

  const user = JSON.parse(window.localStorage.getItem("user"));
  if (check && won) {
    toast.success("Correct!");
    moveNextQuestion();
    upsetPoint(true, user.id, questions[trace].id);
    setPoint(point + 1);
    setWon(false);
    setCheck(false);
  }
  const answerText = questions[trace] ? questions[trace].answerText : "quit";

  if ((check && !won) || answerText === "quit") {
    navigate(link, { state: { totalQuestions, totalPoints: point } });
  }

  const answers = generateString(5, answerText);

  if (isLoading) return;
  return (
    <div className="bg-lime-100">
      <div className="container mx-auto text-center">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pt-5 text-center">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            HANGMAN GAME
          </span>
        </h1>
        <section className="py-5">
          <div className="flex items-center flex-wrap">
            <QuestionsHangmanGame
              parentCallback={callbackFunction}
              answerText={answerText}
              answers={answers}
              question={
                questions[trace] ? questions[trace] : questions[trace - 1]
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}
