import { useNavigate } from "react-router-dom";

export default function RoundScrambleGame(props) {
  const { gameId, id, image, name } = props;

  const navigate = useNavigate();
  const link = `/gamescramble/${gameId}/quiz`;

  const handleNavigate = () => {
    navigate({
      pathname: link,
      search: `?roundId=${id}`,
    });
  };
  return (
    <div>
      <div onClick={handleNavigate}>
        <img
          alt={name}
          className="hover:grow hover:shadow-lg rounded-[30%] hover:animate-pulse duration-200 w-[300px] h-[300px] border-8 border-lime-200"
          src={image}
        />
        <div className="pt-2 flex items-center justify-between text-2xl font-mono pl-[15%]">
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}
