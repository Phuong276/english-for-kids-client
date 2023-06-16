export default function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="bg-lime-200">
      <nav id="header" className="w-full z-30 top-0 py-1">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
          <label for="menu-toggle" className="cursor-pointer md:hidden block">
            <svg
              className="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="hidden" type="checkbox" id="menu-toggle" />

          <div
            className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
            id="menu"
          >
            <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                <li>
                  <a
                    className="inline-block no-underline hover:text-black hover:underline py-1 px-4"
                    href="/"
                  >
                    <svg
                      class="h-14 w-14 back-red-500"
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
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />{" "}
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />{" "}
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
            <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                <li>
                  <a
                    className="inline-block no-underline hover:text-black hover:underline py-1 px-4"
                    href="/top"
                  >
                    <svg
                      class="h-14 w-14 back-red-500"
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
                      <circle cx="12" cy="9" r="6" />{" "}
                      <polyline
                        points="9 14.2 9 21 12 19 15 21 15 14.2"
                        transform="rotate(-30 12 9)"
                      />{" "}
                      <polyline
                        points="9 14.2 9 21 12 19 15 21 15 14.2"
                        transform="rotate(30 12 9)"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
            <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                <li>
                  <a
                    className="inline-block no-underline hover:text-black hover:underline py-1 px-4"
                    href="/my"
                  >
                    <svg
                      class="h-14 w-14 back-red-500"
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
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
            <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-500 pt-4 md:pt-0">
                <li>
                  <a
                    className="inline-block no-underline hover:text-black hover:underline py-1 px-4"
                    href="/login"
                    onClick={handleLogout}
                  >
                    <svg
                      class="h-14 w-14 text-red-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="order-1 md:order-2">
            <a
              className="flex items-center tracking-wide no-underline hover:no-underline text-gray-800 text-3xl font-mono "
              href="/"
            >
              ENGLISGH FOR KIDS
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
