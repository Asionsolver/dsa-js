// 3644. Maximum K to Sort a Permutation

/**
You are given an integer array nums of length n, where nums is a permutation of the numbers in the range [0..n - 1].

You may swap elements at indices i and j only if nums[i] AND nums[j] == k, where AND denotes the bitwise AND operation and k is a non-negative integer.

Return the maximum value of k such that the array can be sorted in non-decreasing order using any number of such swaps. If nums is already sorted, return 0.
*/

/**

Example 1:

Input: nums = [0,3,2,1]

Output: 1

Explanation:

Choose k = 1. Swapping nums[1] = 3 and nums[3] = 1 is allowed since nums[1] AND nums[3] == 1, resulting in a sorted permutation: [0, 1, 2, 3].

Example 2:

Input: nums = [0,1,3,2]

Output: 2

Explanation:

Choose k = 2. Swapping nums[2] = 3 and nums[3] = 2 is allowed since nums[2] AND nums[3] == 2, resulting in a sorted permutation: [0, 1, 2, 3].

Example 3:

Input: nums = [3,2,1,0]

Output: 0

Explanation:

Only k = 0 allows sorting since no greater k allows the required swaps where nums[i] AND nums[j] == k.


*/

/**
Constraints:

1 <= n == nums.length <= 105
0 <= nums[i] <= n - 1
nums is a permutation of integers from 0 to n - 1.
*/


// Brute Force Approach: TLE
// function sortPermutation(nums: number[]): number {
//     const n = nums.length;

//     // Check if the array is already sorted.
//     let isAlreadySorted = true;
//     for (let i = 0; i < n; i++) {
//         if (nums[i] !== i) {
//             isAlreadySorted = false;
//             break;
//         }
//     }

//     if (isAlreadySorted) {
//         return 0;
//     }

//     // Try all possible candidates for k from n - 1 down to 0.
//     for (let candidateK = n - 1; candidateK >= 0; candidateK--) {
//         let isValid = true;

//         for (let i = 0; i < n; i++) {
//             // Misplaced elements must contain all 1-bits of candidateK.
//             if (nums[i] !== i) {
//                 if ((nums[i] & candidateK) !== candidateK) {
//                     isValid = false;
//                     break;
//                 }
//             }
//         }

//         if (isValid) {
//             return candidateK;
//         }
//     }

//     return 0;
// };

// Optimized Approach: Bit Manipulation (Bitwise AND Invariance)
function sortPermutation(nums: number[]): number {
    // Initialize ans with -1 (all binary bits set to 1).
    let ans = -1;

    // Track whether there are any misplaced elements.
    let hasMisplaced = false;

    for (let i = 0; i < nums.length; i++) {
        // Check if the current element is not at its sorted position.
        if (nums[i] !== i) {
            hasMisplaced = true;

            // Accumulate the bitwise AND of all misplaced elements.
            ans &= nums[i];
        }
    }

    // If the array is already sorted, return 0 as per the problem statement.
    if (!hasMisplaced) {
        return 0;
    }

    // Return the maximum possible valid value of k.
    return ans;
};

// Example usage:
const nums1 = [0, 3, 2, 1];
const result1 = sortPermutation(nums1);
console.log(result1); // Output: 1

const nums2 = [0, 1, 3, 2];
const result2 = sortPermutation(nums2);
console.log(result2); // Output: 2

const nums3 = [3, 2, 1, 0];
const result3 = sortPermutation(nums3);
console.log(result3); // Output: 0  