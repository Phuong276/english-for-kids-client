import LandingPage from "./LandingPage";
import QuizVocabGame from "./VocabGame/Quiz";
import ResultVocabGame from "./VocabGame/Result";
import HomeVocabGame from "./VocabGame/Home";
import Login from "./Login/Login";
import { CheckLogin } from "../helper/helper";
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
import QuizTest from "./QuizTest";
import RoundsAdmin from "./Admin/Rounds";
import QuestionsAdmin from "./Admin/Questions";
import UpdateGameAdmin from "./Admin/Game/Update";
// import LoginFaild from "./Login/LoginFail";

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
    path: "/admin",
    element: (
      <CheckLogin>
        <HomeAdmin></HomeAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <CheckLogin>
        <UsersAdmin></UsersAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/users/:id",
    element: (
      <CheckLogin>
        <UpdateUserAdmin></UpdateUserAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/users/add",
    element: (
      <CheckLogin>
        <CreateUserAdmin></CreateUserAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/games",
    element: (
      <CheckLogin>
        <GamesAdmin></GamesAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/games/update/:id",
    element: (
      <CheckLogin>
        <UpdateGameAdmin></UpdateGameAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/games/:id",
    element: (
      <CheckLogin>
        <RoundsAdmin></RoundsAdmin>
      </CheckLogin>
    ),
  },
  {
    path: "/admin/round/:id",
    element: (
      <CheckLogin>
        <QuestionsAdmin></QuestionsAdmin>
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
    path: "/test",
    element: <QuizTest></QuizTest>,
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
