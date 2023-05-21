import "../styles/App.css";

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
        <LandingPage></LandingPage>
      </CheckLogin>
    ),
  },
  {
    path: "/gamevocab/:id",
    element: (
      <CheckLogin>
        <NavBar></NavBar>
        <HomeVocabGame></HomeVocabGame>
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
        <NavBar></NavBar>
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
        <NavBar></NavBar>
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
    path: "/firebase/upload",
    element: (
      <CheckLogin>
        <Upload></Upload>
      </CheckLogin>
    ),
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
