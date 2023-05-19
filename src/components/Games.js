import React from "react";
import { Link } from "react-router-dom";
import "../styles/Games.css";

const Games = (props) => {
  const { id, image, name } = props;

  let linkTo = "";
  if (name === "Game Vocab") {
    linkTo = "/gamevocab/" + id;
  } else if (name === "Game Hangman") {
    linkTo = "/gamehangman/" + id;
  }

  return (
    <div className="column">
      <Link to={linkTo} id={id} className="image">
        <img src={image} alt={name} />
        <div className="middle">
          <div className="text"> {name}</div>
        </div>
      </Link>
    </div>
  );
};

export default Games;
