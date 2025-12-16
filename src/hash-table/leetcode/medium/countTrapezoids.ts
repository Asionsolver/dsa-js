// 3623. Count Number of Trapezoids I

/**
Example 1:

Input: points = [[1,0],[2,0],[3,0],[2,2],[3,2]]

Output: 3

Explanation:



There are three distinct ways to pick four points that form a horizontal trapezoid:

Using points [1,0], [2,0], [3,2], and [2,2].
Using points [2,0], [3,0], [3,2], and [2,2].
Using points [1,0], [3,0], [3,2], and [2,2].
Example 2:

Input: points = [[0,0],[1,0],[0,1],[2,1]]

Output: 1

Explanation:



There is only one horizontal trapezoid that can be formed.
*/
const points = [
  [1, 0],
  [2, 0],
  [3, 0],
  [2, 2],
  [3, 2],
];
const countTrapezoids = function (points: number[][]) {
  // Map to store the number of points for each unique y-coordinate
  const yCounts = new Map<number, number>();

  // Count points for each y-coordinate
  // Time Complexity: O(N)
  for (const [_, y] of points) {
    yCounts.set(y, (yCounts.get(y) || 0) + 1);
  }

  const MOD = 1000000007n;
  let accumulatedSegments = 0n;
  let totalTrapezoids = 0n;

  // Iterate through the counts of points at each distinct y-level
  // Time Complexity: O(N) in worst case (all distinct y), usually less
  for (const count of yCounts.values()) {
    // We need at least 2 points at the same y-level to form a horizontal side
    if (count < 2) {
      continue;
    }

    const n = BigInt(count);

    // Calculate the number of horizontal segments at this level: C(n, 2)
    // Formula: n * (n - 1) / 2
    const segmentsAtCurrentLevel = (n * (n - 1n)) / 2n;
    const currentSegsMod = segmentsAtCurrentLevel % MOD;

    // Each segment at the current level can form a trapezoid with
    // any segment from previously processed levels.
    // Add (current_level_segments * sum_of_previous_levels_segments) to result.
    totalTrapezoids =
      (totalTrapezoids + currentSegsMod * accumulatedSegments) % MOD;

    // Add the current level's segments to the accumulator for future levels
    accumulatedSegments = (accumulatedSegments + currentSegsMod) % MOD;
  }

  return Number(totalTrapezoids);
};

console.log(countTrapezoids(points));
