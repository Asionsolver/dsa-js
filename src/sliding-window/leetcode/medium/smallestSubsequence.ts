// 1081. Smallest Subsequence of Distinct Characters

/**
Example 1:

Input: s = "bcabc"
Output: "abc"
Example 2:

Input: s = "cbacdcbc"
Output: "acdb"
 */

const s = "cbacdcbc";

const smallestSubsequence = function (s: string) {
  const lastIndex = new Map();
  for (let i = 0; i < s.length; i++) {
    lastIndex.set(s[i], i);
  }
  const stack: string[] = [];
  const seen = new Set();

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (seen.has(ch)) {
      continue;
    }

    while (
      stack.length &&
      stack[stack.length - 1] > ch &&
      lastIndex.get(stack[stack.length - 1]) > i
    ) {
      seen.delete(stack.pop());
    }
    stack.push(ch);
    seen.add(ch);
  }
  return stack.join("");
};

console.log(smallestSubsequence(s));
