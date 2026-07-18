// 1979. Find Greatest Common Divisor of Array

/**
Example 1:

Input: nums = [2,5,6,9,10]
Output: 2
Explanation:
The smallest number in nums is 2.
The largest number in nums is 10.
The greatest common divisor of 2 and 10 is 2.
Example 2:

Input: nums = [7,5,6,8,3]
Output: 1
Explanation:
The smallest number in nums is 3.
The largest number in nums is 8.
The greatest common divisor of 3 and 8 is 1.
Example 3:

Input: nums = [3,3]
Output: 3
Explanation:
The smallest number in nums is 3.
The largest number in nums is 3.
The greatest common divisor of 3 and 3 is 3.
*/

function findGCD(nums: number[]): number {
  let minVal = nums[0];
  let maxVal = nums[0];

  // Find the minimum and maximum values in a single loop
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < minVal) {
      minVal = nums[i];
    }
    if (nums[i] > maxVal) {
      maxVal = nums[i];
    }
  }

  // Helper function to calculate GCD using the Euclidean algorithm
  const getGCD = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  return getGCD(minVal, maxVal);
}

// Example usage:
const nums1 = [2, 5, 6, 9, 10];
console.log(findGCD(nums1)); // Output: 2

const nums2 = [7, 5, 6, 8, 3];
console.log(findGCD(nums2)); // Output: 1

const nums3 = [3, 3];
console.log(findGCD(nums3)); // Output: 3
