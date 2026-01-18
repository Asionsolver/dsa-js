// 2598. Smallest Missing Non-negative Integer After Operations

/**
Example 1:

Input: nums = [1,-10,7,13,6,8], value = 5
Output: 4
Explanation: One can achieve this result by applying the following operations:
- Add value to nums[1] twice to make nums = [1,0,7,13,6,8]
- Subtract value from nums[2] once to make nums = [1,0,2,13,6,8]
- Subtract value from nums[3] twice to make nums = [1,0,2,3,6,8]
The MEX of nums is 4. It can be shown that 4 is the maximum MEX we can achieve.
Example 2:

Input: nums = [1,-10,7,13,6,8], value = 7
Output: 2
Explanation: One can achieve this result by applying the following operation:
- subtract value from nums[2] once to make nums = [1,-10,0,13,6,8]
The MEX of nums is 2. It can be shown that 2 is the maximum MEX we can achieve.

*/

const nums = [1, -10, 7, 13, 6, 8],
  value = 5;

const findSmallestInteger = function (nums: number[], value: number): number {
  // Array to store the count of numbers having a specific remainder (0 to value-1)
  const counts = new Array(value).fill(0);

  // Calculate remainder frequencies
  for (const num of nums) {
    // Handle negative numbers correctly to get a positive remainder
    const rem = ((num % value) + value) % value;
    counts[rem]++;
  }

  let minMissing = Infinity;

  // Check each remainder group
  for (let r = 0; r < value; r++) {
    // With 'counts[r]' elements having remainder 'r',
    // we can form the numbers: r, r + value, ..., r + (counts[r]-1)*value.
    // The first missing number in this sequence is:
    const currentMissing = r + counts[r] * value;

    // The MEX is determined by the "column" (remainder group) that runs out first
    if (currentMissing < minMissing) {
      minMissing = currentMissing;
    }
  }

  return minMissing;
};

console.log(findSmallestInteger(nums, value));
