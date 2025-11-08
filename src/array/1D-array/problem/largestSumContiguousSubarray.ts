// Largest Sum Contiguous Subarray

const contiguousArr = [3, 4, -5, 8, -12, 7, 6, -2];
// const contiguousArr = [4, -6, 2, 8];

const largestSumContiguousSubarray = function (nums: number[]) {
  let max = -Infinity;
  let prefix = 0;

  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    max = Math.max(max, prefix);
    if (prefix < 0) {
      prefix = 0;
    }
  }
  return max;
};

console.log(largestSumContiguousSubarray(contiguousArr));
