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

  const params = useParams();
  const link = `/gamelisten/${params.id}`;
  const navigate = useNavigate();
  const Quit = () => {
    navigate(link)
  }

  if (isLoading) return;
  return (
    <div className="container">
      <div>
        <h1 className="title text-light">Hangman Game</h1>
        {questions.map((item) => (
          <QuestionListenGame question={item} />
        ))}
      </div>
      <button onClick={Quit}>Quit</button>
    </div>
  );
}
