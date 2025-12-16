// 1477. Find Two Non-overlapping Sub-arrays Each With Target Sum

/**
Example 1:

Input: arr = [3,2,2,4,3], target = 3
Output: 2
Explanation: Only two sub-arrays have sum = 3 ([3] and [3]). The sum of their lengths is 2.
Example 2:

Input: arr = [7,3,4,7], target = 7
Output: 2
Explanation: Although we have three non-overlapping sub-arrays of sum = 7 ([7], [3,4] and [7]), but we will choose the first and third sub-arrays as the sum of their lengths is 2.
Example 3:

Input: arr = [4,3,2,6,2,3,4], target = 6
Output: -1
Explanation: We have only one sub-array of sum = 6.
*/
const arrSumNumber = [3, 2, 2, 4, 3];
const targetSumValue = 3;

// const arrSumNumber = [7, 3, 4, 7];
// const targetSumValue = 7;
// const arrSumNumber = [4, 3, 2, 6, 2, 3, 4];
// const targetSumValue = 6;

// Brute Force Approach O(n2)
const minSumOfLengths = function (arr: number[], target: number) {
  const size = arr.length;
  let subArray: number[][] = [];

  // Step 1: Find all subarrays with sum = target
  for (let i = 0; i < size; i++) {
    let sum = 0;
    for (let j = i; j < size; j++) {
      sum += arr[j];
      if (sum === target) {
        subArray.push([i, j, j - i + 1]); // [start, end, length]
      }
    }
  }
  // Step 2: Check all pairs for non-overlapping
  let minSum = Infinity;
  for (let i = 0; i < subArray.length; i++) {
    for (let j = 0; j < subArray.length; j++) {
      let [s1, e1, l1] = subArray[i];
      let [s2, e2, l2] = subArray[j];
      if (e1 < s2 || e2 < s1) {
        // non-overlapping
        minSum = Math.min(minSum, l1 + l2);
      }
    }
  }
  return minSum === Infinity ? -1 : minSum;
};

console.log(minSumOfLengths(arrSumNumber, targetSumValue));
