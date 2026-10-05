// 36. Valid Sudoku

/**
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

*/

/**
Example 1:


Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
*/

/**
Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.
*/

// Brute force solution: Check all rows, columns, and 3x3 sub-boxes for duplicates.
// function isValidSudoku(board: string[][]): boolean {
//   // 1. Check all rows for duplicates.
//   for (let r = 0; r < 9; r++) {
//     const seen = new Set<string>();
//     for (let c = 0; c < 9; c++) {
//       const val = board[r][c];
//       if (val !== ".") {
//         if (seen.has(val)) {
//           return false;
//         }
//         seen.add(val);
//       }
//     }
//   }

//   // 2. Check all columns for duplicates.
//   for (let c = 0; c < 9; c++) {
//     const seen = new Set<string>();
//     for (let r = 0; r < 9; r++) {
//       const val = board[r][c];
//       if (val !== ".") {
//         if (seen.has(val)) {
//           return false;
//         }
//         seen.add(val);
//       }
//     }
//   }

//   // 3. Check all 3x3 sub-boxes for duplicates.
//   for (let boxRow = 0; boxRow < 9; boxRow += 3) {
//     for (let boxCol = 0; boxCol < 9; boxCol += 3) {
//       const seen = new Set<string>();
//       for (let r = 0; r < 3; r++) {
//         for (let c = 0; c < 3; c++) {
//           const val = board[boxRow + r][boxCol + c];
//           if (val !== ".") {
//             if (seen.has(val)) {
//               return false;
//             }
//             seen.add(val);
//           }
//         }
//       }
//     }
//   }

//   // All rules are satisfied.
//   return true;
// }

// Optimized solution: Check all rows, columns, and 3x3 sub-boxes in a single pass.
function isValidSudoku(board: string[][]): boolean {
  // Create an array of 9 Sets for rows, columns, and 3x3 boxes.
  const rows: Set<string>[] = Array.from(
    { length: 9 },
    () => new Set<string>(),
  );
  const cols: Set<string>[] = Array.from(
    { length: 9 },
    () => new Set<string>(),
  );
  const boxes: Set<string>[] = Array.from(
    { length: 9 },
    () => new Set<string>(),
  );

  // Traverse each cell of the 9x9 board in a single pass.
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];

      // Skip empty cells.
      if (val === ".") {
        continue;
      }

      // Calculate the 3x3 sub-box index (0 to 8).
      const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      // Check if the current value already exists in the row, column, or box.
      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIndex].has(val)) {
        return false;
      }

      // Record the current value in the respective row, column, and box.
      rows[r].add(val);
      cols[c].add(val);
      boxes[boxIndex].add(val);
    }
  }

  // No duplicate found in any row, column, or box.
  return true;
}

// Example usage:
const board1 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log(isValidSudoku(board1)); // Output: true

const board2 = [
  ["8", "3", ".", ".", "7", ".", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log(isValidSudoku(board2)); // Output: false
