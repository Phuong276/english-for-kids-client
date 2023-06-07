import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { correctSound, playAudio } from "../../until/sound";
import { formatTime } from "../../until/time";
import TrueFalse from "../TrueFalse";
import QuestionsGrammarGame from "./Questions";

export default function QuizGrammarGame() {
  const [searchParams] = useSearchParams();

  const [countdown, setCountdown] = useState(300);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

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
      }, 1000);
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

  const link = `/result`;
  const totalQuestions = questions.length;
  const [point, setPoint] = useState(0);
  if (questions.length <= trace || countdown <= 0) {
    navigate(link, {
      state: { totalQuestions: totalQuestions, totalPoints: point },
    });
  }

  if (answerText === questions[trace]?.answerText) {
    setTrace(trace + 1);
    setPoint(point + 1);
    setShowModal(true);
    setTitelModal("Correct");
    setMessModal("You answered the question correctly.");
    setColorModal(true);
    playAudio(correctSound);
  }

  const linkQuit = `/gamesgrammar/${params.id}`;
  const handleQuitGame = () => {
    navigate(linkQuit);
  };

  if (isLoading) return;
  return (
    <div className="bg-green-100 min-h-[1100px]">
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
      <div className="flex">
        <button
          className="border-[5px] border-green-500 bg-green-200 rounded-3xl hover:bg-green-300 w-[5%] pl-6 flex"
          onClick={handleQuitGame}
        >
          <svg
            class="h-8 w-8 text-green-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="4"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
          </svg>
        </button>
        <div className="pl-[80%] pt-3 text-2xl font-bold">
          Time: {formatTime(countdown)}
        </div>
      </div>
      <div className="container mx-auto text-center">
        <section>
          <div className="flex items-center flex-wrap">
            <QuestionsGrammarGame
              question={
                questions[trace] ? questions[trace] : questions[trace - 1]
              }
              callbackSetAnswerText={handleSetAnswerText}
              trace={trace}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
