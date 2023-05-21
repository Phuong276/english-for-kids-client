export default function QuestionsScreambleGame(props) {
  const { question, answerText, answers } = props;

  const word = answerText;

  const handleGuess = (guess) => {
    props.parentCallback(guess);
  };

  return (
    <div>
      {question ? (
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
              <p className="incorrect">{word}</p>
              <p className="guess">
                {answers.split("").map((letter) => (letter ? letter : "_"))}
              </p>
              <p className="buttons">
                {word.split("").map((letter) => (
                  <button ket={letter} onClick={() => handleGuess(letter)}>
                    {letter}
                  </button>
                ))}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>No question</div>
      )}
    </div>
  );
}
