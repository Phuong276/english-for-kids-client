import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import helper, { getAllData } from "../../../helper/helper";
import Upload from "../../Firebase/Upload";
import NavBarAdmin from "../NavBar";

export default function UpdateRoundAdmin() {
  const params = useParams();
  const [round, setRoundData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [imageUrl, setImageUrl] = useState(undefined);
  const [image, setImage] = useState("");

  const handleSetImageUrl = (url) => {
    setImageUrl(url);
    setImage(url);
    toast.success("Set Image Success");
  };

  const fecthDetailGame = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/rounds/${params.id}`
      );
      setRoundData(data);
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
    const UPDATE_USER_URL = "/api/rounds/" + params.id;
    try {
      await helper.put(
        UPDATE_USER_URL,
        JSON.stringify({
          image,
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
                Update game
              </h2>
              <form action="#">
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                      placeholder={round.name}
                      disabled
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
                      src={imageUrl ? imageUrl : round.image}
                      alt="game"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline pt-5"
                  onClick={(e) => handleUpdateRound(e)}
                >
                  Update round
                </button>
              </form>
              <div className="pt-10">
                <Upload callbackSetImageUrl={handleSetImageUrl}></Upload>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
