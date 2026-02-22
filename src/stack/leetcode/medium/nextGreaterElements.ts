// 503. Next Greater Element II

/**
Example 1:

Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2; 
The number 2 can't find next greater number. 
The second 1's next greater number needs to search circularly, which is also 2.
Example 2:

Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]
*/

const nums = [1, 2, 1];
const nextGreaterElements = function (nums: number[]): number[] {
  const n = nums.length;
  // Initialize result array with -1.
  // If we never find a greater element, the value remains -1.
  const res: number[] = new Array(n).fill(-1);

  // Stack stores the *indices* of elements for which we are looking for the next greater number.
  const stack: number[] = [];

  // Iterate effectively twice over the array (0 to 2n - 1)
  for (let i = 0; i < n * 2; i++) {
    // Get the real index using modulo to simulate circular array
    const circularIdx = i % n;
    const currentNum = nums[circularIdx];

    // While we have elements in the stack and the current number is
    // greater than the number at the top of the stack:
    while (stack.length > 0 && nums[stack[stack.length - 1]] < currentNum) {
      // We found the next greater element for the index at the top of the stack
      const prevIdx = stack.pop()!;
      res[prevIdx] = currentNum;
    }

    // We only push indices from the first pass (0 to n-1).
    // The elements accessed during the second pass (n to 2n-1) act ONLY as
    // potential "next greater" candidates for the elements remaining in the stack.
    if (i < n) {
      stack.push(i);
    }
  }

  return res;
};

console.log(nextGreaterElements(nums));
