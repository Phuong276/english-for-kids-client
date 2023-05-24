import { swapString } from "../../until/randomText";

export default function QuestionsScreambleGame(props) {
  const { question, answerText, answers } = props;
  const word = answerText;
  const wordShow = swapString(word);
  const handleGuess = (guess) => {
    props.parentCallback(guess);
  };

  const handleShowAnswers = (answers, answerText) => {
    let text = answers;
    for (let i = 0; i < answerText.length - answers.length; i++) {
      text += "_";
    }
    return text;
  };

  return (
    <div
      className="container mx-auto rounded-[10%]"
      style={{
        maxWidth: "2000px",
        height: "56rem",
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FoagWjI.jpg?alt=media&token=8670ac79-2219-4827-a5f6-d86ea669c650')",
      }}
    >
      {question ? (
        <div>
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
              <p className="flex justify-center pb-20">
                {handleShowAnswers(answers, word)
                  .split("")
                  .map((letter) =>
                    letter ? (
                      <div className="w-20 text-center h-20 rounded-[20px] border border-red-200 hover:opacity-60">
                        {letter}
                      </div>
                    ) : (
                      <div className="w-20 text-center h-20 rounded-[20px] border border-red-200 hover:opacity-60">
                        _
                      </div>
                    )
                  )}
              </p>
              <p>
                {wordShow.split("").map((letter) => (
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
      ) : (
        <div>No question</div>
      )}
    </div>
  );
}
