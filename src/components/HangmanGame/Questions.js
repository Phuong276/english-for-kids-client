import { useEffect, useState } from "react";

export default function QuestionsHangmanGame(props) {
  const { answerText, answers, question } = props;
  const word = answerText;

  const [guesses, setGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const sendData = (status, statusWon) => {
    props.parentCallback(status, statusWon);
  };

  useEffect(() => {
    if (incorrectGuesses > 5) {
      sendData(true, false);
      setGuesses([]);
      setIncorrectGuesses(0);
    }
    if (word.split("").every((letter) => guesses.includes(letter))) {
      sendData(true, true);
      setGuesses([]);
      setIncorrectGuesses(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incorrectGuesses, guesses, word]);

  const handleGuess = (guess) => {
    if (guesses.includes(guess)) return;
    if (word.includes(guess)) {
      setGuesses([...guesses, guess]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  return (
    <div>
      {word === "quit" ? (
        <div>No Question</div>
      ) : (
        <div>
          <img
            src={question.questionImage}
            alt={question.id}
            className="questionImage"
          />
          <p className="incorrect">Incorrect guesses: {incorrectGuesses}</p>
          <p className="incorrect">{word}</p>
          <p className="guess">
            {word
              .split("")
              .map((letter) => (guesses.includes(letter) ? letter : "_"))}
          </p>
          <p className="buttons">
            {answers.split("").map((letter) => (
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
