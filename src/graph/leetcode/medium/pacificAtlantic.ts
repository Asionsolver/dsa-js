// 417. Pacific Atlantic Water Flow

/**
Example 1:


Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
Example 2:

Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
*/

const heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
];

// best solution but it takes 18ms run time
// const pacificAtlantic = function (heights: number[][]): number[][] {
//   if (!heights || heights.length === 0 || heights[0].length === 0) {
//     return [];
//   }

//   const m = heights.length;
//   const n = heights[0].length;

//   // These matrices track if a specific cell can reach the respective ocean
//   const pacificReachable: boolean[][] = Array.from({ length: m }, () =>
//     new Array(n).fill(false)
//   );
//   const atlanticReachable: boolean[][] = Array.from({ length: m }, () =>
//     new Array(n).fill(false)
//   );

//   // Directions for moving: [row_offset, col_offset] -> Right, Left, Down, Up
//   const directions = [
//     [0, 1],
//     [0, -1],
//     [1, 0],
//     [-1, 0],
//   ];

//   const dfs = (
//     row: number,
//     col: number,
//     visited: boolean[][],
//     prevHeight: number
//   ) => {
//     // 1. Check bounds
//     // 2. Check if already visited
//     // 3. Check height condition: Water flows High -> Low.
//     //    Since we are going backwards from Ocean -> Inland,
//     //    we need current cell height >= previous cell height.
//     if (
//       row < 0 ||
//       row >= m ||
//       col < 0 ||
//       col >= n ||
//       visited[row][col] ||
//       heights[row][col] < prevHeight
//     ) {
//       return;
//     }

//     // Mark as visited (reachable from the specific ocean)
//     visited[row][col] = true;

//     // Explore neighbors
//     for (const [dr, dc] of directions) {
//       dfs(row + dr, col + dc, visited, heights[row][col]);
//     }
//   };

//   // 1. Run DFS from Left (Pacific) and Right (Atlantic) borders
//   for (let r = 0; r < m; r++) {
//     dfs(r, 0, pacificReachable, heights[r][0]);
//     dfs(r, n - 1, atlanticReachable, heights[r][n - 1]);
//   }

//   // 2. Run DFS from Top (Pacific) and Bottom (Atlantic) borders
//   for (let c = 0; c < n; c++) {
//     dfs(0, c, pacificReachable, heights[0][c]);
//     dfs(m - 1, c, atlanticReachable, heights[m - 1][c]);
//   }

//   // 3. Find intersection of cells reachable by both oceans
//   const result: number[][] = [];
//   for (let r = 0; r < m; r++) {
//     for (let c = 0; c < n; c++) {
//       if (pacificReachable[r][c] && atlanticReachable[r][c]) {
//         result.push([r, c]);
//       }
//     }
//   }

//   return result;
// };

// best and optimal solution. It takes 5ms run time
const pacificAtlantic = function (heights: number[][]): number[][] {
  const rows = heights.length;
  const cols = heights[0].length;

  // Single flat array for visited state.
  // Bit 1 (1) = Reachable from Pacific
  // Bit 2 (2) = Reachable from Atlantic
  const state = new Uint8Array(rows * cols);
  const result: number[][] = [];

  // --- Pacific DFS ---
  const dfsPacific = (r: number, c: number) => {
    // Mark as reachable from Pacific (Bit 1)
    state[r * cols + c] |= 1;

    const h = heights[r][c];

    // Check 4 directions.
    // We inline checks to avoid function call overhead if unnecessary.

    // Up
    if (r > 0) {
      const nr = r - 1;
      const nidx = nr * cols + c;
      // Visit if not already visited by Pacific AND height condition met
      if ((state[nidx] & 1) === 0 && heights[nr][c] >= h) {
        dfsPacific(nr, c);
      }
    }
    // Down
    if (r < rows - 1) {
      const nr = r + 1;
      const nidx = nr * cols + c;
      if ((state[nidx] & 1) === 0 && heights[nr][c] >= h) {
        dfsPacific(nr, c);
      }
    }
    // Left
    if (c > 0) {
      const nc = c - 1;
      const nidx = r * cols + nc;
      if ((state[nidx] & 1) === 0 && heights[r][nc] >= h) {
        dfsPacific(r, nc);
      }
    }
    // Right
    if (c < cols - 1) {
      const nc = c + 1;
      const nidx = r * cols + nc;
      if ((state[nidx] & 1) === 0 && heights[r][nc] >= h) {
        dfsPacific(r, nc);
      }
    }
  };

  // --- Atlantic DFS ---
  const dfsAtlantic = (r: number, c: number) => {
    const idx = r * cols + c;
    // Mark as reachable from Atlantic (Bit 2)
    state[idx] |= 2;

    // Optimization: Result Collection
    // If this cell was ALREADY reachable by Pacific (Bit 1 is set),
    // and we just reached it from Atlantic, it's a valid result.
    if ((state[idx] & 1) === 1) {
      result.push([r, c]);
    }

    const h = heights[r][c];

    // Up
    if (r > 0) {
      const nr = r - 1;
      const nidx = nr * cols + c;
      // Visit if not already visited by Atlantic AND height condition met
      if ((state[nidx] & 2) === 0 && heights[nr][c] >= h) {
        dfsAtlantic(nr, c);
      }
    }
    // Down
    if (r < rows - 1) {
      const nr = r + 1;
      const nidx = nr * cols + c;
      if ((state[nidx] & 2) === 0 && heights[nr][c] >= h) {
        dfsAtlantic(nr, c);
      }
    }
    // Left
    if (c > 0) {
      const nc = c - 1;
      const nidx = r * cols + nc;
      if ((state[nidx] & 2) === 0 && heights[r][nc] >= h) {
        dfsAtlantic(r, nc);
      }
    }
    // Right
    if (c < cols - 1) {
      const nc = c + 1;
      const nidx = r * cols + nc;
      if ((state[nidx] & 2) === 0 && heights[r][nc] >= h) {
        dfsAtlantic(r, nc);
      }
    }
  };

  // 1. Run Pacific Flow (Top Row & Left Col)
  // We check (state & 1) === 0 before calling to avoid redundant root calls
  for (let c = 0; c < cols; c++) {
    if ((state[c] & 1) === 0) dfsPacific(0, c);
  }
  for (let r = 0; r < rows; r++) {
    if ((state[r * cols] & 1) === 0) dfsPacific(r, 0);
  }

  // 2. Run Atlantic Flow (Bottom Row & Right Col)
  // We check (state & 2) === 0 before calling
  for (let c = 0; c < cols; c++) {
    const r = rows - 1;
    if ((state[r * cols + c] & 2) === 0) dfsAtlantic(r, c);
  }
  for (let r = 0; r < rows; r++) {
    const c = cols - 1;
    if ((state[r * cols + c] & 2) === 0) dfsAtlantic(r, c);
  }

  return result;
};
console.log(pacificAtlantic(heights));
