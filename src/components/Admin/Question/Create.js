import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import helper from "../../../helper/helper";
import { playAudio } from "../../../until/sound";
import Upload from "../../Firebase/Upload";
import NavBarAdmin from "../NavBar";

export default function CreateQuestionAdmin() {
  const [questionText, setQuestionText] = useState(undefined);
  const [answerText, setAnswerText] = useState(undefined);
  const location = useLocation();

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
    toast.success("Set Image Success");
  };

  const handleCreateRound = async (e) => {
    e.preventDefault();
    const UPDATE_USER_URL = "/api/questions";
    try {
      await helper.post(
        UPDATE_USER_URL,
        JSON.stringify({
          roundId: Number(location.state.roundId),
          questionImage: image,
          questionAudio: audio,
          questionText: questionText,
          answerText: answerText,
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

  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Add Question
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
                      name="name"
                      id="id"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
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
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
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
                    <img src={imageUrl} alt="game" width="200" height="200" />
                  </div>
                </div>
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Audio
                    </label>
                    {audio ? (
                      <button
                        px-6
                        py-4
                        className="p-[50px] font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => playAudio(audio)}
                      >
                        Play Audio
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline pt-5"
                  onClick={(e) => handleCreateRound(e)}
                >
                  Add Question
                </button>
              </form>
              <div className="pt-10">
                Upload Image
                <Upload callbackSetImageUrl={handleSetImageUrl}></Upload>
              </div>
              <div className="pt-10">
                Upload Audio
                <Upload callbackSetImageUrl={handleSetAudioUrl}></Upload>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
