import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import QuestionsVocabGame from "./Questions";
import { upsetPoint } from "../../until/point";
import TrueFalse from "../TrueFalse";
import { correctSound, incorrectSound, playAudio } from "../../until/sound";

export default function QuizVocabGame() {
  const [searchParams] = useSearchParams();

  const params = useParams();
  const link = `/gamevocab/${params.id}/result`;

  const roundId = searchParams.get("roundId");

  const navigate = useNavigate();

  const [checked, setChecked] = useState(undefined);
  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trace, setTrace] = useState(0);
  const [point, setPoint] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState("Incorrect");
  const [messModal, setMessModal] = useState("Let's try");
  const [colorModal, setColorModal] = useState(false);
  const [move, setMove] = useState(false);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

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

  const onChecked = (checked, move) => {
    setChecked(checked);
    setMove(move);
  };

  const totalQuestions = questions.length;

  const user = JSON.parse(window.localStorage.getItem("user"));

  const moveNextQuestion = async () => {
    if (trace < questions.length) {
      if (checked === questions[trace].answerText) {
        setShowModal(true);
        setTitelModal("Correct");
        setMessModal("Congratulation! You answered the question correctly.");
        setColorModal(true);
        setPoint(point + 1);
        upsetPoint(true, user.id, questions[trace].id);
        playAudio(correctSound);
      } else {
        setShowModal(true);
        setTitelModal("Incorrect");
        setMessModal(
          `You answered the question wrong. The answer is: ${questions[trace].answerText}.`
        );
        setColorModal(false);
        upsetPoint(false, user.id, questions[trace].id);
        playAudio(incorrectSound);
      }
      setTrace(trace + 1);
    }
  };

  if (move) {
    moveNextQuestion();
    setMove(false);
  }

  if (questions.length <= trace) {
    navigate(link, { state: { totalQuestions, totalPoints: point } });
  }

  const linkQuit = `/gamevocab/${params.id}`;
  const handleQuitGame = () => {
    navigate(linkQuit);
  };

  useEffect(() => {
    fecthAllQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return;
  return (
    <div className="bg-orange-100">
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
        className="border-[5px] border-gray-500 bg-orange-200 rounded-3xl hover:bg-orange-300 w-[5%] pl-6 flex"
        onClick={handleQuitGame}
      >
        <svg
          class="h-8 w-8 text-gray-500"
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
        <section className="bg-orange-100 py-10">
          <div className="flex items-center flex-wrap">
            <QuestionsVocabGame
              onChecked={onChecked}
              question={questions[trace]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
