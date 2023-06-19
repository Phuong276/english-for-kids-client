export default function QuestionListenGame(props) {
  const { question } = props;

  const playAudio = () => {
    try {
      if (props.startGame) {
        props.callbackSetAudioChose(question.questionAudio, question.id);
      } else {
        console.log(question);
        props.callbackSetAudioChose2(
          question.answerText,
          question.questionAudio,
          question.id
        );
        new Audio(question.questionAudio).play();
      }
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
        className={`hover:grow hover:shadow-lg rounded-[20%] hover:animate-pulse duration-200 w-[400px] h-[300px] cursor-pointer ${
          question.id === props.audioTestId ? "border-red-500 border-4" : ""
        }`}
      />
    </div>
  );
}
