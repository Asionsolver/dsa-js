// Three Sum

const numsThree = [1, 4, 45, 6, 10, 8];
const sumTarget = 13;
const threeSum = function (nums: number[], target: number) {
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    let ans = target - nums[i];
    let start = i + 1;
    let end = nums.length - 1;
    while (start < end) {
      if (nums[start] + nums[end] === ans) {
        return true;
      } else if (nums[start] + nums[end] > ans) {
        end--;
      } else {
        start++;
      }
    }
  }
  return false;
  //
};

console.log(threeSum(numsThree, sumTarget));
