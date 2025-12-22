// 960. Delete Columns to Make Sorted III

/**
Example 1:

Input: strs = ["babca","bbazb"]
Output: 3
Explanation: After deleting columns 0, 1, and 4, the final array is strs = ["bc", "az"].
Both these rows are individually in lexicographic order (ie. strs[0][0] <= strs[0][1] and strs[1][0] <= strs[1][1]).
Note that strs[0] > strs[1] - the array strs is not necessarily in lexicographic order.
Example 2:

Input: strs = ["edcba"]
Output: 4
Explanation: If we delete less than 4 columns, the only row will not be lexicographically sorted.
Example 3:

Input: strs = ["ghi","def","abc"]
Output: 0
Explanation: All rows are already lexicographically sorted.

*/

const strs = ["babca", "bbazb"];
const minDeletionSize = function (strs: string[]) {
  const n = strs.length;
  const m = strs[0].length;

  // dp[j] will store the length of the longest valid subsequence
  // of columns ending at index j.
  const dp: number[] = new Array(m).fill(1);

  // Variable to track the maximum number of columns we can keep
  let maxKept = 1;

  // Iterate through each column to determine the max LIS ending there
  for (let j = 0; j < m; j++) {
    for (let i = 0; i < j; i++) {
      // Check if column i can precede column j
      // A column i can precede j if for every string, the char
      // at i is <= the char at j.
      let canKeep = true;
      for (let k = 0; k < n; k++) {
        if (strs[k][i] > strs[k][j]) {
          canKeep = false;
          break;
        }
      }

      if (canKeep) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
      }
    }
    maxKept = Math.max(maxKept, dp[j]);
  }

  // Minimum deletions = Total columns - Maximum columns kept
  return m - maxKept;
};

console.log(minDeletionSize(strs));
