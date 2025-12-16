// 128. Longest Consecutive Sequence
// const numsTwo = [100, 4, 200, 1, 3, 2];
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

const numsTwo = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
// Output: 9

// const numsTwo = [1,0,1,2]
// Output: 3

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

// optimize way Map Version --> best
const longestConsecutive = function (nums: number[]) {
  if (nums.length === 0) return 0;

  const numSet = new Set(nums);
  let longest = 0;

  for (const num of numSet) {
    // start of a new sequence (if the previous number doesn't exist)
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let count = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum++;
        count++;
      }

      longest = Math.max(longest, count);
    }
  }

  return longest;
};
console.log(longestConsecutive(numsTwo));
