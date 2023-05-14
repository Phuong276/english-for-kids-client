import "../styles/App.css";

import LandingPage from "./LandingPage";
import QuizVocabGame from "./VocabGame/Quiz";
import ResultVocabGame from "./VocabGame/Result";
import HomeVocabGame from "./VocabGame/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "/games/:id",
    element: <HomeVocabGame></HomeVocabGame>,
  },
  {
    path: "/games/:id/quiz",
    element: <QuizVocabGame></QuizVocabGame>,
  },
  {
    path: "/games/:id/result",
    element: <ResultVocabGame></ResultVocabGame>,
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
