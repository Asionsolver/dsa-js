// 76. Minimum Window Substring

/**
Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
*/
const s = "ADOBECODEBANC";
const t = "ABC";
const minWindow = function (s: string, t: string) {
  let m = s.length;
  let n = t.length;
};

console.log(minWindow(s, t));
