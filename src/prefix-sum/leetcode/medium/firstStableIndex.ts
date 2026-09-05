// 3904. Smallest Stable Index II

/**
You are given an integer array nums of length n and an integer k.

For each index i, define its instability score as max(nums[0..i]) - min(nums[i..n - 1]).

In other words:

max(nums[0..i]) is the largest value among the elements from index 0 to index i.
min(nums[i..n - 1]) is the smallest value among the elements from index i to index n - 1.
An index i is called stable if its instability score is less than or equal to k.

Return the smallest stable index. If no such index exists, return -1.


*/

/**
Example 1:

Input: nums = [5,0,1,4], k = 3

Output: 3

Explanation:

At index 0: The maximum in [5] is 5, and the minimum in [5, 0, 1, 4] is 0, so the instability score is 5 - 0 = 5.
At index 1: The maximum in [5, 0] is 5, and the minimum in [0, 1, 4] is 0, so the instability score is 5 - 0 = 5.
At index 2: The maximum in [5, 0, 1] is 5, and the minimum in [1, 4] is 1, so the instability score is 5 - 1 = 4.
At index 3: The maximum in [5, 0, 1, 4] is 5, and the minimum in [4] is 4, so the instability score is 5 - 4 = 1.
This is the first index with an instability score less than or equal to k = 3. Thus, the answer is 3.
Example 2:

Input: nums = [3,2,1], k = 1

Output: -1

Explanation:

At index 0, the instability score is 3 - 1 = 2.
At index 1, the instability score is 3 - 1 = 2.
At index 2, the instability score is 3 - 1 = 2.
None of these values is less than or equal to k = 1, so the answer is -1.
Example 3:

Input: nums = [0], k = 0

Output: 0

Explanation:

At index 0, the instability score is 0 - 0 = 0, which is less than or equal to k = 0. Therefore, the answer is 0.


*/

/**
Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 109
0 <= k <= 109
*/

// Throw TLE
// function firstStableIndex(nums: number[], k: number): number {
//     const n = nums.length;

//     // Check each index from left to right to find the smallest stable index.
//     for (let i = 0; i < n; i++) {
//         let prefixMax = nums[0];
//         // Find the maximum value in nums[0..i].
//         for (let j = 0; j <= i; j++) {
//             prefixMax = Math.max(prefixMax, nums[j]);
//         }

//         let suffixMin = nums[i];
//         // Find the minimum value in nums[i..n-1].
//         for (let j = i; j < n; j++) {
//             suffixMin = Math.min(suffixMin, nums[j]);
//         }

//         // Check if the instability score satisfies the condition.
//         if (prefixMax - suffixMin <= k) {
//             return i;
//         }
//     }

//     // Return -1 if no stable index is found.
//     return -1;
// }

function firstStableIndex(nums: number[], k: number): number {
  const n = nums.length;

  // suffixMin[i] will store the minimum value in nums[i..n-1].
  const suffixMin = new Array<number>(n);

  // The last element's suffix minimum is the element itself.
  suffixMin[n - 1] = nums[n - 1];

  // Precompute suffix minimums from right to left in O(n) time.
  for (let i = n - 2; i >= 0; i--) {
    suffixMin[i] = Math.min(nums[i], suffixMin[i + 1]);
  }

  let prefixMax = -Infinity;

  // Iterate from left to right to find the smallest stable index.
  for (let i = 0; i < n; i++) {
    // Update the running prefix maximum.
    prefixMax = Math.max(prefixMax, nums[i]);

    // Calculate the instability score at index i.
    const instabilityScore = prefixMax - suffixMin[i];

    // Return the first index that satisfies the stability condition.
    if (instabilityScore <= k) {
      return i;
    }
  }

  // Return -1 if no index is stable.
  return -1;
}

// Example usage:
console.log(firstStableIndex([5, 0, 1, 4], 3)); // Output: 3
console.log(firstStableIndex([3, 2, 1], 1)); // Output: -1
console.log(firstStableIndex([0], 0)); // Output: 0
