import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { correctSound, playAudio } from "../../until/sound";
import TrueFalse from "../TrueFalse";
import QuestionsGrammarGame from "./Questions";

export default function QuizGrammarGame() {
  const [searchParams] = useSearchParams();

  const roundId = searchParams.get("roundId");
  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trace, setTrace] = useState(0);
  const [answerText, setAnswerText] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState("Incorrect");
  const [messModal, setMessModal] = useState("Let's try");
  const [colorModal, setColorModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

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
  const totalQuestions = questions.length;
  const [point, setPoint] = useState(0);
  if (questions.length <= trace) {
    navigate(link, {
      state: { totalQuestions: totalQuestions, totalPoints: point },
    });
  }

  if (answerText === questions[trace]?.answerText) {
    setTrace(trace + 1);
    setPoint(point + 1);
    setShowModal(true);
    setTitelModal("Correct");
    setMessModal("Congratulation! You answered the question correctly.");
    setColorModal(true);
    playAudio(correctSound);
  }

  if (isLoading) return;
  return (
    <div>
      {showModal ? (
        <>
          <TrueFalse
            titelModal={titelModal}
            colorModal={colorModal}
            messModal={messModal}
            setShowModal={setShowModal}
          />
        </>
      ) : null}
      <QuestionsGrammarGame
        question={questions[trace] ? questions[trace] : questions[trace - 1]}
        callbackSetAnswerText={handleSetAnswerText}
        trace={trace}
      />
    </div>
  );
}
