import { useNavigate } from "react-router-dom";

export default function RoundListenGame(props) {
  const { gameId, id, image, name } = props;

  const navigate = useNavigate();
  const link = `/gamelisten/${gameId}/quiz`;

  const handleNavigate = () => {
    navigate({
      pathname: link,
      search: `?roundId=${id}`,
    });
  };

  return (
    <div>
      <div onClick={handleNavigate} className="image">
        <img
          alt={name}
          className="hover:grow hover:shadow-lg rounded-[30%] hover:animate-pulse duration-200 w-[300px] h-[300px]"
          src={image}
        />
        <div className="pt-2 flex items-center justify-between text-2xl ">
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}
