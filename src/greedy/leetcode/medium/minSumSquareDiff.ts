// 2333. Minimum Sum of Squared Difference

/**
You are given two positive 0-indexed integer arrays nums1 and nums2, both of length n.

The sum of squared difference of arrays nums1 and nums2 is defined as the sum of (nums1[i] - nums2[i])2 for each 0 <= i < n.

You are also given two positive integers k1 and k2. You can modify any of the elements of nums1 by +1 or -1 at most k1 times. Similarly, you can modify any of the elements of nums2 by +1 or -1 at most k2 times.

Return the minimum sum of squared difference after modifying array nums1 at most k1 times and modifying array nums2 at most k2 times.

Note: You are allowed to modify the array elements to become negative integers.

 
*/

/**
Example 1:

Input: nums1 = [1,2,3,4], nums2 = [2,10,20,19], k1 = 0, k2 = 0
Output: 579
Explanation: The elements in nums1 and nums2 cannot be modified because k1 = 0 and k2 = 0. 
The sum of square difference will be: (1 - 2)2 + (2 - 10)2 + (3 - 20)2 + (4 - 19)2 = 579.
Example 2:

Input: nums1 = [1,4,10,12], nums2 = [5,8,6,9], k1 = 1, k2 = 1
Output: 43
Explanation: One way to obtain the minimum sum of square difference is: 
- Increase nums1[0] once.
- Increase nums2[2] once.
The minimum of the sum of square difference will be: 
(2 - 5)2 + (4 - 8)2 + (10 - 7)2 + (12 - 9)2 = 43.
Note that, there are other ways to obtain the minimum of the sum of square difference, but there is no way to obtain a sum smaller than 43.
*/

/**
Constraints:

n == nums1.length == nums2.length
1 <= n <= 105
0 <= nums1[i], nums2[i] <= 105
0 <= k1, k2 <= 109
*/

// Brute Force Approach: TLE
// function minSumSquareDiff(
//   nums1: number[],
//   nums2: number[],
//   k1: number,
//   k2: number,
// ): number {
//   const n = nums1.length;
//   const diff: number[] = new Array(n);

//   // Compute the initial absolute differences.
//   for (let i = 0; i < n; i++) {
//     diff[i] = Math.abs(nums1[i] - nums2[i]);
//   }

//   let k = k1 + k2;

//   // Greedily decrement the largest difference one by one.
//   while (k > 0) {
//     let maxIdx = 0;
//     for (let i = 1; i < n; i++) {
//       if (diff[i] > diff[maxIdx]) {
//         maxIdx = i;
//       }
//     }

//     // If the maximum difference is already 0, we cannot reduce further.
//     if (diff[maxIdx] === 0) {
//       break;
//     }

//     diff[maxIdx]--;
//     k--;
//   }

//   // Calculate the final sum of squared differences.
//   let result = 0;
//   for (let i = 0; i < n; i++) {
//     result += diff[i] * diff[i];
//   }

//   return result;
// }

// Optimized Approach
function minSumSquareDiff(
  nums1: number[],
  nums2: number[],
  k1: number,
  k2: number,
): number {
  const n = nums1.length;
  let maxDiff = 0;
  const diff: number[] = new Array(n);

  // Calculate the absolute difference for each index and find the maximum difference.
  for (let i = 0; i < n; i++) {
    const d = Math.abs(nums1[i] - nums2[i]);
    diff[i] = d;
    if (d > maxDiff) {
      maxDiff = d;
    }
  }

  // If the maximum difference is already 0, the sum of squares is 0.
  if (maxDiff === 0) {
    return 0;
  }

  // Build a frequency array to count occurrences of each difference value.
  const count: number[] = new Array(maxDiff + 1).fill(0);
  for (let i = 0; i < n; i++) {
    count[diff[i]]++;
  }

  // Total available operations pool.
  let totalK = k1 + k2;

  // Greedily reduce elements starting from the largest difference down to 1.
  for (let val = maxDiff; val > 0; val--) {
    if (count[val] === 0) {
      continue;
    }

    if (totalK >= count[val]) {
      // We have enough budget to reduce all elements of this value to (val - 1).
      totalK -= count[val];
      count[val - 1] += count[val];
      count[val] = 0;
    } else {
      // Budget is insufficient, reduce as many as possible (totalK elements).
      count[val] -= totalK;
      count[val - 1] += totalK;
      totalK = 0;
      break;
    }
  }

  // Calculate the final minimum sum of squared differences.
  let result = 0;
  for (let val = 1; val <= maxDiff; val++) {
    if (count[val] > 0) {
      result += count[val] * val * val;
    }
  }

  return result;
}
