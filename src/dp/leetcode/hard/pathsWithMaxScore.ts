// 1301. Number of Paths with Max Score

/**
Example 1:

Input: board = ["E23","2X2","12S"]
Output: [7,1]
Example 2:

Input: board = ["E12","1X1","21S"]
Output: [4,2]
Example 3:

Input: board = ["E11","XXX","11S"]
Output: [0,0]

*/
function pathsWithMaxScore(board: string[]): number[] {
  const n = board.length;
  const MOD = 1_000_000_007;

  // score[i][j] stores the maximum score to reach (i, j)
  const score = Array.from({ length: n }, () => new Int32Array(n));
  // path[i][j] stores the number of paths to reach (i, j) with the maximum score
  const path = Array.from({ length: n }, () => new Int32Array(n));

  path[n - 1][n - 1] = 1;

  // Directions for transitions: [up, left, up-left]
  const dirs = [
    [-1, 0],
    [0, -1],
    [-1, -1],
  ];

  for (let i = n - 1; i >= 0; --i) {
    for (let j = n - 1; j >= 0; --j) {
      // If the current cell is unreachable, skip it
      if (path[i][j] === 0) {
        continue;
      }

      for (const [di, dj] of dirs) {
        const x = i + di;
        const y = j + dj;

        // Ensure the neighbor is within bounds and is not an obstacle 'X'
        if (x < 0 || y < 0 || board[x][y] === "X") {
          continue;
        }

        // Calculate path sum to the neighbor
        let sum = score[i][j];
        if (board[x][y] !== "E") {
          // Convert character to integer value
          sum += board[x].charCodeAt(y) - 48; // '0' is 48
        }

        if (sum > score[x][y]) {
          score[x][y] = sum;
          path[x][y] = path[i][j];
        } else if (sum === score[x][y]) {
          path[x][y] = (path[x][y] + path[i][j]) % MOD;
        }
      }
    }
  }

  return [score[0][0], path[0][0]];
}

// Example usage:
const board1 = ["E23", "2X2", "12S"];
console.log(pathsWithMaxScore(board1)); // Output: [7, 1]

const board2 = ["E12", "1X1", "21S"];
console.log(pathsWithMaxScore(board2)); // Output: [4, 2]

const board3 = ["E11", "XXX", "11S"];
console.log(pathsWithMaxScore(board3)); // Output: [0, 0]
