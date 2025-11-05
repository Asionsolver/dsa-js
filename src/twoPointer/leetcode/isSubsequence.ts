// 392. Is Subsequence

/**
Example 1:

Input: s = "abc", t = "ahbgdc"
Output: true
Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false

*/

// const s = "abc";
// const t = "ahbgdc";

const s = "axc";
const t = "ahbgdc";

//   Basic version

const isSubsequence = function (s: string, t: string) {
  let sPointer = 0;
  let tPointer = 0;

  while (sPointer < s.length && tPointer < t.length) {
    if (s[sPointer] === t[tPointer]) {
      sPointer++;
    }
    tPointer++;
  }
  console.log(sPointer);
  return sPointer === s.length;
};

console.log(isSubsequence(s, t));
