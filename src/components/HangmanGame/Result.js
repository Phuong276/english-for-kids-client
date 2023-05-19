import { useNavigate, useParams } from "react-router-dom";

export default function ResultHangmanGame() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const userName = user.username;
  const navigate = useNavigate();

  const params = useParams();
  const link = `/gamehangman/${params.id}`;

  const backGame = () => {
    navigate(link);
  };

  const totalPoints = 1;
  const totalQuestions = 1;
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
