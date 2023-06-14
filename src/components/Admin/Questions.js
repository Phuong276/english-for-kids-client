import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import helper, { getAllData } from "../../helper/helper";
import { playAudio } from "../../until/sound";
import NavBarAdmin from "./NavBar";

export default function QuestionsAdmin() {
  const params = useParams();
  const roundId = params.id;

  const [questions, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [idQuestion, setIdQuestion] = useState(undefined);
  const [newAnswer, setNewAnswer] = useState(undefined);

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

  const fecthAllAnswers = async (questionId) => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/answers/${questionId}`
      );
      setAnswers(data.answers);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const handleCreateAnswer = async (e) => {
    e.preventDefault();
    const UPDATE_USER_URL = "/api/answers";
    try {
      await helper.post(
        UPDATE_USER_URL,
        JSON.stringify({
          questionId: idQuestion,
          answerText: newAnswer,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      toast.success("Create Success");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : error.response.data
      );
    }
    fecthAllAnswers(idQuestion);
    fecthAllQuestion();
  };

  useEffect(() => {
    fecthAllQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_SERVERHOST}/api/questions/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    toast.success("Delete Success");
    fecthAllQuestion();
  };

  const navigate = useNavigate();
  const handleUpdateRound = (questionId) => {
    const link = `/admin/questions/update/${questionId}`;
    navigate(link);
  };

  const handleCreateData = () => {
    const link = "/admin/questions/add";
    navigate(link, { state: { roundId: roundId } });
  };

  const handleEditAnswers = async (idQuestion) => {
    setIdQuestion(idQuestion);
    await fecthAllAnswers(idQuestion);
    setShow(true);
  };

  const handleNotShow = () => {
    setShow(false);
  };

  const handleDeleteAnswer = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_SERVERHOST}/api/answers/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    toast.success("Delete Success");
    const newAnswers = answers.filter((item) => item.id !== id);
    setAnswers(newAnswers);
    fecthAllQuestion();
  };

  const handleSetNewAnswer = (newAnswer) => {
    setNewAnswer(newAnswer);
  };

  if (isLoading) return;
  return (
    <div>
      {show ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
              >
                <div className="flex items-start justify-between p-6 border-b border-solid border-slate-600 rounded-t">
                  <h3 className="text-3xl font-semibold">Answers</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleNotShow()}
                  >
                    X
                  </button>
                </div>
                <div className="relative p-12 flex-auto">
                  <p className="my-4 text-slate-500 text-3xl leading-relaxed">
                    {answers.length &&
                      answers.map((answer) => (
                        <div className="flex">
                          <div>
                            <input
                              type="text"
                              placeholder={answer.answerText}
                            />
                          </div>
                          <input
                            class="text-red-600 dark:text-red-500 hover:underline"
                            id={answer.id}
                            type="button"
                            name={answer.id}
                            value="Delete"
                            onClick={() => handleDeleteAnswer(answer.id)}
                          />
                        </div>
                      ))}
                    <div className="pt-10">
                      <input
                        type="text"
                        placeholder="New answer"
                        onChange={(e) => handleSetNewAnswer(e.target.value)}
                      />
                    </div>
                    <div className="flex pt-10 justify-center">
                      <div className="pr-10">
                        <button
                          className="border-4 border-green-300 p-3 bg-green-400 rounded-[10%]"
                          onClick={(e) => handleCreateAnswer(e)}
                        >
                          Add
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
                    <button
                      px-6
                      py-4
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEditAnswers(question.id)}
                    >
                      Edit
                    </button>
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
                      onClick={() => handleUpdateRound(question.id)}
                    />
                  </td>
                  <td>
                    <input
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id={question.id}
                      type="button"
                      name={question.id}
                      value="Delete"
                      onClick={() => handleDelete(question.id)}
                    />
                  </td>
                </tr>
              ))}
            </table>
            <button
              className="pt-5 pl-[90%] text-blue-600 dark:text-blue-500 hover:underline font-serif text-2xs"
              onClick={() => handleCreateData()}
            >
              Add Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
