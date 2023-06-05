import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import helper from "../../../helper/helper";
import Upload from "../../Firebase/Upload";
import NavBarAdmin from "../NavBar";

export default function CreateRoundAdmin() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(undefined);
  const [image, setImage] = useState("");
  const location = useLocation();

  const handleSetImageUrl = (url) => {
    setImageUrl(url);
    setImage(url);
    toast.success("Set Image Success");
  };

  const changeName = (name) => {
    setName(name);
  };

  const handleCreateRound = async (e) => {
    e.preventDefault();
    const CREATE_ROUND_URL = "/api/rounds";
    try {
      await helper.post(
        CREATE_ROUND_URL,
        JSON.stringify({
          name,
          image: image,
          gameId: Number(location.state.gameId),
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
  };

  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Add a new round
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
                      placeholder="Username"
                      required=""
                      onChange={(e) => changeName(e.target.value)}
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
                      src={imageUrl ? imageUrl : ""}
                      alt="game"
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline pt-5"
                  onClick={(e) => handleCreateRound(e)}
                >
                  Add round
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
