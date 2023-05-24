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
    <div className="container mx-auto text-center text-2xl pt-12">
      <div className="border-separate border border-slate-600 ">
        <div className="border border-slate-300">
          <span>Username: </span>
          <span className="bold">{userName}</span>
        </div>
        <div className="border border-slate-300">
          <span>Total Questions True: </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="border border-slate-300">
          <span>Total Questions : </span>
          <span className="bold">{totalQuestions || 0}</span>
        </div>
      </div>
      <div className="pt-10">
        <button className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-4 px-12 rounded-full text-2xl" onClick={backGame}>
          Back
        </button>
      </div>
    </div>
  );
}
