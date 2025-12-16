// 560. Subarray sum equal to K

// const subNum = [10, 2, -2, -20, 10];
// const targetTwo = -10;
const subNum = [9, 4, 20, 3, 10, 5];
const targetTwo = 33;
// const subNum = [1, 1, 1];
// const targetTwo = 2;
// const subNum = [1, 2, 3];
// const targetTwo = 3;

// Brute force way
// const subarraySum = function (nums: number[], k: number) {
//   let count = 0;
//   for (let i = 0; i < nums.length; i++) {
//     let sum = 0;
//     for (let j = i; j < nums.length; j++) {
//       sum += nums[j];
//       if (sum === k) {
//         count++;
//       }
//     }
//   }
//   return count;
// };

// optimize way
const subarraySum = function (nums: number[], k: number) {
  let sumMap = new Map();
  let count = 0;
  let sum = 0;

  sumMap.set(sum, 1);
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    let difference = sum - k;
    if (sumMap.has(difference)) {
      count += sumMap.get(difference);
    }
    sumMap.set(sum, (sumMap.get(sum) || 0) + 1);
  }

  return count;
};
console.log(subarraySum(subNum, targetTwo));
