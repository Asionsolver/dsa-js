// 3300. Minimum Element After Replacement With Digit Sum

/**
Example 1:

Input: nums = [10,12,13,14]

Output: 1

Explanation:

nums becomes [1, 3, 4, 5] after all replacements, with minimum element 1.

Example 2:

Input: nums = [1,2,3,4]

Output: 1

Explanation:

nums becomes [1, 2, 3, 4] after all replacements, with minimum element 1.

Example 3:

Input: nums = [999,19,199]

Output: 10

Explanation:

nums becomes [27, 10, 19] after all replacements, with minimum element 10.


*/

function minElement(nums: number[]): number {
  let minSum = Infinity;

  for (const num of nums) {
    let currentSum = 0;
    let temp = num;

    // Calculate the sum of digits
    while (temp > 0) {
      currentSum += temp % 10;
      temp = Math.floor(temp / 10);
    }

    // Update the minimum element found so far
    if (currentSum < minSum) {
      minSum = currentSum;
    }
  }

  return minSum;
}

// Test cases
console.log(minElement([10, 12, 13, 14])); // Output: 1
console.log(minElement([1, 2, 3, 4])); // Output: 1
console.log(minElement([999, 19, 199])); // Output: 10
