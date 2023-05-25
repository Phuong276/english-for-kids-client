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
    <div className="container mx-auto">
      {question ? (
        <div>
          {word === "quit" ? (
            <div>No Question</div>
          ) : (
            <div className="text-6xl font-serif">
              <img
                src={question.questionImage}
                alt={question.id}
                width={700}
                height={700}
                className="mx-auto mt-10 mb-20 rounded-[20%]"
              />
              <p className="flex justify-center pb-20">
                {handleShowAnswers(answers, word)
                  .split("")
                  .map((letter) =>
                    letter ? (
                      <div className="w-[120px] text-center h-[120px] rounded-[20px] border-4 border-cyan-200 bg-cyan-300 hover:opacity-60 font-mono">
                        {letter}
                      </div>
                    ) : (
                      <div className="w-[120px] text-center h-[120px] rounded-[20px] border-4 border-cyan-200 bg-cyan-300 hover:opacity-60 font-mono">
                        _
                      </div>
                    )
                  )}
              </p>
              <div className="pb-10">
                <p>
                  {wordShow.split("").map((letter) => (
                    <button
                      className="w-[120px] text-center h-[120px] rounded-[20px] border-4 border-cyan-200 bg-cyan-300 hover:opacity-60 font-mono"
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
      ) : (
        <div>No question</div>
      )}
    </div>
  );
}
