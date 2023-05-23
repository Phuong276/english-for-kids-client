import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ResultVocabGame() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const userName = user.username;
  const navigate = useNavigate();

  const location = useLocation();

  const params = useParams();
  const link = `/gamevocab/${params.id}`;

  const backGame = () => {
    navigate(link);
  };

  const totalPoints = location.state.totalPoints;
  const totalQuestions = location.state.totalQuestions;

  return (
    <div className="container">
      <div className="result flex-center">
        <div className="flex">
          <span>Username</span>
          <span className="bold">{userName}</span>
        </div>
        <div className="flex">
          <span>Total Questions True: </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Total Questions : </span>
          <span className="bold">{totalQuestions || 0}</span>
        </div>
      </div>
      <div className="grid">
        <button className="btn next" onClick={backGame}>
          Back
        </button>
      </div>
    </div>
  );
}
