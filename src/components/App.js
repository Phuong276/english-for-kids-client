import "../styles/App.css";

import LandingPage from "./LandingPage";
import QuizVocabGame from "./VocabGame/Quiz";
import ResultVocabGame from "./VocabGame/Result";
import HomeVocabGame from "./VocabGame/Home";
import Login from "./Login/Login";
import { CheckLogin } from "../helper/helper";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import NavBar from "./NavBar";

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
