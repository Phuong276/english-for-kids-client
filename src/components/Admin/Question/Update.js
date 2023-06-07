import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import helper, { getAllData } from "../../../helper/helper";
import { playAudio } from "../../../until/sound";
import Upload from "../../Firebase/Upload";
import NavBarAdmin from "../NavBar";

export default function UpdateQuestionAdmin() {
  const params = useParams();
  const [question, setQuestionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionText, setQuestionText] = useState(undefined);
  const [answerText, setAnswerText] = useState(undefined);

  const handleSetQuestionText = (questionText) => {
    setQuestionText(questionText);
  };

  const handleSetAnswerText = (answerText) => {
    setAnswerText(answerText);
  };

  const [imageUrl, setImageUrl] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [audio, setAudio] = useState(undefined);

  const handleSetImageUrl = (url) => {
    setImageUrl(url);
    setImage(url);
    toast.success("Set Image Success");
  };
  const handleSetAudioUrl = (url) => {
    setAudio(url);
    toast.success("Set Audio Success");
  };

  const fecthDetailGame = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/questions/${params.id}`
      );
      setQuestionData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fecthDetailGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateRound = async (e) => {
    e.preventDefault();
    const UPDATE_USER_URL = "/api/questions/" + params.id;
    try {
      await helper.put(
        UPDATE_USER_URL,
        JSON.stringify({
          questionImage: image || question.questionImage,
          questionAudio: audio || question.questionAudio,
          questionText: questionText || question.questionText,
          answerText: answerText || question.answerText,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
        }
      );
      toast.success("Update Success");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : error.response.data
      );
    }
  };

  if (isLoading) return;
  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Update question
              </h2>
              <form action="#">
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Question Text
                    </label>
                    <input
                      type="text"
                      name={question.questionText}
                      id={question.questionText}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                      placeholder={question.questionText}
                      onChange={(e) => handleSetQuestionText(e.target.value)}
                    />
                  </div>
                </div>
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Answer Text
                    </label>
                    <input
                      type="text"
                      name={question.answerText}
                      id={question.answerText}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                      placeholder={question.answerText}
                      onChange={(e) => handleSetAnswerText(e.target.value)}
                    />
                  </div>
                </div>
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Image
                    </label>
                    <img
                      src={imageUrl ? imageUrl : question.questionImage}
                      alt="game"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div className="pt-10">
                  <Upload callbackSetImageUrl={handleSetImageUrl}></Upload>
                </div>
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Audio
                    </label>
                    <button
                      px-6
                      py-4
                      className="p-[50px] font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => playAudio(question.questionAudio)}
                    >
                      Play Audio
                    </button>
                  </div>
                </div>
                <div className="pt-10">
                  <Upload callbackSetImageUrl={handleSetAudioUrl}></Upload>
                </div>
                <button
                  type="submit"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline pt-5"
                  onClick={(e) => handleUpdateRound(e)}
                >
                  Update question
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
