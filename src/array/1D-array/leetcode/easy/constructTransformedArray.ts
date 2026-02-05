// 3379. Transformed Array

/**
Example 1:

Input: nums = [3,-2,1,1]

Output: [1,1,1,3]

Explanation:

For nums[0] that is equal to 3, If we move 3 steps to right, we reach nums[3]. So result[0] should be 1.
For nums[1] that is equal to -2, If we move 2 steps to left, we reach nums[3]. So result[1] should be 1.
For nums[2] that is equal to 1, If we move 1 step to right, we reach nums[3]. So result[2] should be 1.
For nums[3] that is equal to 1, If we move 1 step to right, we reach nums[0]. So result[3] should be 3.
Example 2:

Input: nums = [-1,4,-1]

Output: [-1,-1,4]

Explanation:

For nums[0] that is equal to -1, If we move 1 step to left, we reach nums[2]. So result[0] should be -1.
For nums[1] that is equal to 4, If we move 4 steps to right, we reach nums[2]. So result[1] should be -1.
For nums[2] that is equal to -1, If we move 1 step to left, we reach nums[1]. So result[2] should be 4.
*/

const nums = [-1, 4, -1];

const constructTransformedArray = function (nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = new Array(n);

  for (let i = 0; i < n; i++) {
    // Calculate the target index based on the value at nums[i].
    // 1. (i + nums[i]) calculates the raw new position.
    // 2. % n wraps it around.
    // 3. + n ensures the result is positive (fixes negative modulo results).
    // 4. % n ensures the result is within [0, n-1] (handles cases where step 2 was already positive).
    const targetIndex = (((i + nums[i]) % n) + n) % n;

    result[i] = nums[targetIndex];
  }

  return result;
};

console.log(constructTransformedArray(nums));
