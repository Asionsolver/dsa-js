// Max difference between two element

// const elementArr = [9, 5, 8, 12, 2, 3, 7, 4];
const elementArr = [3, 6, 9, 1];

// suffix max
const maxDifTwoElement = function (nums: number[]) {
  //
  let max = -Infinity;
  let suffix = nums[nums.length - 1];
  for (let i = nums.length - 2; i >= 0; i--) {
    let difference = suffix - nums[i];
    max = Math.max(max, difference);
    if (nums[i] > suffix) {
      suffix = nums[i];
    }
  }
  return max;
};

console.log(maxDifTwoElement(elementArr));
