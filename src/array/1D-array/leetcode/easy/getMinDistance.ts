// 1848. Minimum Distance to the Target Element

/**
Example 1:

Input: nums = [1,2,3,4,5], target = 5, start = 3
Output: 1
Explanation: nums[4] = 5 is the only value equal to target, so the answer is abs(4 - 3) = 1.
Example 2:

Input: nums = [1], target = 1, start = 0
Output: 0
Explanation: nums[0] = 1 is the only value equal to target, so the answer is abs(0 - 0) = 0.
Example 3:

Input: nums = [1,1,1,1,1,1,1,1,1,1], target = 1, start = 0
Output: 0
Explanation: Every value of nums is 1, but nums[0] minimizes abs(i - start), which is abs(0 - 0) = 0.
*/

const nums = [1, 2, 3, 4, 5];
const target = 5;
const start = 3;

const getMinDistance = (
  nums: number[],
  target: number,
  start: number,
): number => {
  // Check distances radiating outwards from 'start'
  for (let step = 0; step < nums.length; step++) {
    // Check the right side
    if (start + step < nums.length && nums[start + step] === target) {
      return step;
    }
    // Check the left side
    if (start - step >= 0 && nums[start - step] === target) {
      return step;
    }
  }

  // Fallback (Execution will never reach here based on the constraints guaranteeing target exists)
  return 0;
};

console.log(getMinDistance(nums, target, start));
