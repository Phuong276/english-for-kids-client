import helper from "../helper/helper";

export const upsetPoint = async (status, userId, questionId) => {
  const UPSET_POINT_URL = "/api/points";
  try {
    await helper.post(
      UPSET_POINT_URL,
      JSON.stringify({
        status,
        userId,
        questionId,
      }),
      {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleHeart = (incorrectGuesses) => {
  let hearts = "";
  for (let i = 0; i < incorrectGuesses; i++) hearts += "❤";
  return hearts;
};