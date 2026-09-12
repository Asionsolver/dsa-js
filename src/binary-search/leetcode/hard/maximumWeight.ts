// 3414. Maximum Score of Non-overlapping Intervals

/**
You are given a 2D integer array intervals, where intervals[i] = [li, ri, weighti]. Interval i starts at position li and ends at ri, and has a weight of weighti. You can choose up to 4 non-overlapping intervals. The score of the chosen intervals is defined as the total sum of their weights.

Return the lexicographically smallest array of at most 4 indices from intervals with maximum score, representing your choice of non-overlapping intervals.

Two intervals are said to be non-overlapping if they do not share any points. In particular, intervals sharing a left or right boundary are considered overlapping.
*/

/**

Example 1:

Input: intervals = [[1,3,2],[4,5,2],[1,5,5],[6,9,3],[6,7,1],[8,9,1]]

Output: [2,3]

Explanation:

You can choose the intervals with indices 2, and 3 with respective weights of 5, and 3.

Example 2:

Input: intervals = [[5,8,1],[6,7,7],[4,7,3],[9,10,6],[7,8,2],[11,14,3],[3,5,5]]

Output: [1,3,5,6]

Explanation:

You can choose the intervals with indices 1, 3, 5, and 6 with respective weights of 7, 6, 3, and 5.
*/

/**
Constraints:

1 <= intevals.length <= 5 * 104
intervals[i].length == 3
intervals[i] = [li, ri, weighti]
1 <= li <= ri <= 109
1 <= weighti <= 109

*/

// Brute-force backtracking solution to find the maximum weight of non-overlapping intervals.
// function maximumWeight(intervals: number[][]): number[] {
//   const n = intervals.length;
//   let maxWeight = -1;
//   let bestIndices: number[] = [];

//   // Helper to check if two intervals overlap.
//   function isOverlapping(i: number, j: number): boolean {
//     const [l1, r1] = intervals[i];
//     const [l2, r2] = intervals[j];
//     // Overlapping occurs if they share any point, even boundary.
//     return !(r1 < l2 || r2 < l1);
//   }

//   // Recursive backtracking to check all combinations up to size 4.
//   function backtrack(
//     startIdx: number,
//     chosen: number[],
//     currentWeight: number,
//   ): void {
//     if (chosen.length > 0) {
//       if (currentWeight > maxWeight) {
//         maxWeight = currentWeight;
//         bestIndices = [...chosen];
//       } else if (currentWeight === maxWeight) {
//         // Compare lexicographically when weights are equal.
//         const minLen = Math.min(chosen.length, bestIndices.length);
//         let smaller = false;
//         let different = false;
//         for (let i = 0; i < minLen; i++) {
//           if (chosen[i] !== bestIndices[i]) {
//             smaller = chosen[i] < bestIndices[i];
//             different = true;
//             break;
//           }
//         }
//         if (!different && chosen.length < bestIndices.length) smaller = true;
//         if (smaller) {
//           bestIndices = [...chosen];
//         }
//       }
//     }

//     if (chosen.length === 4) return;

//     for (let i = startIdx; i < n; i++) {
//       let canPick = true;
//       for (const prev of chosen) {
//         if (isOverlapping(prev, i)) {
//           canPick = false;
//           break;
//         }
//       }

//       if (canPick) {
//         chosen.push(i);
//         backtrack(i + 1, chosen, currentWeight + intervals[i][2]);
//         chosen.pop();
//       }
//     }
//   }

//   backtrack(0, [], 0);
//   return bestIndices;
// }

interface DPState {
  weight: number;
  indices: number[];
}

function maximumWeight(intervals: number[][]): number[] {
  const n = intervals.length;

  // Augment each interval with its original index: [start, end, weight, originalIndex]
  const intervalsWithIndex: [number, number, number, number][] = intervals.map(
    (interval, idx) => [interval[0], interval[1], interval[2], idx],
  );

  // Sort intervals primarily by end time ascending.
  intervalsWithIndex.sort((a, b) => a[1] - b[1] || a[0] - b[0] || a[3] - b[3]);

  // dp[i][k] represents the best state using first i intervals with exactly k intervals chosen.
  const dp: DPState[][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: 5 }, () => ({ weight: -Infinity, indices: [] })),
  );

  // Base case: choosing 0 intervals results in 0 weight and empty indices.
  for (let i = 0; i <= n; i++) {
    dp[i][0] = { weight: 0, indices: [] };
  }

  // Helper function to check if candidate (weightA, indicesA) is strictly better than (weightB, indicesB).
  function isBetter(
    weightA: number,
    indicesA: number[],
    weightB: number,
    indicesB: number[],
  ): boolean {
    if (weightA !== weightB) {
      return weightA > weightB;
    }
    const minLen = Math.min(indicesA.length, indicesB.length);
    for (let i = 0; i < minLen; i++) {
      if (indicesA[i] !== indicesB[i]) {
        return indicesA[i] < indicesB[i];
      }
    }
    return indicesA.length < indicesB.length;
  }

  for (let i = 1; i <= n; i++) {
    const curr = intervalsWithIndex[i - 1];
    const currStart = curr[0];
    const currWeight = curr[2];
    const currIndex = curr[3];

    // Binary search for the latest interval strictly ending before currStart (end time < currStart).
    let low = 0;
    let high = i - 2;
    let best = -1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (intervalsWithIndex[mid][1] < currStart) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const p = best + 1; // 1-based index in the DP table

    for (let k = 1; k <= 4; k++) {
      // Option 1: Do not pick the current interval.
      dp[i][k] = dp[i - 1][k];

      // Option 2: Pick the current interval (if prior state with k-1 intervals is valid).
      if (dp[p][k - 1].weight >= 0) {
        const candidateWeight = dp[p][k - 1].weight + currWeight;

        // If candidate weight is strictly greater, update directly.
        if (candidateWeight > dp[i][k].weight) {
          const newIndices = [...dp[p][k - 1].indices, currIndex].sort(
            (a, b) => a - b,
          );
          dp[i][k] = { weight: candidateWeight, indices: newIndices };
        } else if (candidateWeight === dp[i][k].weight) {
          // If weights are equal, compare lexicographically.
          const newIndices = [...dp[p][k - 1].indices, currIndex].sort(
            (a, b) => a - b,
          );
          if (
            isBetter(
              candidateWeight,
              newIndices,
              dp[i][k].weight,
              dp[i][k].indices,
            )
          ) {
            dp[i][k] = { weight: candidateWeight, indices: newIndices };
          }
        }
      }
    }
  }

  // Find the overall best result across all counts k from 1 to 4.
  let bestResult: DPState = { weight: -1, indices: [] };

  for (let k = 1; k <= 4; k++) {
    if (dp[n][k].weight >= 0) {
      if (
        isBetter(
          dp[n][k].weight,
          dp[n][k].indices,
          bestResult.weight,
          bestResult.indices,
        )
      ) {
        bestResult = dp[n][k];
      }
    }
  }

  return bestResult.indices;
}
// Example usage:
const intervals1 = [
  [1, 3, 2],
  [4, 5, 2],
  [1, 5, 5],
  [6, 9, 3],
  [6, 7, 1],
  [8, 9, 1],
];
console.log(maximumWeight(intervals1)); // Output: [2, 3]

const intervals2 = [
  [5, 8, 1],
  [6, 7, 7],
  [4, 7, 3],
  [9, 10, 6],
  [7, 8, 2],
  [11, 14, 3],
  [3, 5, 5],
];
console.log(maximumWeight(intervals2)); // Output: [1, 3, 5, 6]
