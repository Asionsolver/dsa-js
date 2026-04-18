// 2982. Find Longest Special Substring That Occurs Thrice II

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

function maximumLength(s: string): number {
  // Array to store the top 3 longest block lengths for each of the 26 lowercase English characters
  const top3: number[][] = Array.from({ length: 26 }, () => [0, 0, 0]);
  const n = s.length;
  let i = 0;

  // Parse the string and gather contiguous blocks of identical characters
  while (i < n) {
    let j = i;
    while (j < n && s[j] === s[i]) {
      j++;
    }

    const len = j - i;
    const charIdx = s.charCodeAt(i) - 97; // Map 'a'-'z' to 0-25

    // Insert `len` into top3[charIdx] maintaining descending order
    let [l1, l2, l3] = top3[charIdx];
    if (len >= l1) {
      l3 = l2;
      l2 = l1;
      l1 = len;
    } else if (len >= l2) {
      l3 = l2;
      l2 = len;
    } else if (len > l3) {
      l3 = len;
    }
    top3[charIdx] = [l1, l2, l3];

    i = j;
  }

  let maxLen = -1;

  // Evaluate the maximum valid length achievable for each distinct character
  for (let c = 0; c < 26; c++) {
    const [l1, l2, l3] = top3[c];

    // Skip characters that never appeared
    if (l1 === 0) continue;

    // Options representing how we can extract 3 occurrences
    const k1 = l1 - 2; // Case 1: 3 occurrences strictly from the longest block
    const k2 = Math.min(l1 - 1, l2); // Case 2: 2 from the longest, 1 from the second longest
    const k3 = l3; // Case 3: 1 from each of the three longest blocks

    const k = Math.max(k1, k2, k3);

    if (k > 0) {
      maxLen = Math.max(maxLen, k);
    }
  }

  return maxLen;
}

// Test cases
console.log(maximumLength("aaaa")); // Output: 2
console.log(maximumLength("abcdef")); // Output: -1
console.log(maximumLength("abcaba")); // Output: 1
