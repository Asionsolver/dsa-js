// 453. Minimum Moves to Equal Array Elements

/**
Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.

In one move, you can increment n - 1 elements of the array by 1.

 
*/

/**
Example 1:

Input: nums = [1,2,3]
Output: 3
Explanation: Only three moves are needed (remember each move increments two elements):
[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]
Example 2:

Input: nums = [1,1,1]
Output: 0
*/

/**
Constraints:

n == nums.length
1 <= nums.length <= 105
-109 <= nums[i] <= 109
The answer is guaranteed to fit in a 32-bit integer.
*/

// Brute force solution : TLE
// function minMoves(nums: number[]): number {
//   let moves = 0;

//   while (true) {
//     let minIndex = 0;
//     let maxIndex = 0;

//     // Find the minimum and maximum elements in the array.
//     for (let i = 1; i < nums.length; i++) {
//       if (nums[i] < nums[minIndex]) {
//         minIndex = i;
//       }
//       if (nums[i] > nums[maxIndex]) {
//         maxIndex = i;
//       }
//     }

//     // If minimum and maximum are equal, all elements are equal.
//     if (nums[minIndex] === nums[maxIndex]) {
//       break;
//     }

//     // Increment all elements by 1 except the maximum element.
//     for (let i = 0; i < nums.length; i++) {
//       if (i !== maxIndex) {
//         nums[i]++;
//       }
//     }

//     // Increment the move counter.
//     moves++;
//   }

//   return moves;
// }

// Optimized solution
function minMoves(nums: number[]): number {
  // Find the minimum value in the array.
  let minVal = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < minVal) {
      minVal = nums[i];
    }
  }

  let totalMoves = 0;

  // Calculate the difference between each element and the minimum element.
  for (let i = 0; i < nums.length; i++) {
    totalMoves += nums[i] - minVal;
  }

  return totalMoves;
}

// Optimized solution

// Example Usage
const nums1 = [1, 2, 3];
console.log(minMoves(nums1)); // Output: 3

const nums2 = [1, 1, 1];
console.log(minMoves(nums2)); // Output: 0
