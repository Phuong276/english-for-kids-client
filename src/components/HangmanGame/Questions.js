import { useEffect, useState } from "react";

export default function QuestionsHangmanGame(props) {
  const { question } = props;

  const word = question.answerText;

  const [guesses, setGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const sendData = (status) => {
    props.parentCallback(status);
  };

  useEffect(() => {
    if (incorrectGuesses > 5) {
      setGameOver(true);
      setWon(false);
      sendData(false);
    }
    if (word.split("").every((letter) => guesses.includes(letter))) {
      setGameOver(true);
      setWon(true);
      sendData(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setGuesses([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setWon(false);
  };
  return (
    <div>
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
