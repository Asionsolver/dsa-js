// 474. Ones and Zeroes

/**
Example 1:

Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
Example 2:

Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.

*/
const strs = ["10", "0001", "111001", "1", "0"],
  m = 5,
  n = 3;
const findMaxForm = function (strs: string[], m: number, n: number) {
  // Initialize a 2D DP array with size (m+1) x (n+1) filled with 0.
  // dp[i][j] represents the max subset size with at most i '0's and j '1's.
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  // Iterate through each string in the input array
  for (const str of strs) {
    // Count zeros and ones for the current string
    let zeros = 0;
    let ones = 0;
    for (let k = 0; k < str.length; k++) {
      if (str[k] === "0") {
        zeros++;
      } else {
        ones++;
      }
    }

    // Update the DP table.
    // We iterate backwards from m to zeros and n to ones.
    // Backwards iteration is crucial to simulate the 0/1 knapsack behavior
    // using a 2D array (prevents using the same item twice in one step).
    for (let i = m; i >= zeros; i--) {
      for (let j = n; j >= ones; j--) {
        // The new max is either:
        // 1. The existing max at this capacity (we don't include current str)
        // 2. 1 (current str) + max subset size remaining capacity (i-zeros, j-ones)
        dp[i][j] = Math.max(dp[i][j], 1 + dp[i - zeros][j - ones]);
      }
    }
  }

  // The answer is the maximum size found for constraints m and n
  return dp[m][n];
};
console.log(findMaxForm(strs, m, n));
