/** 
Remove First and Last

Description:
Create a function removeFirstAndLast(arr) that removes the first and last items using splice() or slice().

Input: [10, 20, 30, 40, 50]
Output: [20, 30, 40]

*/

type removeFirstAndLastFN = (count: number[]) => number[];

// !Not Recommended: It mutates the original array
// const removeFirstAndLast: removeFirstAndLastFN = (arr) => {
//   const start = 1;
//   const end = arr.length - 2;
//   return arr.splice(start, end);
// };

// !Recommended: It's not mutates the original array
// const removeFirstAndLast: removeFirstAndLastFN = (arr) => {
//   return arr.slice(1, -1);
// };

// !Alternative: It's not mutates the original array
const removeFirstAndLast = (arr: number[]): number[] => {
  arr.pop(); // remove last
  arr.shift(); // remove first
  return arr;
};

const itemsArray = [10, 20, 30, 40, 50, 60, 70, 80, 90];

console.log(removeFirstAndLast(itemsArray));
