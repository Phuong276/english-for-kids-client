import React from "react";
import { Link } from "react-router-dom";

const Games = (props) => {
  const { id, image, name } = props;

  let linkTo = "";
  if (name === "Game Vocab") {
    linkTo = "/gamevocab/" + id;
  } else if (name === "Game Hangman") {
    linkTo = "/gamehangman/" + id;
  } else if (name === "Game Listen") {
    linkTo = "/gamelisten/" + id;
  } else if (name === "Game Scramble") {
    linkTo = "/gamescramble/" + id;
  }

  return (
    <div>
      <Link to={linkTo} id={id}>
        <img
          alt={name}
          className="hover:grow hover:shadow-lg rounded-lg hover:animate-pulse duration-200"
          src={image}
        />
        <div className="pt-2 flex items-center justify-between text-2xl ">
          <p className="">{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Games;
