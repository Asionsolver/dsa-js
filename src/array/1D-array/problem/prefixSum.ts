import { it } from "node:test";
// find prefix sum array

const arr = [5, 2, 7, -3, 8];

// output=[5,7,14,11,19]

// brute force way - O(n2)
// const prefixSum = function (arr: number[]) {
//   let result = [];
//   for (let i = 0; i < arr.length; i++) {
//     let sum = 0;
//     for (let j = 0; j <= i; j++) {
//       sum += arr[j];
//     }

//     result.push(sum);
//   }

//   return result;
// };

// optimal way - O(n)
// arr[i] = arr[i-1] + arr[i];
const prefixSum = function (arr: number[]) {
  let result: number[] = [];
  result[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result[i] = result[i - 1] + arr[i];
  }
  return result;
};
console.log(prefixSum(arr));
