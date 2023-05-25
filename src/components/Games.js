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
          className="hover:grow hover:shadow-lg rounded-[30%] hover:animate-pulse duration-200 w-[300px] border-8 border-lime-200"
          src={image}
        />
        <div className="pt-2 flex items-center justify-between text-3xl font-mono pl-[15%]">
          <p>{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Games;
