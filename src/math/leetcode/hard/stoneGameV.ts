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
//  optimized Dynamic Programming approach
// function stoneGameV(stoneValue: number[]): number {
//   const n = stoneValue.length;
//   if (n <= 1) return 0;

//   // Prefix sums to query sum(i, j) in O(1) time.
//   const prefixSum = new Int32Array(n + 1);
//   for (let i = 0; i < n; i++) {
//     prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
//   }

//   // Use 1D typed arrays for optimal contiguous memory caching. (Simulating 2D arrays i.e., dp[i][j] -> dp[i * n + j])
//   const dp = new Int32Array(n * n);
//   const maxL = new Int32Array(n * n);
//   const maxR = new Int32Array(n * n);

//   // mid points array keeps track of the transition where Left Sum >= Right Sum
//   const mid = new Int32Array(n);

//   for (let i = 0; i < n; i++) {
//     mid[i] = i;
//     const idx = i * n + i;
//     dp[idx] = 0;
//     maxL[idx] = stoneValue[i];
//     maxR[idx] = stoneValue[i];
//   }

//   for (let len = 2; len <= n; len++) {
//     for (let i = 0; i <= n - len; i++) {
//       const j = i + len - 1;

//       // Advance the mid[i] pointer while 2 * sum(i, mid[i]) < sum(i, j)
//       // It helps establish our boundary mathematically where splits transition
//       while (
//         2 * (prefixSum[mid[i] + 1] - prefixSum[i]) <
//         prefixSum[j + 1] - prefixSum[i]
//       ) {
//         mid[i]++;
//       }

//       const m = mid[i];
//       let max = 0;

//       // For split values (k < m) where Left Sum < Right Sum => Bob throws Right
//       if (m - 1 >= i) {
//         const val = maxL[i * n + (m - 1)];
//         if (val > max) max = val;
//       }

//       const sumL = prefixSum[m + 1] - prefixSum[i];
//       const sumR = prefixSum[j + 1] - prefixSum[m + 1];

//       // For split values (k >= m) where Left Sum >= Right Sum
//       if (sumL === sumR) {
//         const valL = maxL[i * n + m];
//         if (valL > max) max = valL;

//         if (m + 1 <= j) {
//           const valR = maxR[(m + 1) * n + j];
//           if (valR > max) max = valR;
//         }
//       } else {
//         if (m + 1 <= j) {
//           const valR = maxR[(m + 1) * n + j];
//           if (valR > max) max = valR;
//         }
//       }

//       const idx = i * n + j;
//       dp[idx] = max;

//       // Re-update our running DP state references for larger segment comparisons later
//       const totalSum = prefixSum[j + 1] - prefixSum[i];

//       const lPrev = maxL[i * n + (j - 1)];
//       const lCur = max + totalSum;
//       maxL[idx] = lPrev > lCur ? lPrev : lCur;

//       const rPrev = maxR[(i + 1) * n + j];
//       const rCur = max + totalSum;
//       maxR[idx] = rPrev > rCur ? rPrev : rCur;
//     }
//   }

//   return dp[n - 1]; // Answer at dp[0][n - 1]
// }

// Approach: 1D Array Compression (Half Matrix) and dp array is completely omitted
// function stoneGameV(stoneValue: number[]): number {
//   const n = stoneValue.length;
//   if (n <= 1) return 0;

//   // Prefix sum to find range sum in O(1) time
//   const prefixSum = new Int32Array(n + 1);
//   for (let i = 0; i < n; i++) {
//     prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
//   }

//   // To reduce memory, use N*(N+1)/2 size array (Upper Triangular Matrix) instead of N*N
//   const size = (n * (n + 1)) >> 1;
//   const maxL = new Int32Array(size);
//   const maxR = new Int32Array(size);
//   const mid = new Int32Array(n);

//   // We are pre-calculating the rowOffset to map the 2D index (i, j) to 1D
//   const rowOffset = new Int32Array(n);
//   for (let i = 0; i < n; i++) {
//     rowOffset[i] = i * n - ((i - 1) * i) / 2 - i;

//     mid[i] = i;
//     const idx = rowOffset[i] + i;
//     maxL[idx] = stoneValue[i];
//     maxR[idx] = stoneValue[i];
//   }

//   let ans = 0; // To store the final answer

//   for (let len = 2; len <= n; len++) {
//     for (let i = 0; i <= n - len; i++) {
//       const j = i + len - 1;

//       // Updating the mid[i] pointer
//       while (
//         2 * (prefixSum[mid[i] + 1] - prefixSum[i]) <
//         prefixSum[j + 1] - prefixSum[i]
//       ) {
//         mid[i]++;
//       }

//       const m = mid[i];
//       let max = 0;

//       // Left Sum < Right Sum (Bob will discard the right side)
//       if (m - 1 >= i) {
//         const val = maxL[rowOffset[i] + (m - 1)];
//         if (val > max) max = val;
//       }

//       const sumL = prefixSum[m + 1] - prefixSum[i];
//       const sumR = prefixSum[j + 1] - prefixSum[m + 1];

//       // Left Sum == Right Sum (Alice will make the decision)
//       if (sumL === sumR) {
//         const valL = maxL[rowOffset[i] + m];
//         if (valL > max) max = valL;

//         if (m + 1 <= j) {
//           const valR = maxR[rowOffset[m + 1] + j];
//           if (valR > max) max = valR;
//         }
//       }
//       // Left Sum > Right Sum (Bob will discard the left side)
//       else {
//         if (m + 1 <= j) {
//           const valR = maxR[rowOffset[m + 1] + j];
//           if (valR > max) max = valR;
//         }
//       }

//       // Left Sum > Right Sum (Bob will discard the left side)
//       if (len === n) {
//         ans = max;
//       }

//       // Keep maxL and maxR updated for the next large range calculation
//       const idx = rowOffset[i] + j;
//       const totalSum = prefixSum[j + 1] - prefixSum[i];

//       const lPrev = maxL[rowOffset[i] + (j - 1)];
//       const lCur = max + totalSum;
//       maxL[idx] = lPrev > lCur ? lPrev : lCur;

//       const rPrev = maxR[rowOffset[i + 1] + j];
//       const rCur = max + totalSum;
//       maxR[idx] = rPrev > rCur ? rPrev : rCur;
//     }
//   }

//   return ans;
// }

// Approach: No Garbage Collection and Flat Indexing
// Global memory allocation (will take memory only once for all test cases)
// Maximum size of N is given as 500
const MAX_N = 500;
const prefixSum = new Int32Array(MAX_N + 1);
const maxL = new Int32Array(MAX_N * MAX_N);
const maxR = new Int32Array(MAX_N * MAX_N);
const mid = new Int32Array(MAX_N);

function stoneGameV(stoneValue: number[]): number {
  const n = stoneValue.length;
  if (n <= 1) return 0;

  // 1. Updating the prefix sum
  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + stoneValue[i];
  }

  // 2. Base case initialization
  for (let i = 0; i < n; i++) {
    mid[i] = i;
    const idx = i * n + i;
    maxL[idx] = stoneValue[i];
    maxR[idx] = stoneValue[i];
  }

  let ans = 0;

  // 3. Dynamic Programming Loop
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;

      // Updating the mid[i] pointer
      while (
        2 * (prefixSum[mid[i] + 1] - prefixSum[i]) <
        prefixSum[j + 1] - prefixSum[i]
      ) {
        mid[i]++;
      }

      const m = mid[i];
      let max = 0;

      // Left Sum < Right Sum
      if (m - 1 >= i) {
        const val = maxL[i * n + (m - 1)];
        if (val > max) max = val;
      }

      const sumL = prefixSum[m + 1] - prefixSum[i];
      const sumR = prefixSum[j + 1] - prefixSum[m + 1];

      // Left Sum == Right Sum
      if (sumL === sumR) {
        const valL = maxL[i * n + m];
        if (valL > max) max = valL;

        if (m + 1 <= j) {
          const valR = maxR[(m + 1) * n + j];
          if (valR > max) max = valR;
        }
      }
      // Left Sum > Right Sum
      else {
        if (m + 1 <= j) {
          const valR = maxR[(m + 1) * n + j];
          if (valR > max) max = valR;
        }
      }

      if (len === n) {
        ans = max;
      }

      // Update maxL and maxR for the next step
      const idx = i * n + j;
      const totalSum = prefixSum[j + 1] - prefixSum[i];

      const lPrev = maxL[i * n + (j - 1)];
      const lCur = max + totalSum;
      maxL[idx] = lPrev > lCur ? lPrev : lCur;

      const rPrev = maxR[(i + 1) * n + j];
      const rCur = max + totalSum;
      maxR[idx] = rPrev > rCur ? rPrev : rCur;
    }
  }

  return ans;
}

// Example usage:
console.log(stoneGameV([6, 2, 3, 4, 5, 5])); // Output: 18
console.log(stoneGameV([7, 7, 7, 7, 7, 7, 7])); // Output: 28
console.log(stoneGameV([4])); // Output: 0
