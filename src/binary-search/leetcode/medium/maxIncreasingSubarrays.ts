// 3350. Adjacent Increasing Subarrays Detection II

/**
Example 1:

Input: nums = [2,5,7,8,9,2,3,4,3,1]

Output: 3

Explanation:

The subarray starting at index 2 is [7, 8, 9], which is strictly increasing.
The subarray starting at index 5 is [2, 3, 4], which is also strictly increasing.
These two subarrays are adjacent, and 3 is the maximum possible value of k for which two such adjacent strictly increasing subarrays exist.
Example 2:

Input: nums = [1,2,3,4,4,4,4,5,6,7]

Output: 2

Explanation:

The subarray starting at index 0 is [1, 2], which is strictly increasing.
The subarray starting at index 2 is [3, 4], which is also strictly increasing.
These two subarrays are adjacent, and 2 is the maximum possible value of k for which two such adjacent strictly increasing subarrays exist.
*/

const nums = [2, 5, 7, 8, 9, 2, 3, 4, 3, 1];

const maxIncreasingSubarrays = function (nums: number[]): number {
  const n = nums.length;

  // suffix[i] stores the length of the strictly increasing subarray starting at index i.
  // We use Int32Array for potentially better performance with large arrays,
  // though standard number[] works too.
  const suffix = new Int32Array(n);

  // Initialize the last element
  suffix[n - 1] = 1;

  // Build suffix array from right to left
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      suffix[i] = suffix[i + 1] + 1;
    } else {
      suffix[i] = 1;
    }
  }

  let maxK = 0;
  let currentIncreasingLength = 0;

  // Iterate through the array considering 'i' as the ending index of the first subarray.
  // The second subarray starts immediately after, at 'i + 1'.
  // We stop at n - 2 because the second subarray must start at a valid index.
  for (let i = 0; i < n - 1; i++) {
    // Update the length of the strictly increasing subarray ending at index i
    if (i > 0 && nums[i] > nums[i - 1]) {
      currentIncreasingLength++;
    } else {
      currentIncreasingLength = 1;
    }

    // Calculate the max k possible at this split point.
    // The first subarray (left) has max length 'currentIncreasingLength'.
    // The second subarray (right) has max length 'suffix[i + 1]'.
    // The bottleneck is the smaller of the two.
    const k = Math.min(currentIncreasingLength, suffix[i + 1]);

    if (k > maxK) {
      maxK = k;
    }
  }

  return maxK;
};

console.log(maxIncreasingSubarrays(nums));
