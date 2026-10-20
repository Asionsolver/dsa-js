// 3886. Sum of Sortable Integers

/**
You are given an integer array nums of length n.

An integer k is called sortable if k divides n and you can sort nums in non-decreasing order by sequentially performing the following operations:

Partition nums into consecutive subarrays of length k.
Cyclically rotate each subarray independently any number of times to the left or to the right.
Return an integer denoting the sum of all possible sortable integers k.
*/

/**
Example 1:

Input: nums = [3,1,2]

Output: 3

Explanation:​​​​​​​

For n = 3, possible divisors are 1 and 3.
For k = 1: each subarray has one element. No rotation can sort the array.
For k = 3: the single subarray [3, 1, 2] can be rotated once to produce [1, 2, 3], which is sorted.
Only k = 3 is sortable. Hence, the answer is 3.
Example 2:

Input: nums = [7,6,5]

Output: 0

Explanation:

For n = 3, possible divisors are 1 and 3.
For k = 1: each subarray has one element. No rotation can sort the array.
For k = 3: the single subarray [7, 6, 5] cannot be rotated into non-decreasing order.
No k is sortable. Hence, the answer is 0.
Example 3:

Input: nums = [5,8]

Output: 3

Explanation:​​​​​​​

For n = 2, possible divisors are 1 and 2.
Since [5, 8] is already sorted, every divisor is sortable. Hence, the answer is 1 + 2 = 3.
 


*/

/**
Constraints:

1 <= n == nums.length <= 105
1 <= nums[i] <= 105
*/

// Brute Force Approach: TLE
// function sortableIntegers(nums: number[]): number {
//   const n = nums.length;
//   let totalSum = 0;

//   // Check each possible divisor k of n.
//   for (let k = 1; k <= n; k++) {
//     if (n % k !== 0) continue;

//     let isPossibleForK = true;
//     let prevBlockMax = -Infinity;

//     for (let start = 0; start < n; start += k) {
//       let sortedRotationFound = false;
//       let currentBlockMin = Infinity;
//       let currentBlockMax = -Infinity;

//       // Try all possible k rotations for this block.
//       for (let shift = 0; shift < k; shift++) {
//         let isSorted = true;
//         for (let j = 0; j < k - 1; j++) {
//           const currentElem = nums[start + ((shift + j) % k)];
//           const nextElem = nums[start + ((shift + j + 1) % k)];
//           if (currentElem > nextElem) {
//             isSorted = false;
//             break;
//           }
//         }

//         if (isSorted) {
//           sortedRotationFound = true;
//           currentBlockMin = nums[start + shift];
//           currentBlockMax = nums[start + ((shift + k - 1) % k)];
//           break;
//         }
//       }

//       // If no rotation sorts this block, or boundary condition fails.
//       if (!sortedRotationFound || currentBlockMin < prevBlockMax) {
//         isPossibleForK = false;
//         break;
//       }

//       prevBlockMax = currentBlockMax;
//     }

//     if (isPossibleForK) {
//       totalSum += k;
//     }
//   }

//   return totalSum;
// }

// Optimized Approach
function sortableIntegers(nums: number[]): number {
  const n = nums.length;

  // nextDec[i] stores the index of the first decrease (nums[j] > nums[j + 1]) at or after index i.
  const nextDec = new Int32Array(n);
  let lastDrop = n;
  nextDec[n - 1] = n;

  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] > nums[i + 1]) {
      lastDrop = i;
    }
    nextDec[i] = lastDrop;
  }

  // Find all divisors of n in O(sqrt(n)) time.
  const divisors: number[] = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d === 0) {
      divisors.push(d);
      if (d * d !== n) {
        divisors.push(n / d);
      }
    }
  }

  let totalSum = 0;

  // Check each divisor k to see if it is sortable.
  for (const k of divisors) {
    let isSortable = true;
    let prevMax = -Infinity;

    // Iterate through all consecutive blocks of size k.
    for (let start = 0; start < n; start += k) {
      const end = start + k - 1;
      const firstDrop = nextDec[start];

      let minVal = 0;
      let maxVal = 0;

      if (firstDrop >= end) {
        // Case 1: No decrease inside the subarray; it is already non-decreasing.
        minVal = nums[start];
        maxVal = nums[end];
      } else {
        // Check if there is a second decrease inside the subarray.
        const secondDrop = nextDec[firstDrop + 1];

        if (secondDrop < end) {
          // More than one decrease inside: cannot be sorted via cyclic rotation.
          isSortable = false;
          break;
        }

        // Check circular boundary: the last element must be <= the first element.
        if (nums[end] > nums[start]) {
          isSortable = false;
          break;
        }

        // If valid, the element after the drop becomes the start of the sorted block.
        minVal = nums[firstDrop + 1];
        maxVal = nums[firstDrop];
      }

      // Check if the current block can merge smoothly with the previous block.
      if (minVal < prevMax) {
        isSortable = false;
        break;
      }

      prevMax = maxVal;
    }

    if (isSortable) {
      totalSum += k;
    }
  }

  return totalSum;
}

// Example usage:
const nums1 = [3, 1, 2];
console.log(sortableIntegers(nums1)); // Output: 3

const nums2 = [7, 6, 5];
console.log(sortableIntegers(nums2)); // Output: 0

const nums3 = [5, 8];
console.log(sortableIntegers(nums3)); // Output: 3
