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

const checkOnesSegment = function (s: string): boolean {
  // If "01" exists, it means a '1' appeared after a '0',
  // creating a second segment of ones.
  return !s.includes("01");
};

console.log(checkOnesSegment(s));
