// 1524. Number of Sub-arrays With Odd Sum

/**
Given an array of integers arr, return the number of subarrays with an odd sum.

Since the answer can be very large, return it modulo 109 + 7.
*/

/**
Example 1:

Input: arr = [1,3,5]
Output: 4
Explanation: All subarrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
All sub-arrays sum are [1,4,9,3,8,5].
Odd sums are [1,9,3,5] so the answer is 4.
Example 2:

Input: arr = [2,4,6]
Output: 0
Explanation: All subarrays are [[2],[2,4],[2,4,6],[4],[4,6],[6]]
All sub-arrays sum are [2,6,12,4,10,6].
All sub-arrays have even sum and the answer is 0.
Example 3:

Input: arr = [1,2,3,4,5,6,7]
Output: 16

*/

/**
Constraints:

1 <= arr.length <= 105
1 <= arr[i] <= 100
*/

// Brute force approach: TLE
// function numOfSubarrays(arr: number[]): number {
//   const MOD = 1_000_000_007;
//   let count = 0;

//   // Pick every possible starting index of a subarray.
//   for (let i = 0; i < arr.length; i++) {
//     let currentSum = 0;

//     // Expand the subarray to every possible ending index.
//     for (let j = i; j < arr.length; j++) {
//       currentSum += arr[j];

//       // Check if the current subarray sum is odd.
//       if (currentSum % 2 !== 0) {
//         count = (count + 1) % MOD;
//       }
//     }
//   }

//   return count;
// }

// Optimized approach using prefix sums and counting even/odd prefix sums.
function numOfSubarrays(arr: number[]): number {
  const MOD = 1_000_000_007;

  // Initialize evenCount to 1 to account for the empty prefix sum (0 is even).
  let evenCount = 1;
  let oddCount = 0;

  let prefixSum = 0;
  let totalOddSubarrays = 0;

  for (const num of arr) {
    prefixSum += num;

    // If current prefixSum is odd, pairing it with any previous even prefix gives an odd subarray sum.
    if (prefixSum % 2 === 1) {
      totalOddSubarrays = (totalOddSubarrays + evenCount) % MOD;
      oddCount++;
    } else {
      // If current prefixSum is even, pairing it with any previous odd prefix gives an odd subarray sum.
      totalOddSubarrays = (totalOddSubarrays + oddCount) % MOD;
      evenCount++;
    }
  }

  return totalOddSubarrays;
}
// Example usage:
const arr1 = [1, 3, 5];
console.log(numOfSubarrays(arr1)); // Output: 4

const arr2 = [2, 4, 6];
console.log(numOfSubarrays(arr2)); // Output: 0

const arr3 = [1, 2, 3, 4, 5, 6, 7];
console.log(numOfSubarrays(arr3)); // Output: 16
