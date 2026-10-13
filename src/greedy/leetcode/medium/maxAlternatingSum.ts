// 3727. Maximum Alternating Sum of Squares

/**
You are given an integer array nums. You may rearrange the elements in any order.

The alternating score of an array arr is defined as:

score = arr[0]2 - arr[1]2 + arr[2]2 - arr[3]2 + ...
Return an integer denoting the maximum possible alternating score of nums after rearranging its elements.
*/

/**
Example 1:

Input: nums = [1,2,3]

Output: 12

Explanation:

A possible rearrangement for nums is [2,1,3], which gives the maximum alternating score among all possible rearrangements.

The alternating score is calculated as:

score = 22 - 12 + 32 = 4 - 1 + 9 = 12

Example 2:

Input: nums = [1,-1,2,-2,3,-3]

Output: 16

Explanation:

A possible rearrangement for nums is [-3,-1,-2,1,3,2], which gives the maximum alternating score among all possible rearrangements.

The alternating score is calculated as:

score = (-3)2 - (-1)2 + (-2)2 - (1)2 + (3)2 - (2)2 = 9 - 1 + 4 - 1 + 9 - 4 = 16

 
*/

/**
Constraints:

1 <= nums.length <= 105
-4 * 104 <= nums[i] <= 4 * 104
*/

// Brute Force approach: TLE
// function maxAlternatingSum(nums: number[]): number {
//   let maxScore = -Infinity;
//   const n = nums.length;
//   const used = new Array(n).fill(false);
//   const currentPermutation: number[] = [];

//   // Helper function to generate all permutations.
//   function generatePermutations(): void {
//     if (currentPermutation.length === n) {
//       let currentScore = 0;

//       // Calculate alternating score for the current permutation.
//       for (let i = 0; i < n; i++) {
//         const square = currentPermutation[i] * currentPermutation[i];
//         if (i % 2 === 0) {
//           currentScore += square;
//         } else {
//           currentScore -= square;
//         }
//       }

//       maxScore = Math.max(maxScore, currentScore);
//       return;
//     }

//     for (let i = 0; i < n; i++) {
//       if (!used[i]) {
//         used[i] = true;
//         currentPermutation.push(nums[i]);

//         generatePermutations();

//         // Backtrack to explore other possibilities.
//         currentPermutation.pop();
//         used[i] = false;
//       }
//     }
//   }

//   generatePermutations();
//   return maxScore;
// }

function maxAlternatingSum(nums: number[]): number {
  const n = nums.length;

  // Calculate the square of each element.
  const squares: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    squares[i] = nums[i] * nums[i];
  }

  // Sort the squares in ascending order.
  squares.sort((a, b) => a - b);

  // Number of elements that will have a negative sign.
  const negativeCount = Math.floor(n / 2);

  let maxScore = 0;

  // Subtract the smallest squares.
  for (let i = 0; i < negativeCount; i++) {
    maxScore -= squares[i];
  }

  // Add the largest squares.
  for (let i = negativeCount; i < n; i++) {
    maxScore += squares[i];
  }

  return maxScore;
}
// Example usage:
const nums1 = [1, 2, 3];
console.log(maxAlternatingSum(nums1)); // Output: 12

const nums2 = [1, -1, 2, -2, 3, -3];
console.log(maxAlternatingSum(nums2)); // Output: 16
