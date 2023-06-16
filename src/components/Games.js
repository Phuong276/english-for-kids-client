import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Games = (props) => {
  const { id, image, name } = props;
  let linkTo = "";
  if (name === "Quiz") {
    linkTo = "/gamevocab/" + id;
  } else if (name === "Hangman") {
    linkTo = "/gamehangman/" + id;
  } else if (name === "Listen") {
    linkTo = "/gamelisten/" + id;
  } else if (name === "Scramble") {
    linkTo = "/gamescramble/" + id;
  } else if (name === "Word Matching") {
    linkTo = "/gamesgrammar/" + id;
  } else if (name === "Picture Picker") {
    linkTo = "/gamepicturepicker/" + id;
  } else if (name === "Picture Letter") {
    linkTo = "/gamepictureletter/" + id;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.1 }}
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
    >
      <Link to={linkTo} id={id}>
        <img
          alt={name}
          className="hover:grow hover:shadow-lg rounded-[30%] hover:animate-pulse duration-200 w-[300px] h-[300px] border-8 border-lime-200"
          src={image}
        />
        <div className="pt-2 flex items-center justify-center text-3xl font-mono text-center max-w-[300px]">
          {name}
        </div>
      </Link>
    </motion.div>
  );
};

export default Games;
