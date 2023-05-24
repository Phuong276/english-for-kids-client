import React from "react";

export default function QuestionListenGame(props) {
  const { question } = props;
  console.log(question);
  const playAudio = () => {
    new Audio(question.questionAudio).play();
  };

  return (
    <div>
      <img
        onClick={playAudio}
        src={question.questionImage}
        alt={question.id}
        className="hover:grow hover:shadow-lg rounded-[20%] hover:animate-pulse duration-200 w-[400px] h-[300px]"
      />
      <div className="pt-1">
        <button
          className="pt-2 flex items-center justify-between text-1xl bg-slate-600 hover:bg-slate-500 rounded-full py-2 px-6"
          style={{
            backgroundImage:
              "url('https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Fxanhngon.jpg?alt=media&token=216ec3db-90af-4892-abd0-bdf6a5f0d414')",
          }}
          onClick={playAudio}
        >
          Play audio
        </button>
      </div>
    </div>
  );
}
