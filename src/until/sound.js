export const playAudio = (url) => {
  new Audio(url).play();
};

export const correctSound =
  "https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Fcorrect.mp3?alt=media&token=afcf4981-cc97-4fe5-a562-d1b14e762022";

export const incorrectSound =
  "https://firebasestorage.googleapis.com/v0/b/english-for-kids-daa46.appspot.com/o/files%2Fincorrect.mp3?alt=media&token=fe0da9a8-a828-43d6-944d-3be1a053ae74";
