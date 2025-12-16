// 5. Longest Palindromic Substring
/**
Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
*/

const s = "babad";

const isPalindrome = function (s: string, start: number, end: number) {
  while (start < end) {
    if (s[start] !== s[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
};

const longestPalindrome = function (s: string) {
  let ans = "";
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (isPalindrome(s, i, j)) {
        const t = s.substring(i, j + 1);
        ans = t.length > ans.length ? t : ans;
      }
    }
  }
  return ans;
};

console.log(longestPalindrome(s));

// T.C: O(n3)
