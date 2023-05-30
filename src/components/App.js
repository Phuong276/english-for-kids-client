import LandingPage from "./LandingPage";
import QuizVocabGame from "./VocabGame/Quiz";
import ResultVocabGame from "./VocabGame/Result";
import HomeVocabGame from "./VocabGame/Home";
import Login from "./Login/Login";
import { CheckAdmin, CheckLogin } from "../helper/helper";
import HomeHangmanGame from "./HangmanGame/Home";
import QuizHangmanGame from "./HangmanGame/Quiz";
import ResultHangmanGame from "./HangmanGame/Result";
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
import ResultScrambleGame from "./ScrambleGame/Result";
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
import ResultGrammarGame from "./GrammarGame/Result";

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
    path: "/gamevocab/:id/result",
    element: (
      <CheckLogin>
        <ResultVocabGame></ResultVocabGame>
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
    path: "/gamehangman/:id/result",
    element: (
      <CheckLogin>
        <ResultHangmanGame></ResultHangmanGame>
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
    path: "/gamescramble/:id/result",
    element: (
      <CheckLogin>
        <ResultScrambleGame></ResultScrambleGame>
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
    path: "/gamesgrammar/:id/result",
    element: (
      <CheckLogin>
        <ResultGrammarGame></ResultGrammarGame>
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
