// Array into two equal sum sub array

// const subNums = [3, 4, -2, 5, 8, 20 - 10, 8];
// const subNums = [7, 3, 4, 7];
const subNums = [1, 5, 11, 5];
// const subNums = [3, 2, 2, 4, 3];

// prefix sum approach
const findTwoEqualSubArray = function (nums: number[]) {
  let totalSum = 0;
  let prefix = 0;

  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }

  for (let i = 0; i < nums.length - 1; i++) {
    prefix += nums[i];

    let ans = totalSum - prefix;
    if (ans === prefix) {
      return true;
    }
  }

  return false;
};

console.log(findTwoEqualSubArray(subNums));
