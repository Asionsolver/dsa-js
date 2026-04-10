// 3740. Minimum Distance Between Three Equal Elements I

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
  // Group all indices by the number they contain
  const indicesMap = new Map<number, number[]>();
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    if (!indicesMap.has(val)) {
      indicesMap.set(val, []);
    }
    indicesMap.get(val)!.push(i);
  }

  let minDistance = Infinity;

  // Iterate through our grouped indices to find the minimum distance
  for (const indices of indicesMap.values()) {
    // A valid tuple requires at least 3 equal elements
    if (indices.length >= 3) {
      // Check every consecutive triplet of indices for this number
      for (let i = 0; i <= indices.length - 3; i++) {
        // For a sorted triplet a < b < c, distance is 2 * (c - a)
        const dist = 2 * (indices[i + 2] - indices[i]);
        if (dist < minDistance) {
          minDistance = dist;
        }
      }
    }
  }

  return minDistance === Infinity ? -1 : minDistance;
};

console.log(minimumDistance(nums));
