import NavBarAdmin from "./NavBar";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
} from "recharts";
import { getAllData } from "../../helper/helper";
import { useEffect, useState } from "react";

export default function HomeAdmin() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllGame = async () => {
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
    fecthAllGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return;
  return (
    <div>
      <NavBarAdmin></NavBarAdmin>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div>
            <p>TOP 10 </p>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                width={900}
                height={400}
                data={data.pointusers}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="username" />
                <YAxis dataKey="point" />
                <Tooltip
                  cursor={{ fill: "white" }}
                  contentStyle={{ background: "white", outline: "none" }}
                />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar
                  cursor={{ fill: "white" }}
                  dataKey="point"
                  fill="grey"
                  yAxisId={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
