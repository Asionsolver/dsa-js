// 525. Contiguous Array

/**
Example 1:

Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
Example 2:

Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
Example 3:

Input: nums = [0,1,1,1,1,1,0,0,0]
Output: 6
Explanation: [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.
*/

const nums = [0, 1, 1, 1, 1, 1, 0, 0, 0];

// Brute Force Code
// const findMaxLength = function (nums: number[]) {
//   let maxLen = 0;

//   for (let i = 0; i < nums.length; i++) {
//     let zero = 0;
//     let one = 0;

//     for (let j = i; j < nums.length; j++) {
//       if (nums[j] === 0) zero++;
//       else one++;

//       if (zero === one) {
//         maxLen = Math.max(maxLen, j - i + 1);
//       }
//     }
//   }

//   return maxLen;
// };

// Optimized Solution (O(n))
const findMaxLength = function (nums: number[]) {
  const map = new Map();
  map.set(0, -1); // prefix sum 0 first seen at index -1

  let prefix = 0;
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i] === 0 ? -1 : 1;

    if (map.has(prefix)) {
      // same prefix found -> subarray with sum zero
      maxLen = Math.max(maxLen, i - map.get(prefix));
    } else {
      map.set(prefix, i); // store first occurrence
    }
  }

  return maxLen;
};

console.log(findMaxLength(nums));
