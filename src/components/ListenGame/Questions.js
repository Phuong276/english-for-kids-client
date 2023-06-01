export default function QuestionListenGame(props) {
  const { question, status } = props;

  const playAudio = () => {
    try {
      props.callbackSetAudioChose(question.questionAudio, question.id);
    } catch (error) {
      new Audio(question.questionAudio).play();
    }
  };

  return (
    <div className="pt-5">
      <img
        onClick={playAudio}
        src={question.questionImage}
        alt={question.id}
        className="hover:grow hover:shadow-lg rounded-[20%] hover:animate-pulse duration-200 w-[400px] h-[300px]"
      />
      <div className="pt-3">
        {status ? (
          <button
            className="pt-2 flex items-center justify-between text-1xl bg-purple-300 hover:bg-purple-400 rounded-full py-2 px-6 border-4 border-purple-400"
            onClick={playAudio}
          >
            Play audio
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
