// 51. N-Queens

/**
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
Example 2:

Input: n = 1
Output: [["Q"]]
*/

function solveNQueens(n: number): string[][] {
  const board = Array.from({ length: n }, () => Array(n).fill(0));
  const res: string[][] = [];

  // This function T.C: O(n)
  const isSafe = function (
    board: number[][],
    row: number,
    col: number
  ): boolean {
    let i = row;
    let j = col;

    // check left row
    while (j >= 0) {
      if (board[i][j] === 1) return false;
      j--;
    }

    // check upper left diagonal
    i = row;
    j = col;
    while (i >= 0 && j >= 0) {
      if (board[i][j] === 1) return false;
      i--;
      j--;
    }

    // check lower left diagonal
    i = row;
    j = col;
    while (i < n && j >= 0) {
      if (board[i][j] === 1) return false;
      i++;
      j--;
    }

    return true;
  };

  const solve = function (col: number) {
    // base case: all columns are filled
    if (col >= n) {
      const solution = board.map((row) =>
        row.map((cell) => (cell === 1 ? "Q" : ".")).join("")
      );
      res.push(solution);
      return;
    }

    for (let row = 0; row < n; row++) {
      if (isSafe(board, row, col)) {
        board[row][col] = 1; // place queen
        solve(col + 1); // recurse for next column
        board[row][col] = 0; // backtrack
      }
    }
  };

  solve(0);
  return res;
}

console.log(solveNQueens(4));
