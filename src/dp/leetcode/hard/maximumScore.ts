// 3414. Maximum Score of Non-overlapping Intervals

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

const intervals = [
  [1, 3, 2],
  [4, 5, 2],
  [1, 5, 5],
  [6, 9, 3],
  [6, 7, 1],
  [8, 9, 1],
];

function maximumScore(intervals: number[][]): number[] {
  const n = intervals.length;

  // 1. Map to object to preserve original id, then sort by start time
  const sortedIntervals = intervals
    .map((interval, index) => ({
      l: interval[0],
      r: interval[1],
      w: interval[2],
      id: index,
    }))
    .sort((a, b) => a.l - b.l);

  // 2. Precompute the next valid interval index for each interval
  // nextValid[i] is the index of the first interval that starts strictly after interval i ends
  const nextValid = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    let left = i + 1;
    let right = n;
    let res = n;
    const currentEnd = sortedIntervals[i].r;

    // Binary search
    while (left < right) {
      const mid = (left + right) >>> 1;
      if (sortedIntervals[mid].l > currentEnd) {
        res = mid;
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    nextValid[i] = res;
  }

  // Structure for DP state
  type Result = { score: number; indices: number[] };

  // 3. Initialize DP table
  // dp[i][k] = best result using exactly k intervals from suffix starting at i
  // Dimensions: (n+1) rows, 5 columns (0 to 4)
  const dp: Result[][] = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = [
      { score: 0, indices: [] }, // k=0
      { score: -1, indices: [] }, // k=1
      { score: -1, indices: [] }, // k=2
      { score: -1, indices: [] }, // k=3
      { score: -1, indices: [] }, // k=4
    ];
  }

  // Helper to compare two arrays of indices lexicographically
  const isLexicographicallySmaller = (a: number[], b: number[]): boolean => {
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) {
      if (a[i] < b[i]) return true;
      if (a[i] > b[i]) return false;
    }
    return a.length < b.length;
  };

  // 4. Fill DP table iteratively backwards
  for (let i = n - 1; i >= 0; i--) {
    for (let k = 1; k <= 4; k++) {
      // Option 1: Skip current interval
      let bestScore = dp[i + 1][k].score;
      let bestIndices = dp[i + 1][k].indices;

      // Option 2: Take current interval
      const nextIdx = nextValid[i];
      const prevRes = dp[nextIdx][k - 1];

      // Can only take if the recursive sub-problem is valid
      if (prevRes.score !== -1) {
        const currentScore = sortedIntervals[i].w + prevRes.score;

        // Compare Take vs Skip
        if (currentScore > bestScore) {
          bestScore = currentScore;
          // Construct new sorted indices array
          bestIndices = [...prevRes.indices, sortedIntervals[i].id].sort(
            (a, b) => a - b
          );
        } else if (currentScore === bestScore) {
          // Tie-breaker: Lexicographical comparison
          const currentIndices = [
            ...prevRes.indices,
            sortedIntervals[i].id,
          ].sort((a, b) => a - b);
          // If bestScore was -1 (Skip impossible), we take this one
          // Otherwise check lexicographical order
          if (
            bestScore === -1 ||
            isLexicographicallySmaller(currentIndices, bestIndices)
          ) {
            bestScore = currentScore;
            bestIndices = currentIndices;
          }
        }
      }

      dp[i][k] = { score: bestScore, indices: bestIndices };
    }
  }

  // 5. Find the best solution among choosing 1, 2, 3, or 4 intervals
  let finalRes = dp[0][1];

  for (let k = 2; k <= 4; k++) {
    const candidate = dp[0][k];

    if (candidate.score > finalRes.score) {
      finalRes = candidate;
    } else if (candidate.score === finalRes.score && candidate.score !== -1) {
      if (isLexicographicallySmaller(candidate.indices, finalRes.indices)) {
        finalRes = candidate;
      }
    }
  }

  return finalRes.indices;
}

console.log(maximumScore(intervals));
