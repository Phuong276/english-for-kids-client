import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import QuestionsVocabGame from "./Questions";
import { toast } from "react-toastify";
import { upsetPoint } from "../../until/point";

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
        setPoint(point + 1);
        toast.success("Correct!");
        upsetPoint(true, user.id, questions[trace].id);
      } else {
        toast.error("Wrong! The answer is: " + questions[trace].answerText);
        upsetPoint(false, user.id, questions[trace].id);
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
    <div>
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl pt-20 text-center">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          VOCABULARY GAME
        </span>
      </h1>
      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-20 pb-12 ">
          <QuestionsVocabGame
            onChecked={onChecked}
            question={questions[trace]}
          />
        </div>
      </section>
      <div>
        <button onClick={moveNextQuestion}>Next</button>
      </div>
    </div>
  );
}
