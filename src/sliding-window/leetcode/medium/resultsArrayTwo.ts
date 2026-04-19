// 3254. Find the Power of K-Size Subarrays I

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

const resultsArray = (nums: number[], k: number): number[] => {
  const n = nums.length;
  const results: number[] = [];
  let streak = 1;

  for (let i = 0; i < n; i++) {
    // If the current element consecutively continues from the previous, increment the streak
    if (i > 0 && nums[i] === nums[i - 1] + 1) {
      streak++;
    } else {
      // Reset the streak if elements are no longer consecutive/ascending
      streak = 1;
    }

    // Once we have processed at least 'k' elements
    if (i >= k - 1) {
      if (streak >= k) {
        // If the streak represents a strictly ascending sequence of at least size k, push the max element
        results.push(nums[i]);
      } else {
        // Otherwise, the subarray does not satisfy the condition
        results.push(-1);
      }
    }
  }

  return results;
};

// Example usage:
console.log(resultsArray([1, 2, 3, 4, 3, 2, 5], 3)); // Output: [3, 4, -1, -1, -1]
console.log(resultsArray([2, 2, 2, 2, 2], 4)); // Output: [-1, -1]
console.log(resultsArray([3, 2, 3, 2, 3, 2], 2)); // Output: [-1, 3, -1, 3, -1]
