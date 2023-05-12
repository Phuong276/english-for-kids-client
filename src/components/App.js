import "../styles/App.css";

import LandingPage from "./LandingPage";
import QuizVocabGame from "./VocabGame/Quiz";
import ResultVocabGame from "./VocabGame/Result";
import HomeVocabGame from "./VocabGame/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    path: "/games/result",
    element: <ResultVocabGame></ResultVocabGame>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
