// 3255. Find the Power of K-Size Subarrays II

/**
Example 1:

Input: nums = [1,2,3,4,3,2,5], k = 3

Output: [3,4,-1,-1,-1]

Explanation:

There are 5 subarrays of nums of size 3:

[1, 2, 3] with the maximum element 3.
[2, 3, 4] with the maximum element 4.
[3, 4, 3] whose elements are not consecutive.
[4, 3, 2] whose elements are not sorted.
[3, 2, 5] whose elements are not consecutive.
Example 2:

Input: nums = [2,2,2,2,2], k = 4

Output: [-1,-1]

Example 3:

Input: nums = [3,2,3,2,3,2], k = 2

Output: [-1,3,-1,3,-1]


*/

const resultsArray = function (nums: number[], k: number): number[] {
  const n = nums.length;
  // Preallocate the results array for performance
  const results: number[] = new Array(n - k + 1);
  let len = 1;

  for (let i = 0; i < n; i++) {
    // Update the consecutive ascending sequence length
    if (i > 0) {
      if (nums[i] === nums[i - 1] + 1) {
        len++;
      } else {
        len = 1;
      }
    }

    // Once we have processed at least 'k' elements, evaluate the subarray
    if (i >= k - 1) {
      results[i - k + 1] = len >= k ? nums[i] : -1;
    }
  }

  return results;
};

// Example usage:
console.log(resultsArray([1, 2, 3, 4, 3, 2, 5], 3)); // Output: [3, 4, -1, -1, -1]
console.log(resultsArray([2, 2, 2, 2, 2], 4)); // Output: [-1, -1]
console.log(resultsArray([3, 2, 3, 2, 3, 2], 2)); // Output: [-1, 3, -1, 3, -1]
