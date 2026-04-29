// 1563. Stone Game V

/**
Example 1:

Input: stoneValue = [6,2,3,4,5,5]
Output: 18
Explanation: In the first round, Alice divides the row to [6,2,3], [4,5,5]. The left row has the value 11 and the right row has value 14. Bob throws away the right row and Alice's score is now 11.
In the second round Alice divides the row to [6], [2,3]. This time Bob throws away the left row and Alice's score becomes 16 (11 + 5).
The last round Alice has only one choice to divide the row which is [2], [3]. Bob throws away the right row and Alice's score is now 18 (16 + 2). The game ends because only one stone is remaining in the row.
Example 2:

Input: stoneValue = [7,7,7,7,7,7,7]
Output: 28
Example 3:

Input: stoneValue = [4]
Output: 0

*/

function stoneGameV(stoneValue: number[]): number {
  const n = stoneValue.length;
  if (n <= 1) return 0;

  // Prefix sums to query sum(i, j) in O(1) time.
  const prefixSum = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
  }

  // Use 1D typed arrays for optimal contiguous memory caching. (Simulating 2D arrays i.e., dp[i][j] -> dp[i * n + j])
  const dp = new Int32Array(n * n);
  const maxL = new Int32Array(n * n);
  const maxR = new Int32Array(n * n);

  // mid points array keeps track of the transition where Left Sum >= Right Sum
  const mid = new Int32Array(n);

  for (let i = 0; i < n; i++) {
    mid[i] = i;
    const idx = i * n + i;
    dp[idx] = 0;
    maxL[idx] = stoneValue[i];
    maxR[idx] = stoneValue[i];
  }

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;

      // Advance the mid[i] pointer while 2 * sum(i, mid[i]) < sum(i, j)
      // It helps establish our boundary mathematically where splits transition
      while (
        2 * (prefixSum[mid[i] + 1] - prefixSum[i]) <
        prefixSum[j + 1] - prefixSum[i]
      ) {
        mid[i]++;
      }

      const m = mid[i];
      let max = 0;

      // For split values (k < m) where Left Sum < Right Sum => Bob throws Right
      if (m - 1 >= i) {
        const val = maxL[i * n + (m - 1)];
        if (val > max) max = val;
      }

      const sumL = prefixSum[m + 1] - prefixSum[i];
      const sumR = prefixSum[j + 1] - prefixSum[m + 1];

      // For split values (k >= m) where Left Sum >= Right Sum
      if (sumL === sumR) {
        const valL = maxL[i * n + m];
        if (valL > max) max = valL;

        if (m + 1 <= j) {
          const valR = maxR[(m + 1) * n + j];
          if (valR > max) max = valR;
        }
      } else {
        if (m + 1 <= j) {
          const valR = maxR[(m + 1) * n + j];
          if (valR > max) max = valR;
        }
      }

      const idx = i * n + j;
      dp[idx] = max;

      // Re-update our running DP state references for larger segment comparisons later
      const totalSum = prefixSum[j + 1] - prefixSum[i];

      const lPrev = maxL[i * n + (j - 1)];
      const lCur = max + totalSum;
      maxL[idx] = lPrev > lCur ? lPrev : lCur;

      const rPrev = maxR[(i + 1) * n + j];
      const rCur = max + totalSum;
      maxR[idx] = rPrev > rCur ? rPrev : rCur;
    }
  }

  return dp[n - 1]; // Answer at dp[0][n - 1]
}

// Example usage:
console.log(stoneGameV([6, 2, 3, 4, 5, 5])); // Output: 18
console.log(stoneGameV([7, 7, 7, 7, 7, 7, 7])); // Output: 28
console.log(stoneGameV([4])); // Output: 0
