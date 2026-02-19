// 696. Count Binary Substrings

/**
Example 1:

Input: s = "00110011"
Output: 6
Explanation: There are 6 substrings that have equal number of consecutive 1's and 0's: "0011", "01", "1100", "10", "0011", and "01".
Notice that some of these substrings repeat and are counted the number of times they occur.
Also, "00110011" is not a valid substring because all the 0's (and 1's) are not grouped together.
Example 2:

Input: s = "10101"
Output: 4
Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal number of consecutive 1's and 0's.

*/

const s = "00110011";
const countBinarySubstrings = function (s: string): number {
  let prev = 0; // Length of the previous group of identical characters
  let curr = 1; // Length of the current group
  let count = 0; // Total valid substrings found

  for (let i = 1; i < s.length; i++) {
    // If current char is same as previous, extend the current group
    if (s[i] === s[i - 1]) {
      curr++;
    } else {
      // If char changes, current group becomes previous group
      prev = curr;
      curr = 1;
    }

    // If the previous group has at least as many characters as the
    // current group accumulated so far, a valid substring exists.
    // E.g., prev=3 ("000"), curr=2 ("11") -> valid is "0011"
    if (prev >= curr) {
      count++;
    }
  }

  return count;
};

console.log(countBinarySubstrings(s));
