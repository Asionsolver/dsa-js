// 31. Next Permutation

/**
A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
Given an array of integers nums, find the next permutation of nums.

The replacement must be in place and use only constant extra memory.
*/

/**
Example 1:

Input: nums = [1,2,3]
Output: [1,3,2]
Example 2:

Input: nums = [3,2,1]
Output: [1,2,3]
Example 3:

Input: nums = [1,1,5]
Output: [1,5,1]
 


*/

/**
Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 100
*/

// Approach 1: Brute Force
// function nextPermutation(nums: number[]): void {
// const allPermutations: number[][] = [];
// const sortedNums = [...nums].sort((a, b) => a - b);
// const used = new Array(nums.length).fill(false);

// // Helper function to generate all unique permutations using backtracking.
// function backtrack(current: number[]): void {
//     if (current.length === sortedNums.length) {
//         allPermutations.push([...current]);
//         return;
//     }

//     for (let i = 0; i < sortedNums.length; i++) {
//         // Skip already used elements or duplicates to avoid repeating permutations.
//         if (used[i] || (i > 0 && sortedNums[i] === sortedNums[i - 1] && !used[i - 1])) {
//             continue;
//         }

//         used[i] = true;
//         current.push(sortedNums[i]);
//         backtrack(current);
//         current.pop();
//         used[i] = false;
//     }
// }

// backtrack([]);

// // Find the index of the current permutation.
// let currentIndex = -1;
// for (let i = 0; i < allPermutations.length; i++) {
//     let match = true;
//     for (let j = 0; j < nums.length; j++) {
//         if (allPermutations[i][j] !== nums[j]) {
//             match = false;
//             break;
//         }
//     }
//     if (match) {
//         currentIndex = i;
//         break;
//     }
// }

// // Determine the next permutation (wrap around if it's the last one).
// const nextIndex = (currentIndex + 1) % allPermutations.length;
// const result = allPermutations[nextIndex];

// // Copy the result back into nums in-place.
// for (let i = 0; i < nums.length; i++) {
//     nums[i] = result[i];
// }
// }

function nextPermutation(nums: number[]): void {
  // Optimize Solution
  const n = nums.length;
  let i = n - 2;

  // Step 1: Find the first decreasing element from the right.
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }

  // Step 2: If a valid pivot was found, find the element just larger than nums[i] to swap.
  if (i >= 0) {
    let j = n - 1;
    // Since the suffix is decreasing, the first element greater than nums[i] from right is the smallest valid candidate.
    while (nums[j] <= nums[i]) {
      j--;
    }
    // Swap nums[i] and nums[j].
    swap(nums, i, j);
  }

  // Step 3: Reverse the elements to the right of index i to get the smallest lexicographical order.
  reverse(nums, i + 1, n - 1);
}

// Helper function to swap two elements in the array.
function swap(nums: number[], a: number, b: number): void {
  const temp = nums[a];
  nums[a] = nums[b];
  nums[b] = temp;
}

// Helper function to reverse a subarray in-place using two pointers.
function reverse(nums: number[], start: number, end: number): void {
  while (start < end) {
    swap(nums, start, end);
    start++;
    end--;
  }
}
