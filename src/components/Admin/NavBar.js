import { useEffect, useState } from "react";
import { getAllData } from "../../helper/helper";

export default function NavBarAdmin() {
  const [games, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllUser = async () => {
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

  useEffect(() => {
    fecthAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (isLoading) return;
  return (
    <div className="flex-grow-0">
      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <a
                href="/admin"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  class="h-6 w-6 text-black"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <line x1="4" y1="19" x2="20" y2="19" />{" "}
                  <polyline points="4 15 8 9 12 11 16 6 20 10" />
                </svg>
                <span class="ml-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/users"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  class="h-6 w-6 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />{" "}
                  <circle cx="9" cy="7" r="4" />{" "}
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />{" "}
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span class="ml-3">Users</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/games"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 peer"
              >
                <svg
                  class="h-6 w-6 text-bliack"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <rect x="2" y="6" width="20" height="12" rx="2" />{" "}
                  <path d="M6 12h4m-2 -2v4" />{" "}
                  <line x1="15" y1="11" x2="15" y2="11.01" />{" "}
                  <line x1="18" y1="13" x2="18" y2="13.01" />
                </svg>
                <span class="ml-3">Games</span>
              </a>
              <div class="hidden peer-hover:flex hover:flex w-[170px] flex-col bg-white drop-shadow-lg rounded-[5%]">
                {games.map((game) => (
                  <div>
                    <a
                      class="px-5 py-1 hover:bg-gray-400"
                      href={`/admin/rounds/${game.id}`}
                    >
                      {game.name}
                    </a>
                  </div>
                ))}
              </div>
            </li>
            <li>
              <a
                href="/login"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={logout}
              >
                <svg
                  class="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span class="ml-3">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
