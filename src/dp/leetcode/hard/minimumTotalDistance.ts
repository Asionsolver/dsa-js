//2463. Minimum Total Distance Traveled
/**
Example 1:


Input: robot = [0,4,6], factory = [[2,2],[6,2]]
Output: 4
Explanation: As shown in the figure:
- The first robot at position 0 moves in the positive direction. It will be repaired at the first factory.
- The second robot at position 4 moves in the negative direction. It will be repaired at the first factory.
- The third robot at position 6 will be repaired at the second factory. It does not need to move.
The limit of the first factory is 2, and it fixed 2 robots.
The limit of the second factory is 2, and it fixed 1 robot.
The total distance is |2 - 0| + |2 - 4| + |6 - 6| = 4. It can be shown that we cannot achieve a better total distance than 4.
Example 2:


Input: robot = [1,-1], factory = [[-2,1],[2,1]]
Output: 2
Explanation: As shown in the figure:
- The first robot at position 1 moves in the positive direction. It will be repaired at the second factory.
- The second robot at position -1 moves in the negative direction. It will be repaired at the first factory.
The limit of the first factory is 1, and it fixed 1 robot.
The limit of the second factory is 1, and it fixed 1 robot.
The total distance is |2 - 1| + |(-2) - (-1)| = 2. It can be shown that we cannot achieve a better total distance than 2.
*/

const robot = [0, 4, 6],
  factory = [
    [2, 2],
    [6, 2],
  ];
function minimumTotalDistance(robot: number[], factory: number[][]): number {
  // Sort robots and factories by their positions
  robot.sort((a, b) => a - b);
  factory.sort((a, b) => a[0] - b[0]);

  const n = robot.length;
  const m = factory.length;

  // dp[i] holds the minimum distance to repair the first i robots
  let dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0; // 0 distance to repair 0 robots

  // Process each factory sequentially
  for (let j = 1; j <= m; j++) {
    const [pos, limit] = factory[j - 1];

    // Use a new array for the current factory's iterations
    const nextDp = [...dp];

    // Evaluate for every number of robots up to `n`
    for (let i = 1; i <= n; i++) {
      let currentCost = 0;

      // Try assigning `k` robots to the current factory (from 1 up to its limit)
      for (let k = 1; k <= limit && i - k >= 0; k++) {
        // Accumulate the distance for assigning the (i-k)-th robot to this factory
        currentCost += Math.abs(robot[i - k] - pos);

        // If it is possible to repair the first `i-k` robots with previous factories
        if (dp[i - k] !== Infinity) {
          nextDp[i] = Math.min(nextDp[i], dp[i - k] + currentCost);
        }
      }
    }

    // Store the state for the next factory iteration
    dp = nextDp;
  }

  return dp[n];
}

console.log(minimumTotalDistance(robot, factory));
