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
          className="hover:grow hover:shadow-lg rounded-lg hover:animate-pulse duration-200"
          src={image}
        />{" "}
        <div className="pt-2 flex items-center justify-between text-2xl ">
          <p className="">{name}</p>
        </div>
      </div>
    </div>
  );
}
