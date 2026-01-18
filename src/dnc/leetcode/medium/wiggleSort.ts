// 324. Wiggle Sort II

/**
Example 1:

Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
Explanation: [1,4,1,5,1,6] is also accepted.
Example 2:

Input: nums = [1,3,2,2,3,1]
Output: [2,3,1,3,1,2]

*/

const nums = [1, 5, 1, 1, 6, 4];

/**
 Do not return anything, modify nums in-place instead.
 */
const wiggleSort = function (nums: number[]): void {
  // 1. Create a copy and sort it
  const sorted = nums.slice().sort((a, b) => a - b);

  const n = nums.length;
  // Calculate the midpoint.
  // For odd length (e.g., 5), we need 3 small elements (indices 0, 2, 4),
  // so mid should be 3. (5+1)/2 = 3.
  const mid = Math.floor((n + 1) / 2);

  // Pointers for the end of the small half and the end of the large half
  let smallPtr = mid - 1;
  let largePtr = n - 1;

  // 2. Fill the original array
  // Even indices get values from the small half
  // Odd indices get values from the large half
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      nums[i] = sorted[smallPtr];
      smallPtr--;
    } else {
      nums[i] = sorted[largePtr];
      largePtr--;
    }
  }
};

console.log(wiggleSort(nums));
