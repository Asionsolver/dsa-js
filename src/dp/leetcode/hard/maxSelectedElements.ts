// 3041. Maximize Consecutive Elements in an Array After Modification

/**
You are given a 0-indexed array nums consisting of positive integers.

Initially, you can increase the value of any element in the array by at most 1.

After that, you need to select one or more elements from the final array such that those elements are consecutive when sorted in increasing order. For example, the elements [3, 4, 5] are consecutive while [3, 4, 6] and [1, 1, 2, 3] are not.

Return the maximum number of elements that you can select.


*/

/**
Example 1:

Input: nums = [2,1,5,1,1]
Output: 3
Explanation: We can increase the elements at indices 0 and 3. The resulting array is nums = [3,1,5,2,1].
We select the elements [3,1,5,2,1] and we sort them to obtain [1,2,3], which are consecutive.
It can be shown that we cannot select more than 3 consecutive elements.
Example 2:

Input: nums = [1,4,7,10]
Output: 1
Explanation: The maximum consecutive elements that we can select is 1.
*/

/**
Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 106
*/

// Brute Force Approach: TLE
// function maxSelectedElements(nums: number[]): number {
//   const n = nums.length;
//   const modifiedNums = new Array<number>(n);

//   // Helper function to find the longest consecutive sequence in a modified array.
//   function getLongestConsecutive(arr: number[]): number {
//     // Use a Set for O(1) lookups and to ignore duplicates.
//     const numSet = new Set<number>(arr);
//     let longest = 0;

//     for (const num of numSet) {
//       // Only start counting from the beginning of a sequence.
//       if (!numSet.has(num - 1)) {
//         let currentNum = num;
//         let currentStreak = 1;

//         while (numSet.has(currentNum + 1)) {
//           currentNum++;
//           currentStreak++;
//         }

//         longest = Math.max(longest, currentStreak);
//       }
//     }

//     return longest;
//   }

//   // Explore both choices (+0 and +1) for every index recursively.
//   function dfs(index: number): number {
//     if (index === n) {
//       return getLongestConsecutive(modifiedNums);
//     }

//     // Choice 1: Keep the element as is.
//     modifiedNums[index] = nums[index];
//     const keepCurrent = dfs(index + 1);

//     // Choice 2: Increase the element by 1.
//     modifiedNums[index] = nums[index] + 1;
//     const incrementCurrent = dfs(index + 1);

//     return Math.max(keepCurrent, incrementCurrent);
//   }

//   return dfs(0);
// }

// Optimized Approach: Dynamic Programming
function maxSelectedElements(nums: number[]): number {
  // Sort the array in ascending order so smaller elements are processed first.
  nums.sort((a, b) => a - b);

  // dp.get(v) stores the maximum length of a consecutive sequence ending at value v.
  const dp = new Map<number, number>();
  let maxLength = 0;

  for (const num of nums) {
    // Update dp[num + 1] FIRST using the previous dp[num] so the current element isn't reused twice.
    const lenIfIncremented = (dp.get(num) ?? 0) + 1;
    dp.set(num + 1, Math.max(dp.get(num + 1) ?? 0, lenIfIncremented));

    // Update dp[num] using dp[num - 1] (representing keeping the current element unchanged).
    const lenIfKept = (dp.get(num - 1) ?? 0) + 1;
    dp.set(num, Math.max(dp.get(num) ?? 0, lenIfKept));

    // Track the global maximum consecutive sequence length found so far.
    maxLength = Math.max(maxLength, dp.get(num)!, dp.get(num + 1)!);
  }

  return maxLength;
}

// Example usage:
const nums1 = [2, 1, 5, 1, 1];
console.log(maxSelectedElements(nums1)); // Output: 3

const nums2 = [1, 4, 7, 10];
console.log(maxSelectedElements(nums2)); // Output: 1
