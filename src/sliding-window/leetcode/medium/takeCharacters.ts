// 2516. Take K of Each Character From Left and Right

/**
Example 1:

Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation: 
Take three characters from the left of s. You now have two 'a' characters, and one 'b' character.
Take five characters from the right of s. You now have four 'a' characters, two 'b' characters, and two 'c' characters.
A total of 3 + 5 = 8 minutes is needed.
It can be proven that 8 is the minimum number of minutes needed.
Example 2:

Input: s = "a", k = 1
Output: -1
Explanation: It is not possible to take one 'b' or 'c' so return -1.
*/

const s = "aabaaaacaabc";
const k = 2;

function takeCharacters(s: string, k: number): number {
  const n = s.length;

  // Store counts for 'a', 'b', and 'c'
  const counts = [0, 0, 0];

  for (let i = 0; i < n; i++) {
    counts[s.charCodeAt(i) - 97]++;
  }

  // If we don't even have k of every character in the whole string, return -1
  if (counts[0] < k || counts[1] < k || counts[2] < k) {
    return -1;
  }

  // The maximum number of each character we are allowed to keep in the middle sliding window
  const limits = [counts[0] - k, counts[1] - k, counts[2] - k];

  const windowCounts = [0, 0, 0];
  let maxLen = 0;
  let left = 0;

  // Sliding window
  for (let right = 0; right < n; right++) {
    // Add the current right character to the window
    windowCounts[s.charCodeAt(right) - 97]++;

    // If our window breaks the limits, shrink it from the left
    while (
      windowCounts[0] > limits[0] ||
      windowCounts[1] > limits[1] ||
      windowCounts[2] > limits[2]
    ) {
      windowCounts[s.charCodeAt(left) - 97]--;
      left++;
    }

    // Update the maximum length of a valid middle window
    maxLen = Math.max(maxLen, right - left + 1);
  }

  // Total characters taken is the total length minus the longest valid middle window
  return n - maxLen;
}

console.log(takeCharacters(s, k));
