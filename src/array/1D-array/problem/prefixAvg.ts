// Average of Prefix(gfg)

/**
Given an array arr, find the average or mean of the prefix array at every index.

Examples:

Input: arr[] = [10, 20, 30, 40, 50]
Output: [10, 15, 20, 25, 30] 
Explanation: 10 / 1 = 10, (10 + 20) / 2 = 15, (10 + 20 + 30) / 3 = 20 and so on.
Input: arr[] = [12, 2]
Output: [12, 7] 
Constraints:
1 ≤ arr.size ≤ 105
1 ≤ arr[i] ≤ 106
*/

const arr = [1, 2, 5, 7, 9];

const prefixAvg = function (arr: number[]) {
  const size = arr.length;

  for (let i = 1; i < size; i++) {
    arr[i] += arr[i - 1];
  }
  for (let i = 0; i < size; i++) {
    arr[i] = Math.floor(arr[i] / (i + 1));
  }
  return arr;
};

console.log(prefixAvg(arr));
