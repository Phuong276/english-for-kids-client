import { swapString } from "../../until/randomText";

export default function QuestionsScreambleGame(props) {
  const { question, answerText, answers } = props;
  const word = answerText;
  const wordShow = swapString(word);
  const listitems = wordShow.split("");

  const handleShowAnswers = (answers, answerText) => {
    let text = answers;
    for (let i = 0; i < answerText.length - answers.length; i++) {
      text += " ";
    }
    return text;
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData("id", event.currentTarget.id);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    props.parentCallback(listitems[id]);
  };

  return (
    <div className="container mx-auto">
      {question ? (
        <div>
          {word === "quit" ? (
            <div>No Question</div>
          ) : (
            <div
              className="text-6xl font-serif"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <img
                src={question.questionImage}
                alt={question.id}
                width={700}
                height={700}
                className="mx-auto mt-5 mb-10 rounded-[20%] h-[400px] w-[400px]"
              />
              <ul className="flex justify-center pb-10">
                {handleShowAnswers(answers, word)
                  .split("")
                  .map((letter) => (
                    <li className="w-[120px] text-center h-[120px] rounded-[20px] border-4 border-cyan-200 bg-cyan-300 hover:opacity-60 font-mono">
                      {letter}
                    </li>
                  ))}
              </ul>
              <div>
                <ul className="inline-flex">
                  {wordShow.split("").map((letter, index) => (
                    <li
                      className="w-[120px] text-center h-[120px] rounded-[20px] border-4 border-cyan-200 bg-cyan-300 hover:opacity-60 font-mono"
                      key={index}
                      id={index}
                      draggable={true}
                      onDragStart={handleDragStart}
                    >
                      {letter}
                    </li>
                  ))}
                </ul>
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
