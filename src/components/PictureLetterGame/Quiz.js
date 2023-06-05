import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { correctSound, incorrectSound, playAudio } from "../../until/sound";
import { formatTime } from "../../until/time";
import TrueFalse from "../TrueFalse";

export default function QuizPictureLetterGame() {
  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");
  const [click, setClick] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestionsData] = useState([]);
  const [trace, setTrace] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState("Incorrect");
  const [messModal, setMessModal] = useState("Let's try");
  const [colorModal, setColorModal] = useState(false);

  const [choseFirst, setChoseFirst] = useState(undefined);
  const [choseSecond, setChoseSecond] = useState(undefined);
  const [choseAfter, setChoseAfter] = useState(undefined);

  const [arrayText, setArrayText] = useState([]);
  const [arrayImage, setArrayImage] = useState([]);

  const fecthAllQuestion = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/questions/${roundId}`
      );
      data.map((question) => {
        arrayText.push({
          id: question.id,
          text: question.questionText,
          status: 0,
        });
        setArrayText(arrayText);
        arrayImage.push({
          id: question.id,
          text: question.questionImage,
          status: 0,
        });
        setArrayImage(arrayImage);
        return question;
      });
      arrayImage.sort(() => Math.random() - 0.5);
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

  const handleClickTextItem = (id) => {
    setChoseAfter(choseFirst);
    setChoseFirst(id);
    arrayText[id].status = 1;
    setClick(click + 1);
  };
  const handleClickImageItem = (id) => {
    setChoseAfter(choseSecond);
    setChoseSecond(id);
    arrayImage[id].status = 1;
    setClick(click + 1);
  };

  if (click % 2 === 0 && click !== 0) {
    if (choseFirst !== undefined && choseSecond !== undefined) {
      if (arrayText[choseFirst].id === arrayImage[choseSecond].id) {
        arrayText[choseFirst].status = 2;
        arrayImage[choseSecond].status = 2;
        setShowModal(true);
        setTrace(trace + 1);
        setTitelModal("Correct");
        setMessModal("Congratulation! You answered the question correctly.");
        setColorModal(true);
        playAudio(correctSound);
      } else {
        setShowModal(true);
        setTitelModal("Incorrect");
        setMessModal(`You answered the question wrong.`);
        setColorModal(false);
        playAudio(incorrectSound);
        arrayText[choseFirst].status = 0;
        arrayImage[choseSecond].status = 0;
      }
    } else if (choseFirst && choseSecond === undefined) {
      arrayText[choseAfter].status = 0;
      arrayText[choseFirst].status = 0;
    } else if (choseSecond && choseFirst === undefined) {
      arrayImage[choseAfter].status = 0;
      arrayImage[choseSecond].status = 0;
    }
    setChoseFirst(undefined);
    setChoseSecond(undefined);
    setClick(0);
  }

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const [countdown, setCountdown] = useState(300);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  const params = useParams();
  const navigate = useNavigate();
  const linkQuit = `/gamepictureletter/${params.id}`;
  const handleQuitGame = () => {
    navigate(linkQuit);
  };

  const link = `/gamepictureletter/${params.id}/result`;
  if (questions.length <= trace || countdown <= 0) {
    navigate(link, {
      state: { totalQuestions: questions.length, totalPoints: trace },
    });
  }

  if (isLoading) return;
  return (
    <div className="p-4 bg-amber-200 min-h-[1100px]">
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
      <div className="flex">
        <button
          className="border-[5px] border-gray-500 bg-orange-200 rounded-3xl hover:bg-orange-300 w-[5%] pl-6 flex"
          onClick={handleQuitGame}
        >
          <svg
            class="h-8 w-8 text-gray-500"
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
        <div className="pl-[80%] pt-3 text-2xl font-bold">
          Time: {formatTime(countdown)}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-10 p-5 w-[1000px]">
          {arrayText.map((item, index) =>
            item.status === 0 ? (
              <div
                className="bg-amber-400 rounded-md h-[200px] w-[200px] flex items-center justify-center cursor-pointer text-5xl font-serif"
                onClick={() => handleClickTextItem(index)}
              >
                {item.text}
              </div>
            ) : item.status === 1 ? (
              <div className="bg-cyan-400 rounded-md h-[200px] w-[200px] flex items-center justify-center border-8 border-green-400">
                {item.text}
              </div>
            ) : (
              <div></div>
            )
          )}
          {arrayImage.map((item, index) =>
            item.status === 0 ? (
              <img
                src={item.text}
                alt={item.id}
                className="h-[200px] w-[200px] rounded-md flex items-center justify-center cursor-pointer"
                onClick={() => handleClickImageItem(index)}
              />
            ) : item.status === 1 ? (
              <img
                src={item.text}
                alt={item.id}
                className="h-[200px] w-[200px] rounded-md flex items-center justify-center border-8 border-green-400"
              />
            ) : (
              <div></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
