export default function QuestionListenGame(props) {
  const { question } = props;

  const playAudio = () => {
    try {
      props.callbackSetAudioChose(question.questionAudio, question.id);
    } catch (error) {
      new Audio(question.questionAudio).play();
    }
  };

  return (
    <div>
      <img
        onClick={playAudio}
        src={question.questionImage}
        alt={question.id}
        className="hover:grow hover:shadow-lg rounded-[20%] hover:animate-pulse duration-200 w-[400px] h-[300px]"
      />
    </div>
  );
}
