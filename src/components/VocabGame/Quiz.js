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
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/${roundId}`
      );
      setQuestionsData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const onChecked = (checked) => {
    setChecked(checked);
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

  if (questions.length <= trace) {
    navigate(link, { state: { totalQuestions, totalPoints: point } });
  }

  useEffect(() => {
    fecthAllQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return;

  return (
    <div className="bg-lime-100">
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

      <div className="container mx-auto text-center">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pt-5 text-center">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            VOCABULARY GAME
          </span>
        </h1>
        <section className="bg-lime-100 py-8">
          <div className="flex items-center flex-wrap">
            <QuestionsVocabGame
              onChecked={onChecked}
              question={questions[trace]}
            />
          </div>
          <div>
            <button
              class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-5 px-12 rounded-full text-2xl"
              onClick={moveNextQuestion}
            >
              Next Question
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
