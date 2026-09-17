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

// Brute Force Approach O(n2)
// const minSumOfLengths = function (arr: number[], target: number) {
//   const size = arr.length;
//   let subArray: number[][] = [];

//   // Step 1: Find all subarrays with sum = target
//   for (let i = 0; i < size; i++) {
//     let sum = 0;
//     for (let j = i; j < size; j++) {
//       sum += arr[j];
//       if (sum === target) {
//         subArray.push([i, j, j - i + 1]); // [start, end, length]
//       }
//     }
//   }
//   // Step 2: Check all pairs for non-overlapping
//   let minSum = Infinity;
//   for (let i = 0; i < subArray.length; i++) {
//     for (let j = 0; j < subArray.length; j++) {
//       let [s1, e1, l1] = subArray[i];
//       let [s2, e2, l2] = subArray[j];
//       if (e1 < s2 || e2 < s1) {
//         // non-overlapping
//         minSum = Math.min(minSum, l1 + l2);
//       }
//     }
//   }
//   return minSum === Infinity ? -1 : minSum;
// };

// Optimized Approach O(n)
function minSumOfLengths(arr: number[], target: number): number {
  const n = arr.length;

  // minLens[i] stores the minimum length of a valid subarray found in arr[0...i].
  const minLens = new Array<number>(n).fill(Infinity);

  let left = 0;
  let currentSum = 0;
  let minTotalLen = Infinity;

  for (let right = 0; right < n; right++) {
    // Expand the window by adding the current element.
    currentSum += arr[right];

    // Shrink the window from the left while the sum exceeds the target.
    while (currentSum > target && left <= right) {
      currentSum -= arr[left];
      left++;
    }

    // Check if we found a valid subarray with the target sum.
    if (currentSum === target) {
      const currLen = right - left + 1;

      // If a valid non-overlapping subarray exists to the left, update the global minimum.
      if (left > 0 && minLens[left - 1] !== Infinity) {
        minTotalLen = Math.min(minTotalLen, currLen + minLens[left - 1]);
      }

      // Update minLens[right] considering the current valid subarray.
      const prevBest = right > 0 ? minLens[right - 1] : Infinity;
      minLens[right] = Math.min(prevBest, currLen);
    } else {
      // Carry forward the previous best length.
      minLens[right] = right > 0 ? minLens[right - 1] : Infinity;
    }
  }

  // Return -1 if two non-overlapping subarrays were never found.
  return minTotalLen === Infinity ? -1 : minTotalLen;
}

// Example usage:
const arr1 = [3, 2, 2, 4, 3];
const target1 = 3;
console.log(minSumOfLengths(arr1, target1)); // Output: 2

const arr2 = [7, 3, 4, 7];
const target2 = 7;
console.log(minSumOfLengths(arr2, target2)); // Output: 2

const arr3 = [4, 3, 2, 6, 2, 3, 4];
const target3 = 6;
console.log(minSumOfLengths(arr3, target3)); // Output: -1
