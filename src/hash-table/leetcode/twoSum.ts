// 1.Two Sum
const nums = [2, 7, 11, 15];
const targetSum = 9;
let twoSum = function (nums: number[], target: number) {
  let sumMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const difference = target - nums[i];

    if (sumMap.has(difference)) {
      return [sumMap.get(difference), i];
    } else {
      sumMap.set(nums[i], i);
    }
  }
  return [];
};

console.log(twoSum(nums, targetSum));
