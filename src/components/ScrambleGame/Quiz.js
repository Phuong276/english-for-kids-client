import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { upsetPoint } from "../../until/point";
import { correctSound, incorrectSound, playAudio } from "../../until/sound";
import TrueFalse from "../TrueFalse";
import QuestionsScreambleGame from "./Question";

export default function QuizScrambleGame() {
  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");

  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trace, setTrace] = useState(0);
  const answerText = questions[trace] ? questions[trace].answerText : "quit";

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState("Incorrect");
  const [messModal, setMessModal] = useState("Let's try");
  const [colorModal, setColorModal] = useState(false);

  const totalQuestions = questions.length;
  const [point, setPoint] = useState(0);

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

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

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
      setShowModal(true);
      setTitelModal("Correct");
      setMessModal("Congratulation! You answered the question correctly.");
      setColorModal(true);
      playAudio(correctSound);
    } else {
      upsetPoint(false, user.id, questions[trace].id);
      setShowModal(true);
      setTitelModal("Incorrect");
      setMessModal(
        `You answered the question wrong. The answer is: ${questions[trace].answerText}.`
      );
      setColorModal(false);
      playAudio(incorrectSound);
    }
    moveNextQuestion();
  }
  const linkQuit = `/gamescramble/${params.id}`;
  const handleQuitGame = () => {
    navigate(linkQuit);
  };

  const handleBack = () => {
    setAnswers(answers.substring(0, answers.length - 1));
  };

  if (isLoading) return;
  return (
    <div className="bg-cyan-100">
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
      <button
        className="border-[5px] border-cyan-500 bg-cyan-200 rounded-3xl hover:bg-cyan-300 w-[5%] pl-6 flex"
        onClick={handleQuitGame}
      >
        <svg
          class="h-8 w-8 text-cyan-500"
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
      <div className="container mx-auto text-center">
        <section className="py-3">
          <div className="container mx-auto flex items-center flex-wrap">
            <QuestionsScreambleGame
              parentCallback={callbackFunction}
              answers={answers}
              question={
                questions[trace] ? questions[trace] : questions[trace - 1]
              }
              answerText={answerText}
            />
          </div>
        </section>

        <div className="pb-10 grid grid-cols-4 pt-5">
          <div></div>
          <div>
            <button
              class="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-5 px-12 rounded-full text-2xl"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
          <div>
            <button
              class="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-5 px-12 rounded-full text-2xl"
              onClick={moveNextQuestion}
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
