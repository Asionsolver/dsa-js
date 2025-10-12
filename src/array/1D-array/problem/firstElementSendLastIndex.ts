/**
Question 1: Send the first element of the array to the last index
Input: [10, 20, 30, 40]
Output: [20, 30, 40, 10]
*/
const inputArray = [10, 20, 30, 40];

// this solution mutate original array
// const firstElementSendLastIndex = (arr: number[]) => {
//   arr.push(arr[0]);
//   arr.shift();
//   return arr;
// };

// console.log(firstElementSendLastIndex(inputArray));

const first = inputArray[0];
const rest = inputArray.slice(1);
const resultArray = [...rest, first];

console.log(resultArray);
console.log(inputArray);
