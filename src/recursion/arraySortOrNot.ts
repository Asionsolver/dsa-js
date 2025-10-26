// const numberArray = [1, 2, 9, 3, 4, 5, 6];
// const numberArray = [1, 2, 3, 4, 5, 6];
const numberArray = [1, 1, 1, 1];
const startIndex = 0;

function arraySortOrNot(numberArray: number[], startIndex: number) {
  //base case
  if (startIndex === numberArray.length - 1) {
    return true;
  }

  // first case solve
  if (numberArray[startIndex] >= numberArray[startIndex + 1]) {
    return false;
  }

  return arraySortOrNot(numberArray, startIndex + 1);
}
const results = arraySortOrNot(numberArray, startIndex);

console.log("RESULT: ", results);
if (results) {
  console.log("This array is sorted");
} else {
  console.log("This array is not sorted");
}
