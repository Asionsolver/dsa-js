// 3524. Find X Value of Array I

/**
You are given an array of positive integers nums, and a positive integer k.

You are allowed to perform an operation once on nums, where in each operation you can remove any non-overlapping prefix and suffix from nums such that nums remains non-empty.

You need to find the x-value of nums, which is the number of ways to perform this operation so that the product of the remaining elements leaves a remainder of x when divided by k.

Return an array result of size k where result[x] is the x-value of nums for 0 <= x <= k - 1.

A prefix of an array is a subarray that starts from the beginning of the array and extends to any point within it.

A suffix of an array is a subarray that starts at any point within the array and extends to the end of the array.

Note that the prefix and suffix to be chosen for the operation can be empty.

 
*/

/**
Example 1:

Input: nums = [1,2,3,4,5], k = 3

Output: [9,2,4]

Explanation:

For x = 0, the possible operations include all possible ways to remove non-overlapping prefix/suffix that do not remove nums[2] == 3.
For x = 1, the possible operations are:
Remove the empty prefix and the suffix [2, 3, 4, 5]. nums becomes [1].
Remove the prefix [1, 2, 3] and the suffix [5]. nums becomes [4].
For x = 2, the possible operations are:
Remove the empty prefix and the suffix [3, 4, 5]. nums becomes [1, 2].
Remove the prefix [1] and the suffix [3, 4, 5]. nums becomes [2].
Remove the prefix [1, 2, 3] and the empty suffix. nums becomes [4, 5].
Remove the prefix [1, 2, 3, 4] and the empty suffix. nums becomes [5].
Example 2:

Input: nums = [1,2,4,8,16,32], k = 4

Output: [18,1,2,0]

Explanation:

For x = 0, the only operations that do not result in x = 0 are:
Remove the empty prefix and the suffix [4, 8, 16, 32]. nums becomes [1, 2].
Remove the empty prefix and the suffix [2, 4, 8, 16, 32]. nums becomes [1].
Remove the prefix [1] and the suffix [4, 8, 16, 32]. nums becomes [2].
For x = 1, the only possible operation is:
Remove the empty prefix and the suffix [2, 4, 8, 16, 32]. nums becomes [1].
For x = 2, the possible operations are:
Remove the empty prefix and the suffix [4, 8, 16, 32]. nums becomes [1, 2].
Remove the prefix [1] and the suffix [4, 8, 16, 32]. nums becomes [2].
For x = 3, there is no possible way to perform the operation.
Example 3:

Input: nums = [1,1,2,1,1], k = 2

Output: [9,6]

 


*/

/**
Constraints:

1 <= nums[i] <= 109
1 <= nums.length <= 105
1 <= k <= 5
*/

// Brute Force Approach: TLE
// function resultArray(nums: number[], k: number): number[] {
//   const n = nums.length;
//   // Initialize result array of size k with 0.
//   const result: number[] = new Array(k).fill(0);

//   // Iterate through all possible starting points.
//   for (let i = 0; i < n; i++) {
//     let currentProduct = 1;

//     // Expand the subarray to the right.
//     for (let j = i; j < n; j++) {
//       currentProduct = (currentProduct * (nums[j] % k)) % k;

//       // Increment the count for the resulting remainder.
//       result[currentProduct]++;
//     }
//   }

//   return result;
// }

// Optimized Approach: Using Dynamic Programming

function resultArray(nums: number[], k: number): number[] {
  const n = nums.length;
  // Final answer array where result[x] stores the count of valid subarrays.
  const result: number[] = new Array(k).fill(0);

  // dp[r] stores the number of subarrays ending at the previous index with remainder r.
  let dp: number[] = new Array(k).fill(0);

  for (let i = 0; i < n; i++) {
    // Compute the current element's value modulo k.
    const v = nums[i] % k;

    // Temporary array to store remainder counts for subarrays ending at index i.
    const nextDp: number[] = new Array(k).fill(0);

    // A new subarray starting and ending at index i.
    nextDp[v] += 1;

    // Extend all previous subarrays ending at i - 1 with the current element.
    for (let r = 0; r < k; r++) {
      if (dp[r] > 0) {
        const newRemainder = (r * v) % k;
        nextDp[newRemainder] += dp[r];
      }
    }

    // Add the counts of subarrays ending at index i to the global result.
    for (let r = 0; r < k; r++) {
      result[r] += nextDp[r];
    }

    // Update dp state for the next iteration.
    dp = nextDp;
  }

  return result;
}

// Example usage:
const nums1 = [1, 2, 3, 4, 5];
const k1 = 3;
console.log(resultArray(nums1, k1)); // Output: [9, 2, 4]

const nums2 = [1, 2, 4, 8, 16, 32];
const k2 = 4;
console.log(resultArray(nums2, k2)); // Output: [18, 1, 2, 0]

const nums3 = [1, 1, 2, 1, 1];
const k3 = 2;
console.log(resultArray(nums3, k3)); // Output: [9, 6]
