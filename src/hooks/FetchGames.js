// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getAllData } from "../helper/helper";
// import * as Action from "../redux/game_reducer";

// export const useFetchGames = () => {
//   const dispatch = useDispatch();
//   const [data, setData] = useState({
//     isLoading: false,
//     dataAPI: [],
//     serverError: null,
//   });

//   console.log("aaaaaaaaaa");

//   useEffect(() => {
//     setData((prev) => ({ ...prev, isLoading: true }));
//     (async () => {
//       try {
//         const getData = await getAllData(
//           `${process.env.REACT_APP_SERVERHOST}/api/games`,
//           (data) => data
//         );
//         console.log("bbbbbbbb");
//         if (getData.length > 0) {
//           setData((prev) => ({ ...prev, isLoading: false }));
//           setData((prev) => ({ ...prev, data: getData }));
//           dispatch(Action.fetchGames({ games: getData }));
//         } else {
//           throw new Error("No Game Avalibale");
//         }
//       } catch (error) {
//         console.log("ccccccc");
//         setData((prev) => ({ ...prev, isLoading: false }));
//         setData((prev) => ({ ...prev, serverError: error }));
//       }
//     })();
//   }, [dispatch]);
//   return [data, setData];
// };
