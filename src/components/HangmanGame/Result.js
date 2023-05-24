import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ResultHangmanGame() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const userName = user.username;
  const navigate = useNavigate();

  const params = useParams();
  const link = `/gamehangman/${params.id}`;

  const location = useLocation();
  const totalPoints = location.state.totalPoints;
  const totalQuestions = location.state.totalQuestions;

  const backGame = () => {
    navigate(link);
  };

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
        <button
          className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-5 px-12 rounded-full text-2xl"
          onClick={backGame}
        >
          Back
        </button>
      </div>
    </div>
  );
}
