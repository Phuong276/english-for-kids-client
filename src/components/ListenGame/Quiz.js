import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { correctSound, incorrectSound, playAudio } from "../../until/sound";
import QuestionListenGame from "./Questions";
import TrueFalse from "../TrueFalse";
import { handleHeart, upsetPoint } from "../../until/point";
import { formatTime } from "../../until/time";

export default function QuizListenGame() {
  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");
  const [trace, setTrace] = useState(0);
  const [audioNow, setAudioNow] = useState("now");
  const [audioChose, setAudioChose] = useState("chose");
  const [traceQuestion, setTraceQuestion] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(5);
  const [audioTest, setAudioTest] = useState("");
  const [audioTestId, setAudioTestId] = useState(0);

  const [questions, setQuestionsData] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [startGame, setStartGame] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState("Incorrect");
  const [messModal, setMessModal] = useState("Let's try");
  const [colorModal, setColorModal] = useState(false);
  const [listAudio, setListAudio] = useState([]);

  const [countdown, setCountdown] = useState(300);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

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

  useEffect(() => {
    questions.map((item) => listAudio.push(item.questionAudio));
    listAudio.sort(() => {
      return 0.5 - Math.random();
    });
    setListAudio(listAudio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const handleStartGame = () => {
    setStartGame(true);
    playAudio(listAudio[trace]);
    setAudioNow(listAudio[trace]);
  };

  const handleStopGame = () => {
    setStartGame(false);
  };

  const handleSetAudioChose = (audio, id) => {
    setAudioChose(audio);
    setTraceQuestion(id);
  };

  const handleSetAudioChose2 = (questionText, audio, id) => {
    setQuestionText(questionText);
    setAudioTest(audio);
    setAudioTestId(id);
  };

  const user = JSON.parse(window.localStorage.getItem("user"));

  const linkResult = `/result`;
  const totalQuestions = questions.length;
  const [point, setPoint] = useState(0);
  if (questions.length <= trace || countdown <= 0 || incorrectGuesses <= 0) {
    navigate(linkResult, {
      state: { totalQuestions: totalQuestions, totalPoints: point },
    });
  }
  if (audioNow === audioChose) {
    setAudioChose("chose");
    setTrace(trace + 1);
    setShowModal(true);
    setTitelModal("Correct");
    setMessModal("You answered the question correctly.");
    setColorModal(true);
    playAudio(correctSound);
    upsetPoint(true, user.id, traceQuestion);
    setPoint(point + 1);
  } else if (audioChose !== "chose") {
    playAudio(incorrectSound);
    setAudioChose("chose");
    setIncorrectGuesses(incorrectGuesses - 1);
  }

  const handlePlayAudioTest = () => {
    playAudio(audioTest);
  };

  if (isLoading) return;
  return (
    <div className="bg-purple-100 min-h-[1100px]">
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
      <div className="flex p-3">
        <button
          className="border-[5px] border-purple-500 bg-purple-200 rounded-3xl hover:bg-purple-300 w-[100px] min-w-[100px] pl-6 flex h-[50px]"
          onClick={Quit}
        >
          <svg
            class="h-8 w-8 text-purple-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="4"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
          </svg>
        </button>
        <div className="pl-[75%] pt-3 text-3xl font-bold">
          Time: {formatTime(countdown)}
        </div>
        <div className="text-4xl pl-4 pt-2">
          <p className="text-pink-600 pb">{`${handleHeart(
            incorrectGuesses
          )}`}</p>
        </div>
      </div>
      <div className="container mx-auto text-center">
        <section>
          <div className="container mx-auto flex items-center flex-wrap">
            {startGame ? (
              <div className="container m-auto grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1">
                {questions.map((item) => (
                  <QuestionListenGame
                    question={item}
                    callbackSetAudioChose={handleSetAudioChose}
                    startGame={startGame}
                  />
                ))}
              </div>
            ) : (
              <div>
                <div className="flex text-center justify-center pb-10">
                  <div className="text-6xl pr-5">{questionText}</div>
                  <div>
                    <svg
                      class="h-16 w-16 text-black cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => handlePlayAudioTest()}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="container m-auto grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1">
                  {questions.map((item) => (
                    <QuestionListenGame
                      question={item}
                      callbackSetAudioChose2={handleSetAudioChose2}
                      startGame={startGame}
                      audioTestId={audioTestId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <div className="pb-10 grid grid-cols-3 pt-5">
          <div></div>
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
