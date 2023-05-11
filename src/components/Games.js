import React from "react";
import { Link } from "react-router-dom";
import "../styles/Games.css";

const Games = (props) => {
  const { id, src, alt } = props;
  return (
    <div className="column">
      <Link to="/games/vocab" id={id} className="image">
        <img src={src} alt={alt} />
        <div className="middle">
          <div className="text"> {alt}</div>
        </div>
      </Link>
    </div>
  );
};

export default Games;
