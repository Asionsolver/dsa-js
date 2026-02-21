// 2104. Sum of Subarray Ranges

/**
Example 1:

Input: nums = [1,2,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0 
[2], range = 2 - 2 = 0
[3], range = 3 - 3 = 0
[1,2], range = 2 - 1 = 1
[2,3], range = 3 - 2 = 1
[1,2,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.
Example 2:

Input: nums = [1,3,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0
[3], range = 3 - 3 = 0
[3], range = 3 - 3 = 0
[1,3], range = 3 - 1 = 2
[3,3], range = 3 - 3 = 0
[1,3,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 2 + 0 + 2 = 4.
Example 3:

Input: nums = [4,-2,-3,4,1]
Output: 59
Explanation: The sum of all subarray ranges of nums is 59.

*/

const nums = [1, 3, 3];

const subArrayRanges = function (nums: number[]): number {
  const n = nums.length;
  // Arrays to store boundaries
  // Initialize "previous" to -1 (imaginary index before 0)
  // Initialize "next" to n (imaginary index after last element)
  const prevGreater = new Array(n).fill(-1);
  const nextGreater = new Array(n).fill(n);
  const prevSmaller = new Array(n).fill(-1);
  const nextSmaller = new Array(n).fill(n);

  const stack: number[] = [];

  // 1. Find Previous Greater Element (Strictly Greater)
  // Iterate left to right
  for (let i = 0; i < n; i++) {
    // While stack top is smaller or equal, it can't be the Previous Greater.
    // We pop to find the nearest element to the left that is strictly greater.
    while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      prevGreater[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  // Clear stack for next pass
  stack.length = 0;

  // 2. Find Next Greater Element (Greater or Equal)
  // Iterate right to left
  for (let i = n - 1; i >= 0; i--) {
    // While stack top is strictly smaller, it can't be the Next Greater.
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      nextGreater[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  stack.length = 0;

  // 3. Find Previous Smaller Element (Strictly Smaller)
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      prevSmaller[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  stack.length = 0;

  // 4. Find Next Smaller Element (Smaller or Equal)
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      nextSmaller[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  let totalSum = 0;

  // Calculate total contribution
  for (let i = 0; i < n; i++) {
    // Count of subarrays where nums[i] is the maximum
    const maxCount = (i - prevGreater[i]) * (nextGreater[i] - i);

    // Count of subarrays where nums[i] is the minimum
    const minCount = (i - prevSmaller[i]) * (nextSmaller[i] - i);

    // Add (Max Contribution) - (Min Contribution)
    totalSum += nums[i] * (maxCount - minCount);
  }

  return totalSum;
};

console.log(subArrayRanges(nums));
