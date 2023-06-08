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
                    src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Frank2.png?alt=media&token=3fcfbefc-501e-42f8-8295-027947130ec2&_gl=1*1uejsct*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NjIxMzgyMi40MC4xLjE2ODYyMTQ1MjkuMC4wLjA."
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
                        <span class="text-teal-600 text-md font-semibold text-3xl">
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
                    src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Frank1.png?alt=media&token=a022fbf1-b26a-4d8d-a008-19188d694b78&_gl=1*e2jcpi*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NjIxMzgyMi40MC4xLjE2ODYyMTQ0NjcuMC4wLjA."
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
                        <span class="text-teal-600 text-md font-semibold text-3xl">
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
                    src="https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Frank3.png?alt=media&token=785e5cae-ce67-4c44-b6f0-c5b44b90801f&_gl=1*1dqp70k*_ga*ODgzMDU0MjMxLjE2ODQ1OTA5NjY.*_ga_CW55HF8NVT*MTY4NjIxMzgyMi40MC4xLjE2ODYyMTQ1NTEuMC4wLjA."
                    alt=" random imgee"
                    class="w-full object-cover object-center rounded-lg shadow-md"
                  />
                  <div class="relative px-4 -mt-16  ">
                    <div class="bg-orange-300 p-6 rounded-lg shadow-lg">
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
                        <span class="text-teal-600 text-md font-semibold text-3xl">
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
