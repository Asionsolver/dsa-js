// 2981. Find Longest Special Substring That Occurs Thrice I

/**
Example 1:

Input: s = "aaaa"
Output: 2
Explanation: The longest special substring which occurs thrice is "aa": substrings "aaaa", "aaaa", and "aaaa".
It can be shown that the maximum length achievable is 2.
Example 2:

Input: s = "abcdef"
Output: -1
Explanation: There exists no special substring which occurs at least thrice. Hence return -1.
Example 3:

Input: s = "abcaba"
Output: 1
Explanation: The longest special substring which occurs thrice is "a": substrings "abcaba", "abcaba", and "abcaba".
It can be shown that the maximum length achievable is 1.

*/

const maximumLength = (s: string): number => {
  const blocks = new Map<string, number[]>();
  const n = s.length;
  let i = 0;

  // Group contiguous blocks of identical characters
  while (i < n) {
    let j = i;
    while (j < n && s[j] === s[i]) {
      j++;
    }
    const len = j - i;
    const char = s[i];

    if (!blocks.has(char)) {
      blocks.set(char, []);
    }
    blocks.get(char)!.push(len);

    i = j;
  }

  let maxLen = -1;

  // Evaluate the maximum achievable length across all unique characters
  for (const lengths of blocks.values()) {
    // Sort the block lengths in descending order
    lengths.sort((a, b) => b - a);

    // Grab the top 3 block lengths (default to 0 if they don't exist)
    const l1 = lengths[0];
    const l2 = lengths.length >= 2 ? lengths[1] : 0;
    const l3 = lengths.length >= 3 ? lengths[2] : 0;

    // Three potential conditions derived from mathematical logic stated above:
    const m1 = l1 - 2;
    const m2 = Math.min(l1 - 1, l2);
    const m3 = l3;

    const currentMax = Math.max(m1, m2, m3);

    // A valid contiguous non-empty sequence's length is >= 1
    if (currentMax > 0) {
      maxLen = Math.max(maxLen, currentMax);
    }
  }

  return maxLen;
};

// Test cases
console.log(maximumLength("aaaa")); // Output: 2
console.log(maximumLength("abcdef")); // Output: -1
console.log(maximumLength("abcaba")); // Output: 1
