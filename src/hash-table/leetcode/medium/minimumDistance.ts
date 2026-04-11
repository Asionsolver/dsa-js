// 3741. Minimum Distance Between Three Equal Elements II

/**
Example 1:

Input: nums = [1,2,1,1,3]

Output: 6

Explanation:

The minimum distance is achieved by the good tuple (0, 2, 3).

(0, 2, 3) is a good tuple because nums[0] == nums[2] == nums[3] == 1. Its distance is abs(0 - 2) + abs(2 - 3) + abs(3 - 0) = 2 + 1 + 3 = 6.

Example 2:

Input: nums = [1,1,2,3,2,1,2]

Output: 8

Explanation:

The minimum distance is achieved by the good tuple (2, 4, 6).

(2, 4, 6) is a good tuple because nums[2] == nums[4] == nums[6] == 2. Its distance is abs(2 - 4) + abs(4 - 6) + abs(6 - 2) = 2 + 2 + 4 = 8.

Example 3:

Input: nums = [1]

Output: -1

Explanation:

There are no good tuples. Therefore, the answer is -1.
*/

const nums = [1, 2, 1, 1, 3];

const minimumDistance = function (nums: number[]): number {
  const n = nums.length;
  // Arrays to store the last two seen indices for each number.
  // Constraints mention 1 <= nums[i] <= n, so size n + 1 is safe.
  const last1 = new Int32Array(n + 1).fill(-1);
  const last2 = new Int32Array(n + 1).fill(-1);

  let minDiff = Infinity;

  for (let i = 0; i < n; i++) {
    const val = nums[i];

    // If we have seen this value at least twice before, we form a valid triplet.
    if (last2[val] !== -1) {
      const diff = i - last2[val];
      if (diff < minDiff) {
        minDiff = diff;
      }
    }

    // Shift our recorded indices to account for the current occurrence
    last2[val] = last1[val];
    last1[val] = i;
  }

  // If minDiff remains Infinity, no good tuple was found
  return minDiff === Infinity ? -1 : 2 * minDiff;
};

console.log(minimumDistance(nums));
