import { child, get, ref } from "firebase/database";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

export default function RoundPictureLetterGame(props) {
  const { gameId, id, image, name } = props;
  const [show, setShow] = useState(false);
  const [roomId, setRoomId] = useState(undefined);
  const [mode, setMode] = useState(undefined);
  const [users, setUsers] = useState([]);

  const handleGetRoomId = (roomId) => {
    setRoomId(roomId);
  };

  if (roomId) {
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

  const navigate = useNavigate();
  const link = `/gamepictureletter/${gameId}/quiz`;

  const handlePlayAlone = () => {
    setMode(1);
  };

  const handlePlayWithFriend = () => {
    if (Object.keys(users).length <= 2) {
      setMode(2);
    } else {
      setMode(1);
    }
  };

  const handleNavigate = () => {
    setShow(true);
  };

  if (mode === 1) {
    navigate(
      {
        pathname: link,
        search: `?roundId=${id}`,
      },
      { state: { mode: mode } }
    );
  } else if (mode === 2) {
    navigate(
      {
        pathname: link,
        search: `?roundId=${id}`,
      },
      { state: { mode: mode, roomId: roomId } }
    );
  }

  return (
    <div>
      {show ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-green-200 outline-none focus:outline-none`}
              >
                <div className="flex items-start justify-between p-6 border-b border-solid border-slate-600 rounded-t">
                  <h3 className="text-3xl font-semibold">Room</h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-3xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-12 flex-auto">
                  <p className="my-4 text-slate-500 text-3xl leading-relaxed">
                    <div>
                      <input
                        type="text"
                        placeholder="Room Id"
                        onChange={(e) => handleGetRoomId(e.target.value)}
                      />
                    </div>
                    <div className="flex pt-10 justify-center">
                      <div className="pr-10">
                        <button
                          className="border-4 border-red-400 p-3"
                          onClick={() => handlePlayAlone()}
                        >
                          Play Alone
                        </button>
                      </div>
                      <div>
                        <button
                          className="border-4 border-red-400 p-3"
                          onClick={() => handlePlayWithFriend()}
                        >
                          Go to Room
                        </button>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : (
        <div></div>
      )}
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
      >
        <div onClick={handleNavigate} className="image">
          <img
            alt={name}
            className="hover:grow hover:shadow-lg rounded-[30%] hover:animate-pulse duration-200 w-[300px] h-[300px] border-8 border-lime-200"
            src={image}
          />
          <div className="pt-2 flex items-center justify-between text-2xl font-mono pl-[15%]">
            <p>{name}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
