import React from "react";

export default function QuestionListenGame(props) {
  const { question } = props;
  console.log(question);
  const playAudio = () => {
    new Audio(question.questionAudio).play();
  };

  return (
    <div>
      <div>
        <img
          onClick={playAudio}
          src={question.questionImage}
          alt={question.id}
          className="questionImage"
        />
      </div>
      <button onClick={playAudio}>PLAY AUDIO</button>
    </div>
  );
}
