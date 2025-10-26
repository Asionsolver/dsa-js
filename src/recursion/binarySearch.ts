const searchArray = [4, 8, 9, 10, 15, 16, 17, 18, 21, 22, 23];
const target = 8;
const startIdx = 0;
const endIdx = searchArray.length - 1;

function binarySearch(
  searchArray: number[],
  target: number,
  startIdx: number,
  endIdx: number
): number {
  // mid calculate
  let mid = Math.floor((startIdx + endIdx) / 2);
  //base case
  // case 1: mid equal target
  if (searchArray[mid] === target) {
    return mid;
  }

  // case 2: key not found
  if (startIdx > endIdx) {
    return -1;
  }

  //recursive call
  // mid < target = right search
  if (searchArray[mid] < target) {
    return binarySearch(searchArray, target, mid + 1, endIdx);
  } else {
    return binarySearch(searchArray, target, startIdx, mid - 1);
  }
}

const resultIdx = binarySearch(searchArray, target, startIdx, endIdx);
console.log("Target Index: ", resultIdx + 1);
