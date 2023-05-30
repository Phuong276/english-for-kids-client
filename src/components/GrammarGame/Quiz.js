import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import QuestionsGrammarGame from "./Questions";

export default function QuizGrammarGame() {
  const [searchParams] = useSearchParams();

  const roundId = searchParams.get("roundId");
  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trace, setTrace] = useState(0);
  const [answerText, setAnswerText] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const handleSetAnswerText = (text) => {
    setAnswerText(text);
  };

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

  const link = `/gamesgrammar/${params.id}/result`;

  if (questions.length <= trace) {
    navigate(link, { state: { totalQuestions: 1, totalPoints: 1 } });
  }

  if (answerText === questions[trace]?.answerText) {
    setTrace(trace + 1);
  }

  if (isLoading) return;
  return (
    <div>
      <QuestionsGrammarGame
        question={questions[trace] ? questions[trace] : questions[trace - 1]}
        callbackSetAnswerText={handleSetAnswerText}
        trace={trace}
      />
    </div>
  );
}
