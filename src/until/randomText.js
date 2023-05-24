export function unique(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
export function generateString(length, text) {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const arrayText = unique(text.split(""));
  let result = "";
  const charactersLength = characters.length;
  while (result.length < length) {
    const randomText = characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
    if (!arrayText.includes(randomText)) {
      result += randomText;
      arrayText.push(randomText);
    }
  }
  return (result + unique(text.split("")).join("")).split("").sort().join("");
}

export function swapString(text) {
  const arrayText = unique(text.split(""));
  return arrayText.sort().join("");
}
