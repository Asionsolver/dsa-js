// 189. Rotate Array

/**
Example 1:

Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
Example 2:

Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]

*/

// const numsArray = [-1, -100, 3, 99];
// const rotateStep = 2;

const numsArray = [1, 2, 3, 4, 5, 6, 7];
const rotateStep = 3;

// basic version - using extra space
// const rotate = function (nums: number[], k: number) {
//   let n = nums.length;
//   k = k % n; // normalize k

//   // last k elements
//   const endPart = nums.slice(n - k);
//   // first part (remaining)
//   const startPart = nums.slice(0, n - k);

//   // overwrite nums
//   for (let i = 0; i < n; i++) {
//     if (i < k) {
//       nums[i] = endPart[i];
//     } else {
//       nums[i] = startPart[i - k];
//     }
//   }

//   return nums;
// };

// basic version - not using extra space
const rotate = function (nums: number[], k: number) {
  k = k % nums.length; // normalize k

  const reverse = (start: number, end: number) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  // step 1
  reverse(0, nums.length - 1);
  // step 2
  reverse(0, k - 1);
  // step 3
  reverse(k, nums.length - 1);

  return nums;
};

console.log(rotate(numsArray, rotateStep));
