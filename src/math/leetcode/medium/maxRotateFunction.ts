// 396. Rotate Function

/**
Example 1:

Input: nums = [4,3,2,6]
Output: 26
Explanation:
F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25
F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16
F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23
F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26
So the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.
Example 2:

Input: nums = [100]
Output: 0
*/

function maxRotateFunction(nums: number[]): number {
  const n = nums.length;
  let sum = 0;
  let currentF = 0;

  // Calculate the total sum of the array and F(0)
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    currentF += i * nums[i];
  }

  let maxF = currentF;

  // Use the derived formula to calculate F(k) based on F(k-1)
  // We iterate backwards from n - 1 down to 1 which mirrors the elements
  // rolling off the end of the array to the front in clockwise rotation.
  for (let i = n - 1; i >= 1; i--) {
    currentF = currentF + sum - n * nums[i];
    maxF = Math.max(maxF, currentF);
  }

  return maxF;
}

// Example usage:
console.log(maxRotateFunction([4, 3, 2, 6])); // Output: 26
console.log(maxRotateFunction([100])); // Output: 0
