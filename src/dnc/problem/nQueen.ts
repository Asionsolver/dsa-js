const n = 4;
const board = Array.from({ length: n }, () => Array(n).fill(0));
const col = 0;

const isSafe = function (
  board: number[][],
  row: number,
  col: number,
  size: number
) {
  let i = row;
  let j = col;
  // check row
  while (j >= 0) {
    if (board[i][j] === 1) {
      return false;
    }
    j--;
  }

  // check upper left diagonal
  i = row;
  j = col;
  while (i >= 0 && j >= 0) {
    if (board[i][j] === 1) {
      return false;
    }
    i--;
    j--;
  }
  //check down left diagonal
  i = row;
  j = col;
  while (i < n && j >= 0) {
    if (board[i][j] == 1) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};
const printSolution = function (board: number[][], size: number) {
  console.log("---------------");
  for (let i = 0; i < size; i++) {
    let row = "";
    for (let j = 0; j < size; j++) {
      row += board[i][j] === 1 ? "Q " : ". ";
    }
    console.log(row);
  }
  console.log("---------------\n");
};
const solveNQueens = function (board: number[][], col: number, size: number) {
  // base case
  if (col >= size) {
    printSolution(board, size);
    return;
  }

  for (let row = 0; row < size; row++) {
    if (isSafe(board, row, col, size)) {
      board[row][col] = 1;
      // recursive call
      solveNQueens(board, col + 1, size);
      // backtracking
      board[row][col] = 0;
    }
  }
};

solveNQueens(board, col, n);
