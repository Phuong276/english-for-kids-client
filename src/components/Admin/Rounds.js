import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllData } from "../../helper/helper";
import NavBarAdmin from "./NavBar";

export default function RoundsAdmin() {
  const params = useParams();
  const gameId = params.id;
  const [rounds, setRoundsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fecthAllRound = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/games/rounds/${gameId}`,
        {
          pageIndex: 1,
          pageSize: 100,
        }
      );
      setRoundsData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleGetQuestion = (roundId) => {
    const link = `/admin/questions/${roundId}`;
    navigate(link);
  };

  const handleUpdateRound = (roundId) => {
    const link = `/admin/rounds/update/${roundId}`;
    navigate(link);
  };

  const handleDeleteRound = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVERHOST}/api/rounds/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    toast.success("Delete Success");
  };

  useEffect(() => {
    fecthAllRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateData = () => {
    const link = "/admin/rounds/add";
    navigate(link, { state: { gameId: gameId } });
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
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              {rounds.map((round) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-2xs font-mono">
                  <td className="px-6 py-4">{round.id}</td>
                  <td px-6 py-4>
                    {round.name}
                  </td>
                  <td px-6 py-4>
                    <img
                      src={round.image}
                      alt="round"
                      width="150"
                      height="150"
                    />
                  </td>
                  <td>
                    <input
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id={round.id}
                      type="button"
                      name={round.id}
                      value="View"
                      onClick={() => handleGetQuestion(round.id)}
                    />
                  </td>
                  <td>
                    <input
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id={round.id}
                      type="button"
                      name={round.id}
                      value="Edit"
                      onClick={() => handleUpdateRound(round.id)}
                    />
                  </td>
                  <td>
                    <input
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id={round.id}
                      type="button"
                      name={round.id}
                      value="Delete"
                      onClick={() => handleDeleteRound(round.id)}
                    />
                  </td>
                </tr>
              ))}
            </table>
            <button
              className="pt-5 pl-[90%] text-blue-600 dark:text-blue-500 hover:underline font-serif text-2xs"
              onClick={() => handleCreateData()}
            >
              Add Round
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
