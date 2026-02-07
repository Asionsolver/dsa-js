// 1653. Minimum Deletions to Make String Balanced

/**
Example 1:

Input: s = "aababbab"
Output: 2
Explanation: You can either:
Delete the characters at 0-indexed positions 2 and 6 ("aababbab" -> "aaabbb"), or
Delete the characters at 0-indexed positions 3 and 6 ("aababbab" -> "aabbbb").
Example 2:

Input: s = "bbaaaaabb"
Output: 2
Explanation: The only solution is to delete the first two characters.
*/

const s = "aababbab";
const minimumDeletions = function (s: string): number {
  // 'dp' stores the minimum deletions needed for the substring processed so far.
  let dp = 0;

  // 'countB' stores the total number of 'b' characters encountered so far.
  let countB = 0;

  for (const char of s) {
    if (char === "b") {
      // If we see 'b', we don't necessarily need to delete it yet.
      // Just increment the count of available 'b's that might cause a conflict later.
      countB++;
    } else {
      // If we see 'a', we have a potential conflict with preceding 'b's.
      // To fix the string ending here, we have two greedy choices:
      // 1. Delete the current 'a':
      //    Cost is (previous min deletions) + 1.
      // 2. Keep the current 'a':
      //    To keep 'a', no 'b' can exist before it.
      //    Cost is deleting all 'b's seen so far (countB).

      dp = Math.min(dp + 1, countB);
    }
  }

  return dp;
};

console.log(minimumDeletions(s));
