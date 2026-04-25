// 3464. Maximize the Distance Between Points on a Square

/**
Example 1:

Input: side = 2, points = [[0,2],[2,0],[2,2],[0,0]], k = 4

Output: 2

Explanation:



Select all four points.

Example 2:

Input: side = 2, points = [[0,0],[1,2],[2,0],[2,2],[2,1]], k = 4

Output: 1

Explanation:



Select the points (0, 0), (2, 0), (2, 2), and (2, 1).

Example 3:

Input: side = 2, points = [[0,0],[0,1],[0,2],[1,2],[2,0],[2,2],[2,1]], k = 5

Output: 1

Explanation:



Select the points (0, 0), (0, 1), (0, 2), (1, 2), and (2, 2).
*/

function maxDistance(side: number, points: number[][], k: number): number {
  // Helper to map 2D coordinates on the square's perimeter to 1D continuous cyclic distance
  function get1D(x: number, y: number, S: number): number {
    if (y === 0) return x; // Bottom Edge
    if (x === S) return S + y; // Right Edge
    if (y === S) return 3 * S - x; // Top Edge
    if (x === 0) return 4 * S - y; // Left Edge
    return 0;
  }

  const n = points.length;
  const arr = new Float64Array(n);

  // Map all given point properties
  for (let i = 0; i < n; i++) {
    arr[i] = get1D(points[i][0], points[i][1], side);
  }

  // Sort to place them sequentially along the boundary
  arr.sort((a, b) => a - b);

  // Duplicate the mapped array to handle cyclic/wrap-around selection seamlessly
  const A = new Float64Array(2 * n);
  for (let i = 0; i < n; i++) {
    A[i] = arr[i];
    A[i + n] = arr[i] + 4 * side;
  }

  const next_idx = new Int32Array(2 * n);

  // Validation function checking if a chosen minimum perimeter distance 'd' is possible
  function check(d: number): boolean {
    let j = 0;

    // Two-pointers strictly find the next available point matching distance target.
    for (let i = 0; i < 2 * n; i++) {
      while (j < 2 * n && A[j] - A[i] < d) {
        j++;
      }
      next_idx[i] = j;
    }

    // Assert sequences to verify if 'k' validly spaced jumps wrap correctly within 1 perimeter stretch.
    for (let i = 0; i < n; i++) {
      let curr = i;
      for (let step = 0; step < k; step++) {
        curr = next_idx[curr];
        if (curr === 2 * n) break; // Reached bounds prematurely
      }

      // If taking `k` steps wrapped us within or equal to `i + n` (equivalent wrapping end point) -> Valid combination exists
      if (curr <= i + n) {
        return true;
      }
    }

    return false;
  }

  // Binary searching the answer since the maximum possible valid distance evaluates monotonously
  let l = 0;
  let r = side;
  let ans = 0;

  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    if (check(mid)) {
      ans = mid; // Mid works, so attempt finding a larger minimum target
      l = mid + 1;
    } else {
      r = mid - 1; // Mid fails, back-track distance logic target
    }
  }

  return ans;
}

// Example usage:
console.log(
  maxDistance(
    2,
    [
      [0, 2],
      [2, 0],
      [2, 2],
      [0, 0],
    ],
    4,
  ),
); // Output: 2
console.log(
  maxDistance(
    2,
    [
      [0, 0],
      [1, 2],
      [2, 0],
      [2, 2],
      [2, 1],
    ],
    4,
  ),
); // Output: 1
console.log(
  maxDistance(
    2,
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 0],
      [2, 2],
      [2, 1],
    ],
    5,
  ),
); // Output: 1
