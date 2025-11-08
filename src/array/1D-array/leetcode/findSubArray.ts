// 2395. Find Subarrays With Equal Sum

/**
Example 1:

Input: nums = [4,2,4]
Output: true
Explanation: The subarrays with elements [4,2] and [2,4] have the same sum of 6.
Example 2:

Input: nums = [1,2,3,4,5]
Output: false
Explanation: No two subarrays of size 2 have the same sum.
Example 3:

Input: nums = [0,0,0]
Output: true
Explanation: The subarrays [nums[0],nums[1]] and [nums[1],nums[2]] have the same sum of 0. 
Note that even though the subarrays have the same content, the two subarrays are considered different because they are in different positions in the original array.
*/

// const subArrayNum = [4, 2, 4];
// const subArrayNum = [1, 2, 3, 4, 5];
// const subArrayNum = [0, 0, 0];
const subArrayNum = [0, 0];
// const subArrayNum = [3, 4, -2, 5, 8, 20, -10, 8];

// Basic version - Brute force(O(n²))
// const findSubArrays = function (nums: number[]) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     let sum1 = nums[i] + nums[i + 1]; // current pair sum

//     for (let j = i + 1; j < nums.length - 1; j++) {
//       let sum2 = nums[j] + nums[j + 1]; // next pair sum

//       if (sum1 === sum2) {
//         return true;
//       }
//     }
//   }
//   return false;
// };

// Optimize version - (O(n))
const findSubArrays = function (nums: number[]) {
  const seen = new Set();

  for (let i = 0; i < nums.length - 1; i++) {
    const sum = nums[i] + nums[i + 1];
    if (seen.has(sum)) return true;
    seen.add(sum);
  }

  return false;
};

console.log(findSubArrays(subArrayNum));
