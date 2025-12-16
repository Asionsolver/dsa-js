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
  if (s.length < t.length) {
    return "";
  }

  // Use an array to store frequency of characters in t.
  // ASCII size 128 covers all standard upper/lowercase English letters.
  const map: number[] = new Array(128).fill(0);

  for (let i = 0; i < t.length; i++) {
    map[t.charCodeAt(i)]++;
  }

  let count = t.length; // Number of characters we still need to find
  let minStart = 0;
  let minLen = Infinity;
  let left = 0;
  let right = 0;

  while (right < s.length) {
    const rChar = s.charCodeAt(right);

    // If map[rChar] > 0, it means this character is currently required.
    // We decrease the global 'count' of needed characters.
    if (map[rChar] > 0) {
      count--;
    }

    // Decrease the frequency in our map.
    // If it goes negative, it implies we have surplus of this character in the current window.
    map[rChar]--;
    right++;

    // When count is 0, our window [left, right) is valid (contains all chars of t).
    // Now we try to shrink it from the left.
    while (count === 0) {
      // Update minimum window tracking if this current window is smaller
      if (right - left < minLen) {
        minStart = left;
        minLen = right - left;
      }

      const lChar = s.charCodeAt(left);

      // We are about to remove s[left] from the window, so we increment its value in the map.
      map[lChar]++;

      // If map[lChar] becomes positive, it means we just removed a character
      // that was required to satisfy t. Thus, the window is no longer valid.
      if (map[lChar] > 0) {
        count++;
      }

      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
};

console.log(minWindow(s, t));
