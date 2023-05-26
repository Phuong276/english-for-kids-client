import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../../helper/helper";
import NavBarAdmin from "./NavBar";

export default function GamesAdmin() {
  const [games, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllGame = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/games`,
        {
          pageIndex: 1,
          pageSize: 100,
        }
      );
      setGamesData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    const link = `/admin/games/update/${id}`;
    navigate(link);
  };

  useEffect(() => {
    fecthAllGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                </tr>
              </thead>
              {games.map((game) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-2xs font-mono">
                  <td className="px-6 py-4">{game.id}</td>
                  <td px-6 py-4>
                    {game.name}
                  </td>
                  <td px-6 py-4>
                    <img src={game.image} alt="game" width="150" height="150" />
                  </td>
                  <td>
                    <input
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id="user.id"
                      type="button"
                      name="edit"
                      value="Edit"
                      onClick={() => handleEdit(game.id)}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
