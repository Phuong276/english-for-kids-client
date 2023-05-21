import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { upsetPoint } from "../../until/point";
import QuestionsScreambleGame from "./Question";

export default function QuizScrambleGame() {
  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");

  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trace, setTrace] = useState(0);
  const answerText = questions[trace] ? questions[trace].answerText : "quit";

  const totalQuestions = questions.length;
  const [point, setPoint] = useState(0);

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

  const moveNextQuestion = async () => {
    if (trace < questions.length) {
      setTrace(trace + 1);
      setAnswers("");
    }
  };

  const params = useParams();
  const link = `/gamescramble/${params.id}/result`;
  const navigate = useNavigate();

  if (questions.length <= trace) {
    navigate(link, { state: { totalQuestions, totalPoints: point } });
  }

  const [answers, setAnswers] = useState("");
  const callbackFunction = (childData) => {
    setAnswers(answers + childData);
  };

  const user = JSON.parse(window.localStorage.getItem("user"));
  if (answerText.length === answers.length) {
    if (answerText === answers) {
      setPoint(point + 1);
      upsetPoint(true, user.id, questions[trace].id);
    } else {
      upsetPoint(false, user.id, questions[trace].id);
    }
    moveNextQuestion();
  }

  if (isLoading) return;
  return (
    <div className="container">
      <div>
        <h1 className="title text-light">Scramble Game</h1>
        <QuestionsScreambleGame
          parentCallback={callbackFunction}
          answers={answers}
          question={questions[trace] ? questions[trace] : questions[trace - 1]}
          answerText={answerText}
        />
      </div>

      <div className="grid">
        <button className="btn next" onClick={moveNextQuestion}>
          Next
        </button>
      </div>
    </div>
  );
}
