import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import QuestionsVocabGame from "./Questions";

export default function QuizVocabGame() {
  const [searchParams, setSearchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");
  // console.log(searchParams.get("roundId"));
  // searchParams.set("roundId", "7");

  const [check, setChecked] = useState(undefined);

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

  const onChecked = (check) => {
    setChecked(check);
  };

  const moveNextQuestion = () => {
    if (trace < questions.length - 1) {
      setTrace(trace + 1);
    }
  };

  useEffect(() => {
    fecthAllQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
