import queryString from "query-string";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default axios.create({
  baseURL: process.env.REACT_APP_SERVERHOST,
});

export const stringifyParams = (data) => {
  const { params, option } = data;

  return queryString.stringify(params, {
    arrayFormat: "comma",
    encode: false,
    skipNull: true,
    skipEmptyString: true,
    ...option,
  });
};

export const getAllData = async (url, params) => {
  const { data } = await axios.get(`${url}?${queryString.stringify(params)}`);
  return data;
};

export function CheckLogin({ children }) {
  const token = window.localStorage.getItem("token");
  return token ? children : <Navigate to={"/login"} replace={true} />;
}
