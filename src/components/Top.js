import { useEffect, useState } from "react";
import { getAllData } from "../helper/helper";

export default function Top() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthData = async () => {
    try {
      const { data } = await getAllData(
        `${process.env.REACT_APP_SERVERHOST}/api/points/users`,
        {
          pageIndex: 1,
          pageSize: 100,
        }
      );
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fecthData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return;
  return (
    <div className="flex justify-center text-center min-h-[800px] bg-amber-100 pt-10">
      <div className="h-[400px] w-[400px] p-10">
        <div className="relative w-full">
          <div className="rounded-[5%] md:h-96">
            <div className=" duration-700 ease-in-out" data-carousel-item>
              <div class="wrapper bg-gray-400 antialiased text-gray-900">
                <div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FTOP2.png?alt=media&token=61f91591-635c-4300-a88c-2b1be2f9d319&_gl=1*1kwf7lm*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NjE5OTEyMC4zOS4xLjE2ODYxOTk5MjAuMC4wLjA."
                    alt=" random imgee"
                    class="w-full object-cover object-center rounded-lg shadow-md"
                  />
                  <div class="relative px-4 -mt-16  ">
                    <div class="bg-gray-300 p-6 rounded-lg shadow-lg">
                      <div class="flex items-baseline">
                        <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                          RANK
                        </span>
                        <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                          TOP Second
                        </div>
                      </div>
                      <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                        {data.pointusers[1] ? data.pointusers[1].username : ""}
                      </h4>
                      <div class="mt-4">
                        <span class="text-teal-600 text-md font-semibold">
                          {data.pointusers[1] ? data.pointusers[1].point : ""}
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
      <div className="h-[400px] w-[400px] p-10">
        <div className="relative w-full">
          <div className="rounded-[5%] md:h-96">
            <div className=" duration-700 ease-in-out" data-carousel-item>
              <div class="wrapper bg-gray-400 antialiased text-gray-900">
                <div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FTOP1.png?alt=media&token=fa0e77fd-c764-4098-a018-03d69a2f447b&_gl=1*14jaxd9*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NjE5OTEyMC4zOS4xLjE2ODYxOTk5MDQuMC4wLjA."
                    alt=" random imgee"
                    class="w-full object-cover object-center rounded-lg shadow-md"
                  />
                  <div class="relative px-4 -mt-16  ">
                    <div class="bg-amber-300 p-6 rounded-lg shadow-lg">
                      <div class="flex items-baseline">
                        <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                          RANK
                        </span>
                        <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                          TOP First
                        </div>
                      </div>
                      <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                        {data.pointusers[0] ? data.pointusers[0].username : ""}
                      </h4>
                      <div class="mt-4">
                        <span class="text-teal-600 text-md font-semibold">
                          {data.pointusers[0] ? data.pointusers[0].point : ""}
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
      <div className="h-[400px] w-[400px] p-10">
        <div className="relative w-full">
          <div className="rounded-[5%] md:h-96">
            <div className=" duration-700 ease-in-out" data-carousel-item>
              <div class="wrapper bg-gray-400 antialiased text-gray-900">
                <div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2FTOP3.png?alt=media&token=381e5b92-29a2-428c-8bf3-78594dfc124f&_gl=1*b6jl0c*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NjE5OTEyMC4zOS4xLjE2ODYxOTk5MzcuMC4wLjA."
                    alt=" random imgee"
                    class="w-full object-cover object-center rounded-lg shadow-md"
                  />
                  <div class="relative px-4 -mt-16  ">
                    <div class="bg-orange-400 p-6 rounded-lg shadow-lg">
                      <div class="flex items-baseline">
                        <span class="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                          RANK
                        </span>
                        <div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                          TOP Third
                        </div>
                      </div>
                      <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                        {data.pointusers[2]
                          ? data.pointusers[2].username
                          : "NO NAME"}
                      </h4>
                      <div class="mt-4">
                        <span class="text-teal-600 text-md font-semibold">
                          {data.pointusers[2] ? data.pointusers[2].point : 0}
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
