import LandingPage from "./LandingPage";
import QuizVocabGame from "./VocabGame/Quiz";
import HomeVocabGame from "./VocabGame/Home";
import Login from "./Login/Login";
import { CheckAdmin, CheckLogin } from "../helper/helper";
import HomeHangmanGame from "./HangmanGame/Home";
import QuizHangmanGame from "./HangmanGame/Quiz";
import QuizListenGame from "./ListenGame/Quiz";
import Upload from "./Firebase/Upload";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import NavBar from "./NavBar";
import HomeListenGame from "./ListenGame/Home";
import HomeScrambleGame from "./ScrambleGame/Home";
import QuizScrambleGame from "./ScrambleGame/Quiz";
import HomeAdmin from "./Admin/Home";
import UsersAdmin from "./Admin/Users";
import GamesAdmin from "./Admin/Games";
import UpdateUserAdmin from "./Admin/User/Update";
import CreateUserAdmin from "./Admin/User/Create";
import Headers from "./Header";
import Footer from "./Footer";
import About from "./About";
import RoundsAdmin from "./Admin/Rounds";
import QuestionsAdmin from "./Admin/Questions";
import UpdateGameAdmin from "./Admin/Game/Update";
import UpdateRoundAdmin from "./Admin/Round/Update";
import DragDrop from "./DragDrop";
import HomeGrammarGame from "./GrammarGame/Home";
import QuizGrammarGame from "./GrammarGame/Quiz";
import HomePicturePickerGame from "./PicturePickerGame/Home";
import QuizPicturePickerGame from "./PicturePickerGame/Quiz";
import HomePictureLetterGame from "./PictureLetterGame/Home";
import QuizPictureLetterGame from "./PictureLetterGame/Quiz";
import CreateRoundAdmin from "./Admin/Round/Create";
import Result from "./Result";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + window.localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/",
    element: (
      <CheckLogin>
        <NavBar></NavBar>
        <Headers></Headers>
        <LandingPage></LandingPage>
        <About></About>
        <Footer></Footer>
      </CheckLogin>
    ),
  },
  {
    path: "/result",
    element: (
      <CheckLogin>
        <Result></Result>
      </CheckLogin>
    ),
  },
  {
    path: "/gamevocab/:id",
    element: (
      <CheckLogin>
        <NavBar></NavBar>
        <HomeVocabGame></HomeVocabGame>
        <Footer></Footer>
      </CheckLogin>
    ),
  },
  {
    path: "/gamevocab/:id/quiz",
    element: (
      <CheckLogin>
        <QuizVocabGame></QuizVocabGame>
      </CheckLogin>
    ),
  },
  {
    path: "/gamehangman/:id",
    element: (
      <CheckLogin>
        <NavBar></NavBar>
        <HomeHangmanGame></HomeHangmanGame>
        <Footer></Footer>
      </CheckLogin>
    ),
  },
  {
    path: "/gamehangman/:id/quiz",
    element: (
      <CheckLogin>
        <QuizHangmanGame></QuizHangmanGame>
      </CheckLogin>
    ),
  },
  {
    path: "/gamelisten/:id",
    element: (
      <CheckLogin>
        <NavBar></NavBar>
        <HomeListenGame></HomeListenGame>
        <Footer></Footer>
      </CheckLogin>
    ),
  },
  {
    path: "/gamelisten/:id/quiz",
    element: (
      <CheckLogin>
        <QuizListenGame></QuizListenGame>
      </CheckLogin>
    ),
  },
  {
    path: "/gamepicturepicker/:id",
    element: (
      <CheckLogin>
        <NavBar></NavBar>
        <HomePicturePickerGame></HomePicturePickerGame>
        <Footer></Footer>
      </CheckLogin>
    ),
  },
  {
    path: "/gamepicturepicker/:id/quiz",
    element: (
      <CheckLogin>
        <QuizPicturePickerGame></QuizPicturePickerGame>
      </CheckLogin>
    ),
  },
  {
    path: "/gamepictureletter/:id",
    element: (
      <CheckLogin>
        <NavBar></NavBar>
        <HomePictureLetterGame></HomePictureLetterGame>
        <Footer></Footer>
      </CheckLogin>
    ),
  },
  {
    path: "/gamepictureletter/:id/quiz",
    element: (
      <CheckLogin>
        <QuizPictureLetterGame></QuizPictureLetterGame>
      </CheckLogin>
    ),
  },
  {
    path: "/gamescramble/:id",
    element: (
      <CheckLogin>
        <NavBar></NavBar>
        <HomeScrambleGame></HomeScrambleGame>
        <Footer></Footer>
      </CheckLogin>
    ),
  },
  {
    path: "/gamescramble/:id/quiz",
    element: (
      <CheckLogin>
        <QuizScrambleGame></QuizScrambleGame>
      </CheckLogin>
    ),
  },
  {
    path: "/gamesgrammar/:id",
    element: (
      <CheckLogin>
        <NavBar></NavBar>
        <HomeGrammarGame></HomeGrammarGame>
        <Footer></Footer>
      </CheckLogin>
    ),
  },
  {
    path: "/gamesgrammar/:id/quiz",
    element: (
      <CheckLogin>
        <QuizGrammarGame></QuizGrammarGame>
      </CheckLogin>
    ),
  },
  {
    path: "/admin",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <HomeAdmin></HomeAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <UsersAdmin></UsersAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/users/:id",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <UpdateUserAdmin></UpdateUserAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/users/add",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <CreateUserAdmin></CreateUserAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/games",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <GamesAdmin></GamesAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/games/update/:id",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <UpdateGameAdmin></UpdateGameAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/rounds/:id",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <RoundsAdmin></RoundsAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/rounds/update/:id",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <UpdateRoundAdmin></UpdateRoundAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/rounds/add",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <CreateRoundAdmin></CreateRoundAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/questions/:id",
    element: (
      <CheckLogin>
        <CheckAdmin>
          <QuestionsAdmin></QuestionsAdmin>
        </CheckAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/firebase/upload",
    element: (
      <CheckLogin>
        <Upload></Upload>
      </CheckLogin>
    ),
  },
  {
    path: "/dragdrop",
    element: <DragDrop></DragDrop>,
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
