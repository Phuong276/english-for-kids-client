import axios from "axios";
import { Navigate } from "react-router-dom";

export async function getAllData(url, callback) {
  const games = await (await axios.get(url))?.data;
  return callback ? callback(games) : games;
}

export default axios.create({
  baseURL: process.env.REACT_APP_SERVERHOST,
});

export function CheckLogin({ children }) {
  const token = window.localStorage.getItem("token");
  return token ? children : <Navigate to={"/login"} replace={true} />;
}
