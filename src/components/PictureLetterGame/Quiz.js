import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";

export default function QuizPictureLetterGame() {
  const [searchParams] = useSearchParams();
  const roundId = searchParams.get("roundId");

  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllQuestion = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/questions/${roundId}`
      );
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

  console.log(questions);

  const arrayText = [];
  const arrayImage = [];

  questions.map((question) => {
    arrayText.push({ id: question.id, text: question.questionText });
    arrayImage.push({ id: question.id, text: question.questionImage });
    return question;
  });

  console.log(arrayText, arrayImage);

  if (isLoading) return;
  return <div>QuizPictureLetterGame</div>;
}
