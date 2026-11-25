// 3934. Smallest Unique Subarray

/**
You are given an integer array nums.

Find the minimum length of a subarray that is not identical to any other subarray in nums.

Return an integer denoting the minimum possible length of such a subarray.

Two subarrays are considered identical if they have the same length and the same elements in corresponding positions.


*/

/**
Example 1:

Input: nums = [3,3,3]

Output: 3

Explanation:

Subarrays of length 1: [3] → appears 3 times
Subarrays of length 2: [3, 3] → appears 2 times
Subarrays of length 3: [3, 3, 3] → appears once
The subarray [3, 3, 3] is unique, so the smallest unique subarray length is 3.

Example 2:

Input: nums = [2,1,2,3,3]

Output: 1

Explanation:

Subarrays of length 1:

[2] → appears 2 times
[1] → appears once
[3] → appears 2 times
The subarray [1] is unique, so the smallest unique subarray length is 1.
Example 3:

Input: nums = [1,1,2,2,1]

Output: 2

Explanation:

Subarrays of length 1:

[1] → appears 3 times
[2] → appears 2 times
Subarrays of length 2:

[1, 1] → appears once
[1, 2] → appears once
[2, 2] → appears once
[2, 1] → appears once
There is at least one subarray of length 2 that is unique, so the smallest unique subarray length is 2.
*/

/** 
Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
*/

// Brute Force Approach: Check all possible subarrays of increasing lengths and see if any of them is unique. The first length for which a unique subarray is found is the answer. (TLE)
// function smallestUniqueSubarray(nums: number[]): number {
//   const n = nums.length;

//   // Try every possible subarray length from 1 to n.
//   for (let len = 1; len <= n; len++) {
//     // Pick each starting index i for a subarray of length len.
//     for (let i = 0; i <= n - len; i++) {
//       let isUnique = true;

//       // Compare subarray starting at i with every other subarray starting at j.
//       for (let j = 0; j <= n - len; j++) {
//         if (i === j) continue;

//         let isSame = true;

//         // Check element by element whether both subarrays are identical.
//         for (let k = 0; k < len; k++) {
//           if (nums[i + k] !== nums[j + k]) {
//             isSame = false;
//             break;
//           }
//         }

//         // If an identical subarray is found, the current subarray is not unique.
//         if (isSame) {
//           isUnique = false;
//           break;
//         }
//       }

//       // Return immediately upon finding the first unique subarray at the smallest length.
//       if (isUnique) {
//         return len;
//       }
//     }
//   }

//   return n;
// }

// Optimized Approach: Use binary search on the length of the subarray and a rolling hash to check for uniqueness. This reduces the time complexity significantly.
function smallestUniqueSubarray(nums: number[]): number {
  const n = nums.length;

  // Use two independent bases and prime moduli to virtually eliminate hash collisions.
  const MOD1 = 1_000_000_007;
  const MOD2 = 1_000_000_009;
  const BASE1 = 131_071;
  const BASE2 = 131_101;

  // Helper function to check if there is at least one unique subarray of a given length.
  const hasUniqueSubarray = (len: number): boolean => {
    let pow1 = 1;
    let pow2 = 1;

    // Precompute BASE^(len - 1) % MOD to remove the leftmost element during sliding.
    for (let i = 0; i < len - 1; i++) {
      pow1 = (pow1 * BASE1) % MOD1;
      pow2 = (pow2 * BASE2) % MOD2;
    }

    let h1 = 0;
    let h2 = 0;

    // Compute the initial rolling hash for the first window [0 .. len - 1].
    for (let i = 0; i < len; i++) {
      h1 = (h1 * BASE1 + nums[i]) % MOD1;
      h2 = (h2 * BASE2 + nums[i]) % MOD2;
    }

    const freq = new Map<bigint, number>();

    // Pack both 30-bit hashes into a single BigInt key (MOD2 < 2^30).
    const firstKey = (BigInt(h1) << 30n) | BigInt(h2);
    freq.set(firstKey, 1);

    // Slide the window across the rest of the array.
    for (let i = len; i < n; i++) {
      const outgoing = nums[i - len];
      const incoming = nums[i];

      // Remove the outgoing element from the left and append the incoming element on the right.
      h1 = (h1 - ((outgoing * pow1) % MOD1) + MOD1) % MOD1;
      h1 = (h1 * BASE1 + incoming) % MOD1;

      h2 = (h2 - ((outgoing * pow2) % MOD2) + MOD2) % MOD2;
      h2 = (h2 * BASE2 + incoming) % MOD2;

      const key = (BigInt(h1) << 30n) | BigInt(h2);
      freq.set(key, (freq.get(key) ?? 0) + 1);
    }

    // Check if any subarray of this length appeared exactly once.
    for (const count of freq.values()) {
      if (count === 1) {
        return true;
      }
    }

    return false;
  };

  // Binary search for the minimum valid subarray length in [1, n].
  let left = 1;
  let right = n;
  let minLength = n;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (hasUniqueSubarray(mid)) {
      // Mid is valid; record it and try to find an even smaller length.
      minLength = mid;
      right = mid - 1;
    } else {
      // No unique subarray of length mid exists; search larger lengths.
      left = mid + 1;
    }
  }

  return minLength;
}
// Example usage:
console.log(smallestUniqueSubarray([3, 3, 3])); // Output: 3
console.log(smallestUniqueSubarray([2, 1, 2, 3, 3])); // Output: 1
console.log(smallestUniqueSubarray([1, 1, 2, 2, 1])); // Output: 2
