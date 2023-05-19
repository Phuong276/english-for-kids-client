import React, { useEffect, useState } from "react";
import "../../styles/HangmanGame/Quiz.css";

export default function QuizHangmanGame() {
  const WORDS = ["apple", "banana", "orange"];
  const [word, setWord] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );

  const [guesses, setGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (incorrectGuesses > 5) {
      setGameOver(true);
      setWon(false);
    }
    if (word.split("").every((letter) => guesses.includes(letter))) {
      setGameOver(true);
      setWon(true);
    }
  }, [incorrectGuesses, guesses, word]);

  const handleGuess = (guess) => {
    if (gameOver) return;
    if (guesses.includes(guess)) return;
    if (word.includes(guess)) {
      setGuesses([...guesses, guess]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };
  const resetGame = () => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setWon(false);
  };
  return (
    <div>
      <h1> Hangman</h1>
      {gameOver ? (
        <div>
          {won ? "You Won!" : "You lost"}
          <button onClick={() => resetGame()}>Play Again</button>
        </div>
      ) : (
        <div>
          <p className="incorrect">Incorrect guesses: {incorrectGuesses}</p>
          <p className="incorrect">{word}</p>
          <p className="guess">
            {word
              .split("")
              .map((letter) => (guesses.includes(letter) ? letter : "_"))}
          </p>
          <p className="buttons">
            {"abcdpleorng".split("").map((letter) => (
              <button ket={letter} onClick={() => handleGuess(letter)}>
                {letter}
              </button>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
