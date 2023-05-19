import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import "../../styles/HangmanGame/Quiz.css";
import QuestionsHangmanGame from "./Questions";

export default function QuizHangmanGame() {
  const [searchParams] = useSearchParams();

  const roundId = searchParams.get("roundId");
  const [questions, setQuestionsData] = useState([]);
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
  const [trace, setTrace] = useState(0);
  const callbackFunction = (childData) => {
    setCheck(childData);
  };

  const params = useParams();
  const link = `/gamehangman/${params.id}/result`;

  const navigate = useNavigate();
  if (questions.length <= trace) {
    navigate(link);
  }

  const moveNextQuestion = async () => {
    if (trace < questions.length) {
      setTrace(trace + 1);
    }
  };

  if (check) {
    moveNextQuestion();
  }

  if (isLoading) return;
  return (
    <div className="container">
      <h1 className="title text-light">Hangman Game</h1>
      <QuestionsHangmanGame
        parentCallback={callbackFunction}
        question={questions[trace] ? questions[trace] : questions[trace - 1]}
      />
      <div className="grid">
        <button className="btn next" onClick={moveNextQuestion}>
          Next
        </button>
      </div>
    </div>
  );
}
