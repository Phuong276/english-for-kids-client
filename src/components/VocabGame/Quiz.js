import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import QuestionsVocabGame from "./Questions";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function QuizVocabGame() {
  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");

  const [checked, setChecked] = useState(undefined);

  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [trace, setTrace] = useState(0);

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

  const onChecked = (checked) => {
    setChecked(checked);
  };

  const moveNextQuestion = () => {
    if (trace < questions.length) {
      if (checked === questions[trace].answerText) {
        console.log(true);
        toast.success("Correct!");
      } else {
        console.log(false);
        toast.error("Wrong! The answer is: " + questions[trace].answerText);
      }
      setTrace(trace + 1);
    }
  };

  useEffect(() => {
    fecthAllQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const link = `/`;
  if (questions.length && questions.length <= trace) {
    return <Navigate to={link} replace="true"></Navigate>;
  }

  if (isLoading) return;

  return (
    <div className="container">
      <h1 className="title text-light">Vocabulary Game</h1>

      <QuestionsVocabGame onChecked={onChecked} question={questions[trace]} />

      <div className="grid">
        <button className="btn next" onClick={moveNextQuestion}>
          Next
        </button>
      </div>
    </div>
  );
}
