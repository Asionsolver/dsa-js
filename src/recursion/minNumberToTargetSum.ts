// Solve minimum number of elements required to reach target sum

// const numSum = [1, 2];
const numSum = [1, 2, 3];
const targetSumOne = 5;

const minNumber = function (nums: number[], target: number) {
  // base case
  if (target === 0) {
    return 0;
  }
  if (target < 0) {
    return Infinity;
  }

  // 1st case solve
  let min = Infinity;

  for (let i = 0; i < nums.length; i++) {
    let result = minNumber(nums, target - nums[i]);
    if (result || result !== Infinity) {
      min = Math.min(min, result + 1);
    }
  }

  return min;
};

console.log(minNumber(numSum, targetSumOne));
