// 1784. Check if Binary String Has at Most One Segment of Ones

/**
Example 1:

Input: s = "1001"
Output: false
Explanation: The ones do not form a contiguous segment.
Example 2:

Input: s = "110"
Output: true
*/

const s = "1001";

// Approach 1: Built-in Method (Optimal & Cleanest)

// const checkOnesSegment = function (s: string): boolean {
//   // If "01" exists, it means a '1' appeared after a '0',
//   // creating a second segment of ones.
//   return !s.includes("01");
// };

// Approach 2: Iterative (Interview Friendly)
const checkOnesSegment = function (s: string): boolean {
  let seenZero = false;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "0") {
      seenZero = true; // We found the end of the first segment of '1's
    } else if (s[i] === "1" && seenZero) {
      // We found a '1' after a '0', meaning there is a second segment
      return false;
    }
  }

  return true;
};

console.log(checkOnesSegment(s));
