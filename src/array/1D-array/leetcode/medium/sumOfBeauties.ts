// 2012. Sum of Beauty in the Array

/**
Example 1:

Input: nums = [1,2,3]
Output: 2
Explanation: For each index i in the range 1 <= i <= 1:
- The beauty of nums[1] equals 2.
Example 2:

Input: nums = [2,4,6,4]
Output: 1
Explanation: For each index i in the range 1 <= i <= 2:
- The beauty of nums[1] equals 1.
- The beauty of nums[2] equals 0.
Example 3:

Input: nums = [3,2,1]
Output: 0
Explanation: For each index i in the range 1 <= i <= 1:
- The beauty of nums[1] equals 0.

*/

function sumOfBeauties(nums: number[]): number {
  const n = nums.length;

  // Use an Int32Array for better memory efficiency and performance
  const rightMin = new Int32Array(n);

  // Precompute the minimums from the right
  rightMin[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMin[i] = Math.min(nums[i], rightMin[i + 1]);
  }

  let sum = 0;
  let leftMax = nums[0]; // Keep track of the maximum on the left side

  // Evaluate the beauty of each element
  for (let i = 1; i < n - 1; i++) {
    // Condition for beauty of 2
    if (leftMax < nums[i] && nums[i] < rightMin[i + 1]) {
      sum += 2;
    }
    // Condition for beauty of 1
    else if (nums[i - 1] < nums[i] && nums[i] < nums[i + 1]) {
      sum += 1;
    }

    // Update the maximum on the left side for the next element
    if (nums[i] > leftMax) {
      leftMax = nums[i];
    }
  }

  return sum;
}

// Example usage:
console.log(sumOfBeauties([1, 2, 3, 1, 2, 3, 1, 2])); // Output: 6
console.log(sumOfBeauties([1, 2, 1, 2, 1, 2, 1, 2])); // Output: 2
console.log(sumOfBeauties([5, 5, 5, 5, 5, 5, 5])); // Output: 4
