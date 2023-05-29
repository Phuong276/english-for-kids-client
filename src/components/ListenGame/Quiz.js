import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { correctSound, playAudio } from "../../until/sound";
import QuestionListenGame from "./Question";
import TrueFalse from "../TrueFalse";
import { upsetPoint } from "../../until/point";

export default function QuizListenGame() {
  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");
  const [trace, setTrace] = useState(0);
  const [audioNow, setAudioNow] = useState("now");
  const [audioChose, setAudioChose] = useState("chose");
  const [traceQuestion, setTraceQuestion] = useState(0);

  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startGame, setStartGame] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState("Incorrect");
  const [messModal, setMessModal] = useState("Let's try");
  const [colorModal, setColorModal] = useState(false);

  const fecthAllQuestion = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/questions/${roundId}`
      );
      setQuestionsData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fecthAllQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        handleStartGame();
      }, 1500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const params = useParams();
  const link = `/gamelisten/${params.id}`;
  const navigate = useNavigate();
  const Quit = () => {
    navigate(link);
  };

  let listAudio = [];

  questions.map((item) => listAudio.push(item.questionAudio));

  listAudio.sort(function() {
    return 0.5 - Math.random();});

  if (questions.length <= trace) {
    navigate(link);
  }

  const handleStartGame = () => {
    setStartGame(!startGame);
    playAudio(listAudio[trace]);
    setAudioNow(listAudio[trace]);
  };

  const handleStopGame = () => {
    setStartGame(!startGame);
  };

  const handleSetAudioChose = (audio, id) => {
    setAudioChose(audio);
    setTraceQuestion(id);
  };

  const user = JSON.parse(window.localStorage.getItem("user"));

  if (audioNow === audioChose) {
    setAudioChose("chose");
    setTrace(trace + 1);
    setStartGame(!startGame);
    setShowModal(true);
    setTitelModal("Correct");
    setMessModal("Congratulation! You answered the question correctly.");
    setColorModal(true);
    playAudio(correctSound);
    upsetPoint(true, user.id, traceQuestion);
  }

  if (isLoading) return;
  return (
    <div className="bg-purple-100">
      {showModal ? (
        <>
          <TrueFalse
            titelModal={titelModal}
            colorModal={colorModal}
            messModal={messModal}
            setShowModal={setShowModal}
          />
        </>
      ) : null}
      <div className="container mx-auto text-center pt-10 py-10">
        <section className="py-10 pt-10">
          <div className="container mx-auto flex items-center flex-wrap pt-4">
            {startGame ? (
              <div className="grid grid-cols-4 gap-16">
                {questions.map((item) => (
                  <QuestionListenGame
                    question={item}
                    callbackSetAudioChose={handleSetAudioChose}
                    status={false}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-16">
                {questions.map((item) => (
                  <QuestionListenGame question={item} status={true} />
                ))}
              </div>
            )}
          </div>
        </section>
        <div className="pb-10 grid grid-cols-4 pt-5">
          <div></div>
          <div>
            <button
              className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-5 pt-6 px-12 rounded-full text-2xl border-4 border-purple-500"
              onClick={Quit}
            >
              Quit
            </button>
          </div>
          <div>
            {startGame ? (
              <button
                className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-5 pt-6 px-12 rounded-full text-2xl border-4 border-purple-500"
                onClick={handleStopGame}
              >
                Stop
              </button>
            ) : (
              <button
                className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-5 pt-6 px-12 rounded-full text-2xl border-4 border-purple-500"
                onClick={handleStartGame}
              >
                Start
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
