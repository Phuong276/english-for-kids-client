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
    <div className="bg-gray-300 w-[100%] h-[1100px]">
      <div className="container mx-auto text-center text-2xl pt-[20%] justify-center flex">
        <div className="border-separate border-4 border-slate-600 w-[1000px] h-[200px] rounded-full">
          <div className="border border-slate-300 text-4xl pt-7">
            <span>Username: </span>
            <span className="bold">{userName}</span>
          </div>
          <div className="border border-slate-300 text-4xl">
            <span>Total Questions True: </span>
            <span className="bold">{totalPoints || 0}</span>
          </div>
          <div className="border border-slate-300 text-4xl">
            <span>Total Questions : </span>
            <span className="bold">{totalQuestions || 0}</span>
          </div>
        </div>
      </div>
      <div className="pt-10 text-center">
          <button
            className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-4 px-12 rounded-full text-2xl"
            onClick={backGame}
          >
            Back
          </button>
        </div>
    </div>
  );
}
