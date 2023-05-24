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
    <div
      className="container mx-auto rounded-[10%]"
      style={{
        maxWidth: "2000px",
        height: "60rem",
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FoagWjI.jpg?alt=media&token=8670ac79-2219-4827-a5f6-d86ea669c650')",
      }}
    >
      {word === "quit" ? (
        <div>No Question</div>
      ) : (
        <div className="text-6xl font-serif">
          <img
            src={question.questionImage}
            alt={question.id}
            width={600}
            height={600}
            className="mx-auto mt-10 mb-20 rounded-md"
          />
          <p className="text-red-600">{`${handleHeart(incorrectGuesses)}`}</p>
          <p className="flex justify-center pb-10">
            {word
              .split("")
              .map((letter) =>
                guesses.includes(letter) ? (
                  <div className="w-20 text-center h-20 rounded-[20px] border border-red-200 hover:opacity-60">
                    {letter}{" "}
                  </div>
                ) : (
                  <div className="w-20 text-center h-20 rounded-[20px] border border-red-200 hover:opacity-60">
                    _
                  </div>
                )
              )}
          </p>
          <p className="pt-5">
            {answers.split("").map((letter) => (
              <button
                style={{
                  backgroundImage:
                    "url('https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Fxanhngon.jpg?alt=media&token=216ec3db-90af-4892-abd0-bdf6a5f0d414')",
                }}
                className="w-20 text-center h-20 rounded-[20px] border border-red-200 hover:opacity-60 "
                ket={letter}
                onClick={() => handleGuess(letter)}
              >
                {letter}
              </button>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
