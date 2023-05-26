import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import { playAudio } from "../../until/sound";
import NavBarAdmin from "./NavBar";

export default function QuestionsAdmin() {
  const params = useParams();
  const roundId = params.id;

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

  if (isLoading) return;
  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className=" relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xl font-serif text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Question Text
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Answer Text
                  </th>
                  <th scope="col" class="px-6 py-3">
                    List Answers
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Question Image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Question Audio
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              {questions.map((question) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-2xs font-mono">
                  <td className="px-6 py-4">{question.id}</td>
                  <td px-6 py-4>
                    {question.questionText}
                  </td>
                  <td px-6 py-4>
                    {question.answerText}
                  </td>
                  <td px-6 py-4>
                    <ul>
                      {question.answers.map((item) => (
                        <div>{item.answerText}</div>
                      ))}
                    </ul>
                  </td>
                  <td px-6 py-4>
                    <img
                      src={question.questionImage}
                      alt="round"
                      width="150"
                      height="150"
                    />
                  </td>
                  <button
                    px-6
                    py-4
                    className="p-[50px] font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => playAudio(question.questionAudio)}
                  >
                    Play Audio
                  </button>
                  <td>
                    <input
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id={question.id}
                      type="button"
                      name={question.id}
                      value="Edit"
                    />
                  </td>
                  <td>
                    <input
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id={question.id}
                      type="button"
                      name={question.id}
                      value="Delete"
                    />
                  </td>
                </tr>
              ))}
            </table>
            <button className="pt-5 pl-[90%] text-blue-600 dark:text-blue-500 hover:underline font-serif text-2xs">
              Add Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
