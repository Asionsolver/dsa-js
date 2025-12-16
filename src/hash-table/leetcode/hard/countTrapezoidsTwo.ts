// 3625. Count Number of Trapezoids II

/**
Example 1:

Input: points = [[-3,2],[3,0],[2,3],[3,2],[2,-3]]

Output: 2

Explanation:



There are two distinct ways to pick four points that form a trapezoid:

The points [-3,2], [2,3], [3,2], [2,-3] form one trapezoid.
The points [2,3], [3,2], [3,0], [2,-3] form another trapezoid.
Example 2:

Input: points = [[0,0],[1,0],[0,1],[2,1]]

Output: 1

Explanation:



There is only one trapezoid which can be formed.
*/

const points = [
  [-3, 2],
  [3, 0],
  [2, 3],
  [3, 2],
  [2, -3],
];

const countTrapezoids = function (points: number[][]) {
  const n = points.length;
  if (n < 4) return 0;

  // Helper to compute GCD
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  // Data structure to hold line counts
  // Map<Key, Map<Intercept, Count>>
  const slopes = new Map<string, Map<number, number>>();
  const vectors = new Map<string, Map<number, number>>();

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const x1 = points[i][0],
        y1 = points[i][1];
      const x2 = points[j][0],
        y2 = points[j][1];

      let dx = x2 - x1;
      let dy = y2 - y1;

      // --- Process Vector Grouping (for Parallelograms) ---
      // Normalize direction to ensure (dx, dy) is canonical
      // We want distinct segments with same length and slope to group together.
      // (-1, -1) should be same group as (1, 1).
      let v_dx = dx;
      let v_dy = dy;
      if (v_dx < 0 || (v_dx === 0 && v_dy < 0)) {
        v_dx = -v_dx;
        v_dy = -v_dy;
      }
      const vecKey = `${v_dx},${v_dy}`;

      // Intercept for vector context
      // Cross product of vector from origin to point with the direction vector
      // This identifies the specific line the segment lies on.
      // val = v_dx * y - v_dy * x
      const vecIntercept = v_dx * y1 - v_dy * x1;

      if (!vectors.has(vecKey)) {
        vectors.set(vecKey, new Map());
      }
      const vecGroup = vectors.get(vecKey)!;
      vecGroup.set(vecIntercept, (vecGroup.get(vecIntercept) || 0) + 1);

      // --- Process Slope Grouping (for All Trapezoids) ---
      // Reduce fraction for slope
      const g = Math.abs(gcd(dx, dy));
      let s_dx = dx / g;
      let s_dy = dy / g;

      // Normalize direction
      if (s_dx < 0 || (s_dx === 0 && s_dy < 0)) {
        s_dx = -s_dx;
        s_dy = -s_dy;
      }
      const slopeKey = `${s_dx},${s_dy}`;

      // Intercept using reduced slope
      const slopeIntercept = s_dx * y1 - s_dy * x1;

      if (!slopes.has(slopeKey)) {
        slopes.set(slopeKey, new Map());
      }
      const slopeGroup = slopes.get(slopeKey)!;
      slopeGroup.set(slopeIntercept, (slopeGroup.get(slopeIntercept) || 0) + 1);
    }
  }

  // Function to calculate sum of products of counts from distinct lines
  const calculatePairs = (groups: Map<string, Map<number, number>>): number => {
    let count = 0;
    for (const lines of groups.values()) {
      // lines is Map<Intercept, Count>
      const counts = Array.from(lines.values());
      // We need sum of (count[i] * count[j]) for all i < j
      // This can be optimized: sum(A[i] * A[j]) = ( (sum(A))^2 - sum(A^2) ) / 2
      let sum = 0;
      let sumSq = 0;
      for (const c of counts) {
        sum += c;
        sumSq += c * c;
      }
      count += (sum * sum - sumSq) / 2;
    }
    return count;
  };

  const totalSlopePairs = calculatePairs(slopes);
  const totalVectorPairs = calculatePairs(vectors);

  // totalSlopePairs counts parallelograms twice, trapezoids once.
  // totalVectorPairs counts parallelograms twice.
  // Parallelograms = totalVectorPairs / 2.
  // Trapezoids = totalSlopePairs - 2 * Parallelograms.
  // Result = Trapezoids + Parallelograms = totalSlopePairs - Parallelograms.

  return totalSlopePairs - totalVectorPairs / 2;
};

console.log(countTrapezoids(points));
