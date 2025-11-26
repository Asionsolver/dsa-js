// 974. Subarray Sums Divisible by K

/**
Example 1:

Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
Example 2:

Input: nums = [5], k = 9
Output: 0

Example 3: nums = [2, 7, 6, 1, 4, 5], k = 3;
output: 4
*/

const nums = [4, 5, 0, -2, -3, 1],
  k = 5;

// const nums = [2, 7, 6, 1, 4, 5],
//   k = 3;

const subArraysDivByK = function (nums: number[], k: number) {
  let map = new Map();
  map.set(0, 1); // remainder 0 seen once
  let sum = 0;
  let count = 0;

  for (let num of nums) {
    sum += num;
    let r = sum % k;

    // fix negative remainder
    if (r < 0) r += k;

    if (map.has(r)) {
      count += map.get(r);
      map.set(r, map.get(r) + 1);
    } else {
      map.set(r, 1);
    }
  }

  return count;
};

console.log(subArraysDivByK(nums, k));
