// 1758. Minimum Changes To Make Alternating Binary String

/**
Example 1:

Input: s = "0100"
Output: 1
Explanation: If you change the last character to '1', s will be "0101", which is alternating.
Example 2:

Input: s = "10"
Output: 0
Explanation: s is already alternating.
Example 3:

Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".
*/
const s = "0100";

const minOperations = function (s: string): number {
  let count = 0;
  const n = s.length;

  for (let i = 0; i < n; i++) {
    // The expected character for the pattern starting with '0' ("010101...")
    // Even indices should be '0', odd indices should be '1'
    const expectedChar = i % 2 === 0 ? "0" : "1";

    // If the current character doesn't match the expected character, increment count
    if (s[i] !== expectedChar) {
      count++;
    }
  }

  // The operations for the opposite pattern ("101010...") is simply `n - count`
  return Math.min(count, n - count);
};

console.log(minOperations(s));
