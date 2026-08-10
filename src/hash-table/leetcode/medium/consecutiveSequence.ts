// 128. Longest Consecutive Sequence

/**
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.
*/

/**
Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
Example 3:

Input: nums = [1,0,1,2]
Output: 3

 */

/**
 Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
 */

// Brute force way
// const longestConsecutive = function (nums: number[]) {
//   if (nums.length === 0) return 0;
//   let longest = 0;
//   let count = 1;
//   numsTwo.sort((a, b) => a - b);
//   for (let i = 0; i < numsTwo.length; i++) {
//     if (nums[i] === nums[i - 1]) {
//       continue;
//     } else if (nums[i] === nums[i - 1] + 1) {
//       count++;
//     } else {
//       longest = Math.max(longest, count);
//       count = 1;
//     }
//   }
//   return Math.max(longest, count);
// };

// optimize way Map Version --> better
// const longestConsecutive = function (nums: number[]) {
//   const map = new Map();
//   let longest = 0;

//   for (const num of nums) {
//     if (map.has(num)) continue;

//     const left = map.get(num - 1) || 0;
//     const right = map.get(num + 1) || 0;
//     const sum = left + right + 1;

//     map.set(num, sum);

//     map.set(num - left, sum);
//     map.set(num + right, sum);

//     longest = Math.max(longest, sum);
//   }

//   return longest;
// };

// optimize way Map Version --> Better
// function longestConsecutive(nums: number[]): number {
//   // Edge case 1: Directly return 0 if the array is empty
//   if (nums.length === 0) {
//     return 0;
//   }

//   // Taking all the elements into a set (in this case, edge case 3 i.e. duplicates will be removed automatically)
//   const numSet = new Set<number>(nums);
//   let longestStreak = 0;

//   for (const num of numSet) {
//     // We will only check if 'num' is the start of a sequence
//     // That is, the number immediately preceding it is not in the set (num - 1)
//     if (!numSet.has(num - 1)) {
//       let currentNum = num;
//       let currentStreak = 1;

//       // Checking whether the following numbers are in the set in sequence
//       while (numSet.has(currentNum + 1)) {
//         currentNum += 1;
//         currentStreak += 1;
//       }

//       // Now we will store the longest streak found so far
//       longestStreak = Math.max(longestStreak, currentStreak);
//     }
//   }

//   return longestStreak;
// }

// Method 1: "Set Deletion / Erase" trick (theoretically O(n) and interview-friendly)
// function longestConsecutive(nums: number[]): number {
//   const numSet = new Set<number>(nums);
//   let longestStreak = 0;

//   for (const num of numSet) {
//     // Only work if the number is still in the set
//     if (numSet.has(num)) {
//       numSet.delete(num); // I deleted the first number

//       let low = num - 1;
//       let high = num + 1;

//       // I'm looking for and deleting small numbers.
//       while (numSet.has(low)) {
//         numSet.delete(low);
//         low--;
//       }

//       // I'm looking for and deleting large numbers.
//       while (numSet.has(high)) {
//         numSet.delete(high);
//         high++;
//       }

//       // Calculating the length of the current sequence.
//       const currentStreak = high - low - 1;
//       if (currentStreak > longestStreak) {
//         longestStreak = currentStreak;
//       }
//     }
//   }

//   return longestStreak;
// }

// Method 2: "Engine Native Sorting" trick (fastest in practical use)
function longestConsecutive(nums: number[]): number {
  const len = nums.length;
  if (len === 0) return 0;

  // Arranging the numbers from smallest to largest
  nums.sort((a, b) => a - b);

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < len; i++) {
    // If two consecutive numbers are equal, skip them (e.g., [1, 2, 2, 3])
    if (nums[i] !== nums[i - 1]) {
      // If the current number is exactly one more than the previous number
      if (nums[i] === nums[i - 1] + 1) {
        currentStreak++;
      } else {
        // Sequence broken, update the maximum value and start a new sequence
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
        currentStreak = 1;
      }
    }
  }

  return currentStreak > longestStreak ? currentStreak : longestStreak;
}

// Test cases
const numsOne = [100, 4, 200, 1, 3, 2];
console.log(longestConsecutive(numsOne)); // Output: 4

const numsTwo = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
console.log(longestConsecutive(numsTwo)); // Output: 9

const numsThree = [1, 0, 1, 2];
console.log(longestConsecutive(numsThree)); // Output: 3
