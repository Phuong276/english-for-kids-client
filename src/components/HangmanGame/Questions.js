import { useEffect, useState } from "react";

export default function QuestionsHangmanGame(props) {
  const { answerText, answers, question } = props;
  const word = answerText;

  const [guesses, setGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(3);

  const sendData = (status, statusWon) => {
    props.parentCallback(status, statusWon);
  };

  useEffect(() => {
    if (incorrectGuesses === 0) {
      sendData(true, false);
      setGuesses([]);
      setIncorrectGuesses(3);
    }
    if (word.split("").every((letter) => guesses.includes(letter))) {
      sendData(true, true);
      setGuesses([]);
      setIncorrectGuesses(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incorrectGuesses, guesses, word]);

  const handleGuess = (guess) => {
    if (guesses.includes(guess)) return;
    if (word.includes(guess)) {
      setGuesses([...guesses, guess]);
    } else {
      setIncorrectGuesses(incorrectGuesses - 1);
    }
  };

  const handleHeart = (incorrectGuesses) => {
    let hearts = "";
    for (let i = 0; i < incorrectGuesses; i++) hearts += "❤";
    return hearts;
  };

  return (
    <div className="container mx-auto rounded-[10%]">
      {word === "quit" ? (
        <div>No Question</div>
      ) : (
        <div className="text-6xl font-serif">
          <img
            src={question.questionImage}
            alt={question.id}
            width={700}
            height={600}
            className="mx-auto mt-10 rounded-[20%]"
          />
          <div className="py-10">
            <p className="text-pink-600 pb">{`${handleHeart(
              incorrectGuesses
            )}`}</p>
          </div>
          <p className="flex justify-center pb-10">
            {word
              .split("")
              .map((letter) =>
                guesses.includes(letter) ? (
                  <div className="w-[120px] text-center h-[120px] rounded-[20px] border-4 border-pink-200 bg-pink-300 hover:opacity-60">
                    {letter}{" "}
                  </div>
                ) : (
                  <div className="w-[120px] text-center h-[120px] rounded-[20px] border-4 border-pink-200 bg-pink-300 hover:opacity-60">
                    _
                  </div>
                )
              )}
          </p>
          <div className="pb-[100px]">
          <p className="pt-5">
              {answers.split("").map((letter) => (
                <button
                  className="w-[120px] text-center h-[120px] rounded-[20px] border-4 border-pink-200 bg-pink-300 hover:opacity-60 font-mono"
                  ket={letter}
                  onClick={() => handleGuess(letter)}
                >
                  {letter}
                </button>
              ))}
          </p>
          </div>
        </div>
      )}
    </div>
  );
}
