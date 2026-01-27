// 1928. Minimum Cost to Reach Destination in Time

/**
Example 1:



Input: maxTime = 30, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]
Output: 11
Explanation: The path to take is 0 -> 1 -> 2 -> 5, which takes 30 minutes and has $11 worth of passing fees.
Example 2:



Input: maxTime = 29, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]
Output: 48
Explanation: The path to take is 0 -> 3 -> 4 -> 5, which takes 26 minutes and has $48 worth of passing fees.
You cannot take path 0 -> 1 -> 2 -> 5 since it would take too long.
Example 3:

Input: maxTime = 25, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]
Output: -1
Explanation: There is no way to reach city 5 from city 0 within 25 minutes.
*/

const maxTime = 30,
  edges = [
    [0, 1, 10],
    [1, 2, 10],
    [2, 5, 10],
    [0, 3, 1],
    [3, 4, 10],
    [4, 5, 15],
  ],
  passingFees = [5, 1, 2, 20, 20, 3];

const minCost = function (
  maxTime: number,
  edges: number[][],
  passingFees: number[],
): number {
  const n = passingFees.length;

  // dp[t][i] stores the minimum cost to reach city i in exactly t minutes
  // Initialize with Infinity to represent unreachable states
  const dp: number[][] = Array.from({ length: maxTime + 1 }, () =>
    new Array(n).fill(Infinity),
  );

  // Base case: Starting at city 0 at time 0 costs passingFees[0]
  dp[0][0] = passingFees[0];

  // Iterate through each time unit from 1 to maxTime
  for (let t = 1; t <= maxTime; t++) {
    // Iterate through all edges to see if we can perform a transition ending at time t
    for (const [u, v, time] of edges) {
      if (time <= t) {
        // Check transition from u -> v
        const prevTime = t - time;
        if (dp[prevTime][u] !== Infinity) {
          const currentCost = dp[prevTime][u] + passingFees[v];
          if (currentCost < dp[t][v]) {
            dp[t][v] = currentCost;
          }
        }

        // Check transition from v -> u (bi-directional)
        if (dp[prevTime][v] !== Infinity) {
          const currentCost = dp[prevTime][v] + passingFees[u];
          if (currentCost < dp[t][u]) {
            dp[t][u] = currentCost;
          }
        }
      }
    }
  }

  // The answer is the minimum cost to reach city n-1 within any time <= maxTime
  let minCost = Infinity;
  for (let t = 0; t <= maxTime; t++) {
    if (dp[t][n - 1] < minCost) {
      minCost = dp[t][n - 1];
    }
  }

  return minCost === Infinity ? -1 : minCost;
};

console.log(minCost(maxTime, edges, passingFees));
