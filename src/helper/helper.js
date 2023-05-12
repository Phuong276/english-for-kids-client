import axios from "axios";

export async function getAllData(url, callback) {
  const games = await (await axios.get(url))?.data;
  return callback ? callback(games) : games;
}
