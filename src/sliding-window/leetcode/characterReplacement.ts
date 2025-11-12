// 424. Longest Repeating Character Replacement

/**
Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.

*/
const s = "AABABBA";
const k = 1;
var characterReplacement = function (s: string, k: number) {
  let count: Record<string, number> = {};
  let left = 0;
  let maxCount = 0;
  let res = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    count[char] = (count[char] || 0) + 1;
    maxCount = Math.max(maxCount, count[char]);

    // If replacements needed exceed k → move the left pointer
    while (right - left + 1 - maxCount > k) {
      count[s[left]]--;
      left++;
    }

    res = Math.max(res, right - left + 1);
  }

  return res;
};

console.log(characterReplacement(s, k));
