import { child, get, ref, remove, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { db } from "../../firebase";
import { getAllData } from "../../helper/helper";
import { handleHeart, upsetPoint } from "../../until/point";
import { correctSound, incorrectSound, playAudio } from "../../until/sound";
import { formatTime } from "../../until/time";
import TrueFalse from "../TrueFalse";

export default function QuizPictureLetterGame() {
  const location = useLocation();
  const roomId = location.state.roomId;
  const mode = location.state.mode === 1 ? true : false;
  const [points, setPoints] = useState(0);
  const [meName, setMeName] = useState(undefined);
  const [notMeName, setNotMeName] = useState(undefined);
  const [mePoint, setMePoint] = useState(undefined);
  const [notMePoint, setNotMePoint] = useState(undefined);
  const [notMeId, setNotMeId] = useState(undefined);
  const [notMeBlock, setNotMeBlock] = useState(undefined);
  const [meBlock, setMeBlock] = useState(undefined);
  const [block, setBlock] = useState(undefined);

  function writeImageData(id, idChild, text, status) {
    set(ref(db, "rooms/" + roomId + "/images/" + id), {
      id: idChild,
      text: text,
      status: status,
    });
  }
  function writeTextData(id, idChild, text, status) {
    set(ref(db, "rooms/" + roomId + "/texts/" + id), {
      id: idChild,
      text: text,
      status: status,
    });
  }
  const user = JSON.parse(localStorage.getItem("user"));
  function writeUserData(point, block, id, username) {
    set(ref(db, "rooms/" + roomId + "/users/" + id), {
      id: id,
      username: username,
      points: point,
      block: block,
    });
  }

  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");
  const [click, setClick] = useState(0);
  const [start, setStart] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestionsData] = useState([]);
  const [trace, setTrace] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(5);

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitelModal] = useState("Incorrect");
  const [messModal, setMessModal] = useState("Let's try");
  const [colorModal, setColorModal] = useState(false);

  const [choseFirst, setChoseFirst] = useState(undefined);
  const [choseSecond, setChoseSecond] = useState(undefined);
  const [choseAfter, setChoseAfter] = useState(undefined);

  const [arrayText, setArrayText] = useState([]);
  const [arrayImage, setArrayImage] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const link = `/result`;

  let index = 0;

  const fecthAllQuestion = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/questions/${roundId}`
      );
      data.map((question) => {
        if (mode) {
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
        } else {
          writeTextData(index, question.id, question.questionText, 0);
          writeImageData(index, question.id, question.questionImage, 0);
          get(child(ref(db), `rooms/${roomId}/users`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const usersCheck = snapshot.val();
                if (Object.keys(usersCheck).length > 0) {
                  writeUserData(points, false, user.id, user.username);
                  setBlock(false);
                }
              } else {
                writeUserData(points, true, user.id, user.username);
                setBlock(true);
                console.log("No data");
              }
            })
            .catch((error) => {
              console.log(error);
            });

          index = index + 1;
        }
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

  useEffect(() => {
    if (!mode) {
      get(child(ref(db), `rooms/${roomId}/images`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setArrayImage(snapshot.val());
          } else {
            console.log("No data");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      get(child(ref(db), `rooms/${roomId}/texts`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setArrayText(snapshot.val());
          } else {
            console.log("No data");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      get(child(ref(db), `rooms/${roomId}/users`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUsers(snapshot.val());
          } else {
            console.log("No data");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const me = Object.values(users).filter((item) => {
      return item.username === user.username;
    });
    me.map((item) => {
      setMeName(item.username);
      setMePoint(item.points);
      setMeBlock(item.block);
      return item;
    });
    const notMe = Object.values(users).filter((item) => {
      return item.username !== user.username;
    });
    notMe.map((item) => {
      setNotMeName(item.username);
      setNotMePoint(item.points);
      setNotMeBlock(item.block);
      setNotMeId(item.id);
      return item;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choseAfter, choseFirst, choseSecond, fecthAllQuestion]);

  const handleClickTextItem = (id) => {
    if (mode) {
      arrayText[id].status = 1;
    } else {
      writeTextData(id, arrayText[id].id, arrayText[id].text, 1);
    }
    setChoseAfter(choseFirst);
    setChoseFirst(id);
    setClick(click + 1);
    setStart(start + 1);
  };
  const handleClickImageItem = (id) => {
    if (mode) {
      arrayImage[id].status = 1;
    } else {
      writeImageData(id, arrayImage[id].id, arrayImage[id].text, 1);
    }
    setChoseAfter(choseSecond);
    setChoseSecond(id);
    setClick(click + 1);
    setStart(start + 1);
  };

  if (click % 2 === 0 && click !== 0) {
    if (choseFirst !== undefined && choseSecond !== undefined) {
      if (arrayText[choseFirst].id === arrayImage[choseSecond].id) {
        if (mode) {
          arrayText[choseFirst].status = 2;
          arrayImage[choseSecond].status = 2;
          upsetPoint(true, user.id, questions[trace].id);
        } else {
          writeTextData(
            choseFirst,
            arrayText[choseFirst].id,
            arrayText[choseFirst].text,
            2
          );
          writeImageData(
            choseSecond,
            arrayImage[choseSecond].id,
            arrayImage[choseSecond].text,
            2
          );
          setPoints(points + 1);
          writeUserData(points + 1, !meBlock, user.id, user.username);
          writeUserData(notMePoint, !notMeBlock, notMeId, notMeName);
          setBlock(!block);
        }
        setShowModal(true);
        setTrace(trace + 1);
        setTitelModal("Correct");
        setMessModal("You answered the question correctly.");
        setColorModal(true);
        playAudio(correctSound);
      } else {
        setIncorrectGuesses(incorrectGuesses - 1);
        setShowModal(true);
        setTitelModal("Incorrect");
        setMessModal(`You answered the question wrong.`);
        setColorModal(false);
        playAudio(incorrectSound);
        if (mode) {
          arrayText[choseFirst].status = 0;
          arrayImage[choseSecond].status = 0;
        } else {
          writeTextData(
            choseFirst,
            arrayText[choseFirst].id,
            arrayText[choseFirst].text,
            0
          );
          writeImageData(
            choseSecond,
            arrayImage[choseSecond].id,
            arrayImage[choseSecond].text,
            0
          );
          writeUserData(mePoint, !meBlock, user.id, user.username);
          writeUserData(notMePoint, !notMeBlock, notMeId, notMeName);
        }
      }
    } else if (choseFirst && choseSecond === undefined) {
      if (mode) {
        arrayText[choseAfter].status = 0;
        arrayText[choseFirst].status = 0;
      } else {
        writeTextData(
          choseAfter,
          arrayText[choseAfter].id,
          arrayText[choseAfter].text,
          0
        );
        writeTextData(
          choseFirst,
          arrayText[choseFirst].id,
          arrayText[choseFirst].text,
          0
        );
        writeUserData(mePoint, !meBlock, user.id, user.username);
        writeUserData(notMePoint, !notMeBlock, notMeId, notMeName);
      }
    } else if (choseSecond && choseFirst === undefined) {
      if (mode) {
        arrayImage[choseAfter].status = 0;
        arrayImage[choseSecond].status = 0;
      } else {
        writeImageData(
          choseAfter,
          arrayImage[choseAfter].id,
          arrayImage[choseAfter].text,
          0
        );
        writeImageData(
          choseSecond,
          arrayImage[choseSecond].id,
          arrayImage[choseSecond].text,
          0
        );
        writeUserData(mePoint, !meBlock, user.id, user.username);
        writeUserData(notMePoint, !notMeBlock, notMeId, notMeName);
      }
    }
    setChoseFirst(undefined);
    setChoseSecond(undefined);
    setClick(0);
  }

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1000);
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
  const linkQuit = `/gamepictureletter/${params.id}`;
  const handleQuitGame = () => {
    navigate(linkQuit);
  };

  if (
    (questions.length <= trace && start !== 0) ||
    countdown <= 0 ||
    incorrectGuesses <= 0 ||
    (arrayImage.filter((item) => item.status === 0).length <= 0 && start !== 0)
  ) {
    const tasksRef = ref(db, "rooms/" + roomId);
    remove(tasksRef).then(() => {
      console.log("location removed");
    });
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
          className="border-[5px] border-gray-500 bg-orange-200 rounded-3xl hover:bg-orange-300 w-[5%] pl-6 flex h-[50px]"
          onClick={handleQuitGame}
        >
          <svg
            class="h-8 w-8 text-gray-500 "
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
        <div className="py-10 pt-2 text-4xl pl-4">
          <p className="text-pink-600 pb">{`${handleHeart(
            incorrectGuesses
          )}`}</p>
        </div>
      </div>
      <div className="flex justify-center">
        {mode === false ? (
          <div className="h-[400px] w-[400px] p-10">
            <div className="relative w-full">
              <div className="rounded-[5%] md:h-96">
                <div className=" duration-700 ease-in-out" data-carousel-item>
                  <div class="wrapper bg-gray-400 antialiased text-gray-900">
                    <div>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Fkid1.png?alt=media&token=0a5fec02-2619-4545-982e-581dd1236186&_gl=1*eyn5dh*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NjU3MzMzMy40NC4xLjE2ODY1NzMzNjguMC4wLjA."
                        alt=" random imgee"
                        class="w-full object-cover object-center rounded-lg shadow-md"
                      />
                      <div class="relative px-4 -mt-16  ">
                        <div class="bg-amber-300 p-6 rounded-lg shadow-lg">
                          <div class="flex items-baseline">
                            <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                              Me
                            </span>
                          </div>
                          <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                            {meName}
                          </h4>
                          <div class="mt-4">
                            <span class="text-teal-600 text-md font-semibold text-3xl">
                              {mePoint}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="grid grid-cols-4 w-[805px] border-4 border-amber-400"
          style={{
            backgroundImage:
              "url('https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Fcut%20(2).jpg?alt=media&token=4bc40950-a44e-4c70-9bc8-cf1b1b20d474&_gl=1*jd6n2l*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NjEyNDM4My4zNy4xLjE2ODYxMjU5NTcuMC4wLjA.')",
          }}
        >
          {arrayText.map((item, index) =>
            meBlock ? (
              item.status === 0 ? (
                <div
                  className="bg-amber-400 h-[200px] w-[200px] flex items-center justify-center cursor-pointer text-4xl font-serif border-2 border-amber-500"
                  onClick={() => handleClickTextItem(index)}
                >
                  {item.text}
                </div>
              ) : item.status === 1 ? (
                <div className="bg-cyan-400 h-[200px] w-[200px] flex items-center justify-center border-8 border-green-400 text-4xl font-serif">
                  {item.text}
                </div>
              ) : (
                <div className="h-[200px] w-[200px]"></div>
              )
            ) : item.status === 0 ? (
              <div className="bg-cyan-400 h-[200px] w-[200px] flex items-center justify-center text-4xl font-serif">
                {item.text}
              </div>
            ) : (
              <div className="h-[200px] w-[200px]"></div>
            )
          )}
          {arrayImage.map((item, index) =>
            meBlock ? (
              item.status === 0 ? (
                <img
                  src={item.text}
                  alt={item.id}
                  className="h-[200px] w-[200px]flex items-center justify-center cursor-pointer border-2 border-amber-500"
                  onClick={() => handleClickImageItem(index)}
                />
              ) : item.status === 1 ? (
                <img
                  src={item.text}
                  alt={item.id}
                  className="h-[200px] w-[200px] flex items-center justify-center border-8 border-green-400"
                />
              ) : (
                <div className="h-[200px] w-[200px]"></div>
              )
            ) : item.status === 0 ? (
              <img
                src={item.text}
                alt={item.id}
                className="h-[200px] w-[200px] flex items-center justify-center"
              />
            ) : (
              <div className="h-[200px] w-[200px]"></div>
            )
          )}
        </div>
        {mode === false ? (
          <div className="h-[400px] w-[400px] p-10">
            <div className="relative w-full">
              <div className="rounded-[5%] md:h-96">
                <div className=" duration-700 ease-in-out" data-carousel-item>
                  <div class="wrapper bg-gray-400 antialiased text-gray-900">
                    <div>
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Fkid2.png?alt=media&token=c6673cd8-5271-47fc-aa40-6d6d92c29778&_gl=1*6bswip*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NjU3MzMzMy40NC4xLjE2ODY1NzM0OTIuMC4wLjA."
                        alt=" random imgee"
                        class="w-full object-cover object-center rounded-lg shadow-md"
                      />
                      <div class="relative px-4 -mt-16  ">
                        <div class="bg-amber-300 p-6 rounded-lg shadow-lg">
                          <div class="flex items-baseline">
                            <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                              competitor
                            </span>
                          </div>
                          <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                            {notMeName}
                          </h4>
                          <div class="mt-4">
                            <span class="text-teal-600 text-md font-semibold text-3xl">
                              {notMePoint}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
