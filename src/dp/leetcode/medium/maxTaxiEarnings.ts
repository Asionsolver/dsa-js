// 2008. Maximum Earnings From Taxi

/**
Example 1:

Input: n = 5, rides = [[2,5,4],[1,5,1]]
Output: 7
Explanation: We can pick up passenger 0 to earn 5 - 2 + 4 = 7 dollars.
Example 2:

Input: n = 20, rides = [[1,6,1],[3,10,2],[10,12,3],[11,12,2],[12,15,2],[13,18,1]]
Output: 20
Explanation: We will pick up the following passengers:
- Drive passenger 1 from point 3 to point 10 for a profit of 10 - 3 + 2 = 9 dollars.
- Drive passenger 2 from point 10 to point 12 for a profit of 12 - 10 + 3 = 5 dollars.
- Drive passenger 5 from point 13 to point 18 for a profit of 18 - 13 + 1 = 6 dollars.
We earn 9 + 5 + 6 = 20 dollars in total.

*/
const n = 5,
  rides = [
    [2, 5, 4],
    [1, 5, 1],
  ];
function maxTaxiEarnings(n: number, rides: number[][]): number {
  // dp[i] will store the max profit we can make reaching point i
  const dp = new Array(n + 1).fill(0);

  // Create an adjacency list where the index is the END point of a ride.
  // Each element will store a list of rides ending at that point: { start, profit }
  const rideMap: Array<Array<{ start: number; profit: number }>> = Array.from(
    { length: n + 1 },
    () => []
  );

  // Pre-process rides to populate rideMap
  for (const [start, end, tip] of rides) {
    // Earnings formula given in problem
    const profit = end - start + tip;
    rideMap[end].push({ start, profit });
  }

  // Iterate through each point from 1 to n
  for (let i = 1; i <= n; i++) {
    // Option 1: Carry forward the profit from the previous point (treating point i as empty)
    dp[i] = dp[i - 1];

    // Option 2: Check if any rides end at current point i
    // If so, calculate if taking that ride yields more money than Option 1
    for (const ride of rideMap[i]) {
      const currentRideProfit = dp[ride.start] + ride.profit;
      if (currentRideProfit > dp[i]) {
        dp[i] = currentRideProfit;
      }
    }
  }

  return dp[n];
}

console.log(maxTaxiEarnings(n, rides));
