// 2014. Longest Subsequence Repeated k Times

/**
Example 1:

Input: s = "letsleetcode", k = 2
Output: "let"
Explanation: There are two longest subsequences repeated 2 times: "let" and "ete".
"let" is the lexicographically largest one.
Example 2:

Input: s = "bb", k = 2
Output: "b"
Explanation: The longest subsequence repeated 2 times is "b".
Example 3:

Input: s = "ab", k = 2
Output: ""
Explanation: There is no subsequence repeated 2 times. Empty string is returned.

*/

function longestSubsequenceRepeatedK(s: string, k: number): string {
  const freq = new Int32Array(26);
  const sCodes = new Int32Array(s.length);

  // Count letter frequencies and pre-convert characters to int codes for faster matching
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i) - 97;
    sCodes[i] = code;
    freq[code]++;
  }

  const maxCount = new Int32Array(26);
  const chars: string[] = [];

  // Calculate eligible characters limits that can potentially form up our candidate subsequences
  for (let i = 0; i < 26; i++) {
    const mc = Math.floor(freq[i] / k);
    if (mc > 0) {
      maxCount[i] = mc;
      chars.push(String.fromCharCode(i + 97));
    }
  }

  const sLen = s.length;

  // Checks if `sub` repeated `k` times is a subsequence of `s`
  function isValid(sub: string): boolean {
    let i = 0;
    let matchedTimes = 0;
    const subLen = sub.length;

    for (let j = 0; j < sLen; j++) {
      if (sCodes[j] === sub.charCodeAt(i) - 97) {
        i++;
        if (i === subLen) {
          i = 0;
          matchedTimes++;
          if (matchedTimes === k) return true;
        }
      }

      // Early Exit Optimization: Check if matching is mathematically still possible given chars left
      const requiredChars = (k - matchedTimes) * subLen - i;
      const remainingChars = sLen - 1 - j;
      if (remainingChars < requiredChars) {
        return false;
      }
    }
    return false;
  }

  const q: string[] = [""];
  let best = "";
  let head = 0;

  // Breadth-First Search
  while (head < q.length) {
    const curr = q[head++];
    best = curr; // Overwrite sequentially; guarantees longest & lexicographically largest eventually

    const counts = new Int32Array(26);
    for (let i = 0; i < curr.length; i++) {
      counts[curr.charCodeAt(i) - 97]++;
    }

    // Attempt to extend strings with eligible chars uniformly
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const charCode = char.charCodeAt(0) - 97;

      if (counts[charCode] < maxCount[charCode]) {
        const nextStr = curr + char;
        if (isValid(nextStr)) {
          q.push(nextStr);
        }
      }
    }
  }

  return best;
}

// Test Cases
console.log(longestSubsequenceRepeatedK("letsleetcode", 2)); // Output: "let"
console.log(longestSubsequenceRepeatedK("bb", 2)); // Output: "b"
console.log(longestSubsequenceRepeatedK("ab", 2)); // Output: ""
