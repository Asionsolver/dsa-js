// 3550. Smallest Index With Digit Sum Equal to Index

/**
You are given an integer array nums.

Return the smallest index i such that the sum of the digits of nums[i] is equal to i.

If no such index exists, return -1.


*/

/**
Example 1:

Input: nums = [1,3,2]

Output: 2

Explanation:

For nums[2] = 2, the sum of digits is 2, which is equal to index i = 2. Thus, the output is 2.
Example 2:

Input: nums = [1,10,11]

Output: 1

Explanation:

For nums[1] = 10, the sum of digits is 1 + 0 = 1, which is equal to index i = 1.
For nums[2] = 11, the sum of digits is 1 + 1 = 2, which is equal to index i = 2.
Since index 1 is the smallest, the output is 1.
Example 3:

Input: nums = [1,2,3]

Output: -1

Explanation:

Since no index satisfies the condition, the output is -1.
 
*/

/**
Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 1000
*/

// Brute Force Approach
function smallestIndex(nums: number[]): number {
  // Iterate through every index from left to right.
  for (let i = 0; i < nums.length; i++) {
    // Convert the number to a string to easily access each digit.
    const strNum = nums[i].toString();

    let digitSum = 0;
    // Sum all digits of the number.
    for (let j = 0; j < strNum.length; j++) {
      digitSum += Number(strNum[j]);
    }

    // Check if the sum of digits is equal to the current index.
    if (digitSum === i) {
      return i;
    }
  }

  // Return -1 if no such index satisfies the condition.
  return -1;
}

// Example usage:
console.log(smallestIndex([1, 3, 2])); // Output: 2
console.log(smallestIndex([1, 10, 11])); // Output: 1
console.log(smallestIndex([1, 2, 3])); // Output: -1
