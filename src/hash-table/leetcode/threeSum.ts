// Three Sum

const numsThree = [1, 4, 45, 6, 10, 8];
const sumTarget = 13;
// const threeSum = function (nums: number[], target: number) {
//   nums.sort((a, b) => a - b);

//   for (let i = 0; i < nums.length - 2; i++) {
//     let ans = target - nums[i];
//     let start = i + 1;
//     let end = nums.length - 1;
//     while (start < end) {
//       if (nums[start] + nums[end] === ans) {
//         return true;
//       } else if (nums[start] + nums[end] > ans) {
//         end--;
//       } else {
//         start++;
//       }
//     }
//   }
//   return false;
//   //
// };
const threeSumAll = function (nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let start = i + 1;
    let end = nums.length - 1;

    while (start < end) {
      const sum = nums[i] + nums[start] + nums[end];
      if (sum === target) {
        res.push([nums[i], nums[start], nums[end]]);
        start++;
        end--;
        while (start < end && nums[start] === nums[start - 1]) start++;
        while (start < end && nums[end] === nums[end + 1]) end--;
      } else if (sum < target) start++;
      else end--;
    }
  }

  return res;
};

console.log(threeSumAll(numsThree, sumTarget));
