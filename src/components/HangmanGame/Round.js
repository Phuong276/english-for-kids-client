import { useNavigate } from "react-router-dom";

export default function RoundHangmanGame(props) {
  const { gameId, id, image, name } = props;

  const navigate = useNavigate();
  const link = `/gamehangman/${gameId}/quiz`;

  const handleNavigate = () => {
    navigate({
      pathname: link,
      search: `?roundId=${id}`,
    });
  };
  return (
    <div className="column">
      <div onClick={handleNavigate} className="image">
        <img src={image} alt={name} />
        <div className="middle">
          <div className="text"> {name}</div>
        </div>
      </div>
    </div>
  );
}
