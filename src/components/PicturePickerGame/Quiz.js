import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { upsetPoint } from "../../until/point";
import { correctSound, playAudio } from "../../until/sound";
import TrueFalse from "../TrueFalse";
import QuestionsPicturePickerGame from "./Questions";

export default function QuizPicturePickerGame() {
  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");

  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trace, setTrace] = useState(0);
  const [clickStatus, setClickStatus] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState("Incorrect");
  const [messModal, setMessModal] = useState("Let's try");
  const [colorModal, setColorModal] = useState(false);
  const [totalQuestion, setTotalQuestion] = useState(0);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const [point, setPoint] = useState(0);

  const fecthAllQuestion = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/questions/${roundId}`
      );
      setQuestionsData(data);
      setIsLoading(false);
      setTrace(trace + 1);
      setTotalQuestion(data.length);
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
    const timer = setTimeout(() => {
      handleNext();
    }, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trace]);

  const handleNext = () => {
    if (trace < questions.length - 1) {
      setTrace(trace + 1);
    } else {
      setTrace(0);
    }
  };

  const handleGetAnswer = (status) => {
    setClickStatus(status);
  };
  const user = JSON.parse(window.localStorage.getItem("user"));

  if (clickStatus) {
    if (trace === 0) {
      const newQuestions = questions.filter(
        (item) => item.id !== questions[trace].id
      );
      setShowModal(true);
      setTitelModal("Correct");
      setMessModal("Congratulation! You answered the question correctly.");
      setColorModal(true);
      playAudio(correctSound);
      setQuestionsData(newQuestions);
      upsetPoint(true, user.id, questions[trace].id);
      setPoint(point + 1);
      setTotalQuestion(totalQuestion - 1);
    }
    setClickStatus(false);
  }

  const params = useParams();
  const link = `/gamepicturepicker/${params.id}/result`;

  const navigate = useNavigate();
  if (questions.length === 0) {
    navigate(link, { state: { totalPoints: point } });
  }

  const linkQuit = `/gamepicturepicker/${params.id}`;
  const handleQuitGame = () => {
    navigate(linkQuit);
  };

  if (isLoading) return;
  return (
    <div className="bg-cyan-100 min-h-[1100px]">
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
      <button
        className="border-[5px] border-cyan-500 bg-cyan-200 rounded-3xl hover:bg-cyan-300 w-[5%] pl-6 flex"
        onClick={handleQuitGame}
      >
        <svg
          class="h-8 w-8 text-cyan-500"
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
      <div className="flex items-center justify-center mt-3">
        <div className="h-[400px] w-[400px] pr-5">
          <div className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-[5%] md:h-96">
              <div className=" duration-700 ease-in-out" data-carousel-item>
                <img
                  src={
                    questions[trace + 1]
                      ? questions[trace + 1].questionImage
                      : questions[0]
                      ? questions[0].questionImage
                      : ""
                  }
                  className="absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-[5%] h-[400px] w-[400px]"
                  alt={
                    questions[trace + 1]
                      ? questions[trace + 1].id
                      : questions[0]
                      ? questions[0].id
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-[400px] pl-5 pr-5">
          <div className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-[5%] md:h-96">
              <div className=" duration-700 ease-in-out" data-carousel-item>
                <img
                  src={questions[trace] ? questions[trace].questionImage : ""}
                  className="absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-[5%] h-[400px] w-[400px]"
                  alt={questions[trace] ? questions[trace].id : ""}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-[400px] pl-5">
          <div className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-[5%] md:h-96">
              <div className=" duration-700 ease-in-out" data-carousel-item>
                <img
                  src={
                    questions[trace - 1]
                      ? questions[trace - 1].questionImage
                      : questions[totalQuestion - 1]
                      ? questions[totalQuestion - 1].questionImage
                      : ""
                  }
                  className="absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-[5%] h-[400px] w-[400px]"
                  alt={
                    questions[trace - 1]
                      ? questions[trace - 1].id
                      : questions[totalQuestion - 1]
                      ? questions[totalQuestion - 1].id
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <QuestionsPicturePickerGame
          question={questions[0]}
          callbackGetAnswer={handleGetAnswer}
        />
      </div>
    </div>
  );
}
