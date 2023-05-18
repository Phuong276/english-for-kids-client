import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import helper, { getAllData } from "../../helper/helper";
import QuestionsVocabGame from "./Questions";
import { toast } from "react-toastify";

export default function QuizVocabGame() {
  const [searchParams] = useSearchParams();

  const params = useParams();
  const link = `/games/${params.id}/result`;

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

  const totalQuestions = questions.length;

  const user = JSON.parse(window.localStorage.getItem("user"));

  const UPSET_POINT_URL = "/api/points";
  const upsetPoint = async (status, userId, questionId) => {
    try {
      await helper.post(
        UPSET_POINT_URL,
        JSON.stringify({
          status,
          userId,
          questionId,
        }),
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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
