// 3. Longest Substring Without Repeating Characters

/**
Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

*/

let s = "abcabcbb";
const lengthOfLongestSubstring = function (s: string) {
  const count = Array.from({ length: 256 }).fill(0);
  let first = 0;
  let second = 0;
  let length = 0;
  while (second < s.length) {
    // Repeating character remove
    while (count[s.charCodeAt(second)]) {
      count[s.charCodeAt(first)] = 0;
      first++;
    }
    count[s.charCodeAt(second)] = 1;
    length = Math.max(length, second - first + 1);
    second++;
  }
  return length;
};

console.log(lengthOfLongestSubstring(s));
