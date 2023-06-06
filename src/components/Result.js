import React from "react";
import { useLocation } from "react-router-dom";

export default function Result() {
  const location = useLocation();

  const totalPoints = location.state.totalPoints;
  const totalQuestions = location.state.totalQuestions;

  return (
    <div className="bg-gray-300 w-[100%] h-[1100px]">
      <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
      </div>
      <div class="flex flex-col justify-center items-center h-[100vh]">
        <div class="!z-5 max-w-[378px] max-h-[368px] relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none border-4 border-gray-500">
          <div class="mb-auto flex flex-col items-center justify-center">
            <div class="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[26px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
              {totalPoints / totalQuestions >= 0.5 ? (
                <svg
                  class="h-10 w-10 text-green-400"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <circle cx="12" cy="12" r="9" />{" "}
                  <line x1="9" y1="9" x2="9.01" y2="9" />{" "}
                  <line x1="15" y1="9" x2="15.01" y2="9" />{" "}
                  <path d="M8 13a4 4 0 1 0 8 0m0 0H8" />
                </svg>
              ) : (
                <svg
                  class="h-10 w-10 text-red-500"
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
                  <circle cx="12" cy="12" r="9" />{" "}
                  <line x1="9" y1="10" x2="9.01" y2="10" />{" "}
                  <line x1="15" y1="10" x2="15.01" y2="10" />{" "}
                  <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
                </svg>
              )}
            </div>
            <p class="px-5 text-center text-8xl font-normal text-gray-600 md:!px-0 xl:!px-8 pt-5">
              {totalPoints} {"/"} {totalQuestions}
            </p>
          </div>
        </div>
        <p class="font-normal text-navy-700 mt-20 mx-auto w-max text-3xl">
          Back to{" "}
          <a href="/" class="text-brand-500 font-bold">
            Home
          </a>
        </p>
      </div>
    </div>
  );
}
