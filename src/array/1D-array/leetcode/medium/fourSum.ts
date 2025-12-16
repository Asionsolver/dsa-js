// 18. 4Sum

/**
Example 1:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
Example 2:

Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]

*/

const nums = [1, 0, -1, 0, -2, 2],
  target = 0;

var fourSum = function (nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  let result = [];

  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate i

    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue; // skip duplicate j

      let left = j + 1;
      let right = n - 1;

      while (left < right) {
        let sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          left++;
          right--;

          while (left < right && nums[left] === nums[left - 1]) left++; // skip duplicates
          while (left < right && nums[right] === nums[right + 1]) right--; // skip duplicates
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }

  return result;
};

console.log(fourSum(nums, target));
