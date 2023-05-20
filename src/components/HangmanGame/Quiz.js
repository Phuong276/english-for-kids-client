import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import "../../styles/HangmanGame/Quiz.css";
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
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/${roundId}`,
        (data) => data
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
    <div className="container">
      <div>
        <h1 className="title text-light">Hangman Game</h1>
        <QuestionsHangmanGame
          parentCallback={callbackFunction}
          answerText={answerText}
          answers={answers}
          question={questions[trace] ? questions[trace] : questions[trace - 1]}
        />
      </div>
    </div>
  );
}
