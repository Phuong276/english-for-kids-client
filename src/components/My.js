import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import helper, { getAllData } from "../helper/helper";

export default function My() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [password, setPassword] = useState(undefined);
  const [name, setName] = useState(undefined);

  const fecthData = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/info-users/${user.id}`
      );
      setData(data);
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

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const UPDATE_USER_URL = "/api/users/" + user.id;
    try {
      await helper.put(
        UPDATE_USER_URL,
        JSON.stringify({
          password: password ? password : user.password,
          name: name ? name : user.name,
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
  useEffect(() => {
    fecthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return;
  return (
    <div className="min-h-[800px] bg-amber-100 flex justify-center">
      <div className="h-[500px] w-[500px] p-10">
        <div className="relative w-full">
          <div className="rounded-[5%] md:h-96">
            <div className=" duration-700 ease-in-out" data-carousel-item>
              <div class="wrapper bg-gray-400 antialiased text-gray-900 rounded-[5%]">
                <div>
                  <div className="h-[400px] p-5">
                    <p>Username: </p>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={data.username}
                      required=""
                      disabled
                    />
                    <p>Name: </p>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={data.name}
                      required=""
                      onChange={(e) => changeName(e.target.value)}
                    />
                    <p>Password: </p>
                    <input
                      type="password"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="******"
                      required=""
                      onChange={(e) => changePassword(e.target.value)}
                    />
                    <p>Date Join</p>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={data.dateJoin.split("T")[0]}
                      required=""
                      disabled
                    />
                    <button
                      type="button"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline pt-3"
                      onClick={(e) => handleUpdateUser(e)}
                    >
                      Update user
                    </button>
                  </div>
                  <div class="relative px-4 -mt-16">
                    <div class="bg-gray-300 p-6 rounded-lg shadow-lg">
                      <div class="flex items-baseline">
                        <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                          RANK
                        </span>
                        <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                          TOP {data.rank}
                        </div>
                      </div>
                      <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                        {name ? name : data.name}
                      </h4>
                      <div class="mt-4 text-center">
                        <span class="text-teal-600 text-md font-semibold text-3xl">
                          {data.totalPoints}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
