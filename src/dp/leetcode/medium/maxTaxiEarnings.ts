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

// good solution
// const maxTaxiEarnings = function (n: number, rides: number[][]): number {
//   // dp[i] will store the max profit we can make reaching point i
//   const dp = new Array(n + 1).fill(0);

//   // Create an adjacency list where the index is the END point of a ride.
//   // Each element will store a list of rides ending at that point: { start, profit }
//   const rideMap: Array<Array<{ start: number; profit: number }>> = Array.from(
//     { length: n + 1 },
//     () => []
//   );

//   // Pre-process rides to populate rideMap
//   for (const [start, end, tip] of rides) {
//     // Earnings formula given in problem
//     const profit = end - start + tip;
//     rideMap[end].push({ start, profit });
//   }

//   // Iterate through each point from 1 to n
//   for (let i = 1; i <= n; i++) {
//     // Option 1: Carry forward the profit from the previous point (treating point i as empty)
//     dp[i] = dp[i - 1];

//     // Option 2: Check if any rides end at current point i
//     // If so, calculate if taking that ride yields more money than Option 1
//     for (const ride of rideMap[i]) {
//       const currentRideProfit = dp[ride.start] + ride.profit;
//       if (currentRideProfit > dp[i]) {
//         dp[i] = currentRideProfit;
//       }
//     }
//   }

//   return dp[n];
// };

// better solution
// const maxTaxiEarnings = function (n: number, rides: number[][]): number {
//   // 1. Sort rides by their end point.
//   // This allows us to process rides in order without creating a heavy Map/Adjacency list.
//   // Time: O(M log M)
//   rides.sort((a, b) => a[1] - b[1]);

//   // 2. Use Float64Array for the DP table.
//   // It is much faster than a standard generic Array and handles large numbers safeley.
//   // dp[i] = max earnings at point i
//   const dp = new Float64Array(n + 1);

//   let rideIdx = 0;
//   const m = rides.length;

//   // 3. Iterate linearly from point 1 to n.
//   // Time: O(N)
//   for (let i = 1; i <= n; i++) {
//     // Default strategy: The max profit at 'i' is at least the same as 'i-1'
//     // (carrying over earnings if we drop no one off here)
//     dp[i] = dp[i - 1];

//     // Process all rides that end exactly at point 'i'
//     while (rideIdx < m && rides[rideIdx][1] === i) {
//       // Direct access is faster than destructuring in tight loops
//       // ride = [start, end, tip]
//       const start = rides[rideIdx][0];
//       const tip = rides[rideIdx][2];

//       // Calculate profit: (end - start + tip) + dp[start]
//       // Note: rides[rideIdx][1] is equal to 'i' here
//       const earn = i - start + tip + dp[start];

//       if (earn > dp[i]) {
//         dp[i] = earn;
//       }

//       rideIdx++;
//     }
//   }

//   return dp[n];
// };

// best solution
const maxTaxiEarnings = function (n: number, rides: number[][]): number {
  // 1. Allocate Typed Arrays
  // 'dp' stores max earnings at point i. Float64 is required as earnings can exceed 2^31.
  const dp = new Float64Array(n + 1);

  // 'head' and 'next' form a Linked List in array format.
  // head[i] stores the index of the first ride ending at point i.
  const head = new Int32Array(n + 1).fill(-1);

  const m = rides.length;
  // next[r] stores the index of the next ride ending at the same point as ride r.
  const next = new Int32Array(m);

  // Store ride data in flat arrays for fast access (avoids accessing the 2D rides array repeatedly)
  const starts = new Int32Array(m);
  const profits = new Int32Array(m);

  // 2. Build the Graph (Adjacency List) - O(M)
  for (let i = 0; i < m; i++) {
    // Direct access to the input array
    const s = rides[i][0];
    const e = rides[i][1];
    const t = rides[i][2];

    // Store properties flatly
    starts[i] = s;
    profits[i] = e - s + t;

    // Link the ride into the list for destination 'e'
    // This effectively groups rides by end point without sorting.
    next[i] = head[e];
    head[e] = i;
  }

  // 3. Compute DP - O(N)
  for (let i = 1; i <= n; i++) {
    // Carry forward the max profit from the previous point
    dp[i] = dp[i - 1];

    // Process all rides that end exactly at point 'i'
    let rideIdx = head[i];
    while (rideIdx !== -1) {
      // Calculate potential profit: (Max profit at ride start) + (Ride profit)
      const currentProfit = dp[starts[rideIdx]] + profits[rideIdx];

      if (currentProfit > dp[i]) {
        dp[i] = currentProfit;
      }

      // Move to the next ride ending at 'i'
      rideIdx = next[rideIdx];
    }
  }

  return dp[n];
};
console.log(maxTaxiEarnings(n, rides));
