// 1464. Maximum Product of Two Elements in an Array

/**
Example 1:

Input: nums = [3,4,5,2]
Output: 12 
Explanation: If you choose the indices i=1 and j=2 (indexed from 0), you will get the maximum value, that is, (nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) = 3*4 = 12. 
Example 2:

Input: nums = [1,5,4,5]
Output: 16
Explanation: Choosing the indices i=1 and j=3 (indexed from 0), you will get the maximum value of (5-1)*(5-1) = 16.
Example 3:

Input: nums = [3,7]
Output: 12
*/

function maxProduct(nums: number[]): number {
  let max1 = 0;
  let max2 = 0;

  for (const num of nums) {
    if (num > max1) {
      max2 = max1;
      max1 = num;
    } else if (num > max2) {
      max2 = num;
    }
  }

  return (max1 - 1) * (max2 - 1);
}

// Example usage:
console.log(maxProduct([3, 4, 5, 2])); // Output: 12
console.log(maxProduct([1, 5, 4, 5])); // Output: 16
console.log(maxProduct([3, 7])); // Output: 12
