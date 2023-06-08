import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import helper, { getAllData } from "../../../helper/helper";
import NavBarAdmin from "../NavBar";

export default function UpdateUserAdmin() {
  const params = useParams();
  const [user, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const fecthDetailUser = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/users/${params.id}`
      );
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const changePassword = (password) => {
    setPassword(password);
  };
  const changeName = (name) => {
    setName(name);
  };

  useEffect(() => {
    fecthDetailUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const UPDATE_USER_URL = "/api/users/" + user.id;
    try {
      await helper.put(
        UPDATE_USER_URL,
        JSON.stringify({
          password,
          name,
          username: user.username,
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
                Update a user
              </h2>
              <form action="#">
                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={user.username}
                      required=""
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
                      Password
                    </label>
                    <input
                      type="password"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="******"
                      required=""
                      onChange={(e) => changePassword(e.target.value)}
                    />
                  </div>
                </div>
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
                      placeholder={user.name}
                      required=""
                      onChange={(e) => changeName(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline pt-5"
                  onClick={(e) => handleUpdateUser(e)}
                >
                  Update user
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
