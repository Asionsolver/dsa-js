// 1559. Detect Cycles in 2D Grid

/**
Example 1:



Input: grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]
Output: true
Explanation: There are two valid cycles shown in different colors in the image below:

Example 2:



Input: grid = [["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]
Output: true
Explanation: There is only one valid cycle highlighted in the image below:

Example 3:



Input: grid = [["a","b","b"],["b","z","b"],["b","b","a"]]
Output: false

*/

function containsCycle(grid: string[][]): boolean {
  const m = grid.length;
  if (m === 0) return false;
  const n = grid[0].length;
  if (n === 0) return false;

  // 1D flat array mapping to the 2D grid (0: unvisited, 1: visited)
  // Uint8Array is highly memory efficient.
  const visited = new Uint8Array(m * n);

  // Direction combinations: Right, Down, Left, Up
  const dR = [0, 1, 0, -1];
  const dC = [1, 0, -1, 0];

  // Pre-allocate TypedArrays for the BFS Queue to prevent continuous object creation
  // The maximum possible size of a single component is m * n.
  const maxNodes = m * n;
  const qR = new Int16Array(maxNodes); // Row Queue
  const qC = new Int16Array(maxNodes); // Col Queue
  const qPR = new Int16Array(maxNodes); // Parent Row Queue
  const qPC = new Int16Array(maxNodes); // Parent Col Queue

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const flatIndex = i * n + j;

      // If the cell hasn't been explored, launch a BFS to map its component
      if (visited[flatIndex] === 0) {
        const char = grid[i][j];
        let head = 0;
        let tail = 0;

        // Push initial starting cell into our queue
        qR[tail] = i;
        qC[tail] = j;
        qPR[tail] = -1; // -1 represents no parent
        qPC[tail] = -1;
        tail++;

        visited[flatIndex] = 1;

        while (head < tail) {
          const cr = qR[head];
          const cc = qC[head];
          const pr = qPR[head];
          const pc = qPC[head];
          head++; // Move queue head

          // Explore all 4 adjacent directions
          for (let d = 0; d < 4; d++) {
            const nr = cr + dR[d];
            const nc = cc + dC[d];

            // Ensure neighbor is within grid bounds and shares the same character
            if (
              nr >= 0 &&
              nr < m &&
              nc >= 0 &&
              nc < n &&
              grid[nr][nc] === char
            ) {
              // Skip the exact parent cell we originated from
              if (nr === pr && nc === pc) continue;

              const nextFlatIndex = nr * n + nc;

              // If a valid non-parent cell is already visited, a cycle exists
              if (visited[nextFlatIndex] === 1) return true;

              // Otherwise mark visited and enqueue it
              visited[nextFlatIndex] = 1;
              qR[tail] = nr;
              qC[tail] = nc;
              qPR[tail] = cr;
              qPC[tail] = cc;
              tail++;
            }
          }
        }
      }
    }
  }

  // Completely traversed and no cycles found
  return false;
}

// Example test cases
console.log(
  containsCycle([
    ["a", "a", "a", "a"],
    ["a", "b", "b", "a"],
    ["a", "b", "b", "a"],
    ["a", "a", "a", "a"],
  ]),
); // true

console.log(
  containsCycle([
    ["c", "c", "c", "a"],
    ["c", "d", "c", "c"],
    ["c", "c", "e", "c"],
    ["f", "c", "c", "c"],
  ]),
); // true

console.log(
  containsCycle([
    ["a", "b", "b"],
    ["b", "z", "b"],
    ["b", "b", "a"],
  ]),
); // false
