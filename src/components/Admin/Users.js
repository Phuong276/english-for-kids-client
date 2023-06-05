/* eslint-disable react-hooks/exhaustive-deps */
import NavBarAdmin from "./NavBar";
import { getAllData } from "../../helper/helper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UsersAdmin() {
  const [users, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllUser = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/users`,
        {
          pageIndex: 1,
          pageSize: 100,
        }
      );
      setUsersData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const deleteData = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVERHOST}/api/users/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    toast.success("Delete Success");
  };

  useEffect(() => {
    fecthAllUser();
  }, [deleteData]);

  const navigate = useNavigate();

  const updateData = (id) => {
    const link = "/admin/users/" + id;
    navigate(link);
  };

  const createData = () => {
    const link = "/admin/users/add";
    navigate(link);
  };

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
                    Username
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              {users.map((user) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-2xs font-mono">
                  <td className="px-6 py-4">{user.id}</td>
                  <td px-6 py-4>
                    {user.username}
                  </td>
                  <td px-6 py-4>
                    {user.name}
                  </td>
                  <td>
                    <input
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id={user.id}
                      type="button"
                      name={user.id}
                      value="Edit"
                      onClick={() => updateData(user.id)}
                    />
                  </td>
                  <td>
                    <input
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id={user.id}
                      type="button"
                      name={user.id}
                      value="Delete"
                      onClick={() => deleteData(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </table>
            <button
              className="pt-5 pl-[90%] text-blue-600 dark:text-blue-500 hover:underline font-serif text-2xs"
              onClick={() => createData()}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
