import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { upsetPoint } from "../../until/point";
import { generateString } from "../../until/randomText";
import { correctSound, incorrectSound, playAudio } from "../../until/sound";
import TrueFalse from "../TrueFalse";
import QuestionsHangmanGame from "./Questions";

export default function QuizHangmanGame() {
  const [searchParams] = useSearchParams();

  const roundId = searchParams.get("roundId");
  const [questions, setQuestionsData] = useState([]);
  const totalQuestions = questions.length;
  const [point, setPoint] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState("Incorrect");
  const [messModal, setMessModal] = useState("Let's try");
  const [colorModal, setColorModal] = useState(false);

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
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const [check, setCheck] = useState(false);
  const [won, setWon] = useState(false);
  const [trace, setTrace] = useState(0);

  const callbackFunction = (childData, statusWon) => {
    setCheck(childData);
    setWon(statusWon);
  };

  const params = useParams();
  const link = `/result`;

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
    setShowModal(true);
    setTitelModal("Correct");
    setMessModal("You answered the question correctly.");
    setColorModal(true);
    playAudio(correctSound);
  }
  const answerText = questions[trace] ? questions[trace].answerText : "quit";

  if ((check && !won) || answerText === "quit") {
    if (check && !won) {
      playAudio(incorrectSound);
    }
    navigate(link, { state: { totalQuestions, totalPoints: point } });
  }

  const linkQuit = `/gamehangman/${params.id}`;
  const handleQuitGame = () => {
    navigate(linkQuit);
  };

  const answers = generateString(3, answerText);

  if (isLoading) return;
  return (
    <div className="bg-pink-100 min-h-[1100px]">
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
      <div className="p-3">
        <button
          className="border-[5px] border-pink-500 bg-pink-200 rounded-3xl hover:bg-pink-300 w-[5%] pl-6 flex h-[50px]"
          onClick={handleQuitGame}
        >
          <svg
            class="h-8 w-8 text-pink-500"
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
      </div>
      <div className="container mx-auto text-center">
        <section>
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
