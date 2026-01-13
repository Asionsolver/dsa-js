// 778. Swim in Rising Water

/**
Example 1:


Input: grid = [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.
Example 2:


Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation: The final route is shown.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
*/

const grid = [
  [0, 2],
  [1, 3],
];

const swimInWater = function (grid: number[][]): number {
  const n = grid.length;

  // The answer cannot be less than the starting or ending position's elevation
  let left = Math.max(grid[0][0], grid[n - 1][n - 1]);
  let right = n * n - 1;
  let result = right;

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // Helper function: Can we reach bottom-right given water level 't'?
  const canReach = (t: number): boolean => {
    // Use Uint8Array for a slightly more memory-efficient visited matrix
    const visited = Array.from({ length: n }, () => new Uint8Array(n));
    const queue: [number, number][] = [];

    // Start BFS
    queue.push([0, 0]);
    visited[0][0] = 1;

    // Use a pointer for the queue head to avoid O(n) shift operations
    let head = 0;

    while (head < queue.length) {
      const [r, c] = queue[head++];

      // If we reached the target
      if (r === n - 1 && c === n - 1) {
        return true;
      }

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        // Check bounds
        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
          // Check if not visited AND elevation is reachable at time t
          if (visited[nr][nc] === 0 && grid[nr][nc] <= t) {
            visited[nr][nc] = 1;
            queue.push([nr, nc]);
          }
        }
      }
    }
    return false;
  };

  // Binary Search
  while (left <= right) {
    // Bitwise shift for integer division (floor)
    const mid = (left + right) >>> 1;

    if (canReach(mid)) {
      // If possible, try a smaller time
      result = mid;
      right = mid - 1;
    } else {
      // If impossible, we need more time
      left = mid + 1;
    }
  }

  return result;
};

console.log(swimInWater(grid));
