// 3619. Count Islands With Total Value Divisible by K

/**
You are given an m x n matrix grid and a positive integer k. An island is a group of positive integers (representing land) that are 4-directionally connected (horizontally or vertically).

The total value of an island is the sum of the values of all cells in the island.

Return the number of islands with a total value divisible by k.


*/

/**
Example 1:


Input: grid = [[0,2,1,0,0],[0,5,0,0,5],[0,0,1,0,0],[0,1,4,7,0],[0,2,0,0,8]], k = 5

Output: 2

Explanation:

The grid contains four islands. The islands highlighted in blue have a total value that is divisible by 5, while the islands highlighted in red do not.

Example 2:


Input: grid = [[3,0,3,0], [0,3,0,3], [3,0,3,0]], k = 3

Output: 6

Explanation:

The grid contains six islands, each with a total value that is divisible by 3.
*/

/**
Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 1000
1 <= m * n <= 105
0 <= grid[i][j] <= 106
1 <= k <= 106
*/
// Brute Force Approach: TLE
// function countIslands(grid: number[][], k: number): number {
//   const rows = grid.length;
//   const cols = grid[0].length;
//   let divisibleIslandsCount = 0;

//   // Linear list to store coordinates of visited cells.
//   const visitedList: [number, number][] = [];

//   // Helper function that performs linear lookup in the visited list.
//   function isVisited(r: number, c: number): boolean {
//     for (let i = 0; i < visitedList.length; i++) {
//       if (visitedList[i][0] === r && visitedList[i][1] === c) {
//         return true;
//       }
//     }
//     return false;
//   }

//   const directions = [
//     [-1, 0],
//     [1, 0],
//     [0, -1],
//     [0, 1],
//   ];

//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < cols; c++) {
//       // Found an unvisited land cell.
//       if (grid[r][c] > 0 && !isVisited(r, c)) {
//         let islandSum = 0;
//         const queue: [number, number][] = [[r, c]];
//         visitedList.push([r, c]);

//         while (queue.length > 0) {
//           const [currR, currC] = queue.shift()!;
//           islandSum += grid[currR][currC];

//           for (const [dr, dc] of directions) {
//             const nextR = currR + dr;
//             const nextC = currC + dc;

//             // Check grid boundaries and land condition.
//             if (
//               nextR >= 0 &&
//               nextR < rows &&
//               nextC >= 0 &&
//               nextC < cols &&
//               grid[nextR][nextC] > 0 &&
//               !isVisited(nextR, nextC) // Inefficient O(N) lookup.
//             ) {
//               visitedList.push([nextR, nextC]);
//               queue.push([nextR, nextC]);
//             }
//           }
//         }

//         // Check if island total value is divisible by k.
//         if (islandSum % k === 0) {
//           divisibleIslandsCount++;
//         }
//       }
//     }
//   }

//   return divisibleIslandsCount;
// }

// Optimized Approach: In-place marking to avoid extra space for visited cells.
function countIslands(grid: number[][], k: number): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let divisibleIslandsCount = 0;

  // Movement vectors for 4-directional traversal: Up, Down, Left, Right.
  const directions: [number, number][] = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Check if current cell is an unvisited land cell.
      if (grid[r][c] > 0) {
        let islandSum = 0;

        // Explicit stack to perform iterative DFS and avoid Call Stack overflow.
        const stack: [number, number][] = [[r, c]];

        // Add cell value and mark as visited in-place by setting it to 0.
        islandSum += grid[r][c];
        grid[r][c] = 0;

        while (stack.length > 0) {
          const [currR, currC] = stack.pop()!;

          // Explore all 4 adjacent neighbors.
          for (const [dr, dc] of directions) {
            const nextR = currR + dr;
            const nextC = currC + dc;

            // Check boundaries and whether neighbor is unvisited land.
            if (
              nextR >= 0 &&
              nextR < rows &&
              nextC >= 0 &&
              nextC < cols &&
              grid[nextR][nextC] > 0
            ) {
              // Accumulate neighbor value.
              islandSum += grid[nextR][nextC];

              // Mark visited immediately to prevent duplicate processing.
              grid[nextR][nextC] = 0;

              stack.push([nextR, nextC]);
            }
          }
        }

        // Verify if the total sum of this island is divisible by k.
        if (islandSum % k === 0) {
          divisibleIslandsCount++;
        }
      }
    }
  }

  return divisibleIslandsCount;
}

// Example usage:
const grid1 = [
  [0, 2, 1, 0, 0],
  [0, 5, 0, 0, 5],
  [0, 0, 1, 0, 0],
  [0, 1, 4, 7, 0],
  [0, 2, 0, 0, 8],
];
const k1 = 5;
console.log(countIslands(grid1, k1)); // Output: 2

const grid2 = [
  [3, 0, 3, 0],
  [0, 3, 0, 3],
  [3, 0, 3, 0],
];
const k2 = 3;
console.log(countIslands(grid2, k2)); // Output: 6
