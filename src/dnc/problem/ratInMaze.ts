// rat in maze

// const maze = [
//   [1, 0, 0],
//   [1, 1, 0],
//   [1, 1, 1],
// ];
const maze = [
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 0, 0],
  [0, 1, 1, 1],
];
const mazeX = 0;
const mazeY = 0;
const row = maze.length;
const col = maze[0].length;

const visited: boolean[][] = Array.from({ length: row }, () =>
  Array(col).fill(false)
);
visited[0][0] = true;
if (maze[0][0] === 0) {
  console.log("No path exists.");
  process.exit(0);
}
const path: string[] = [];
const output = "";

const isSafe = function (
  maze: number[][],
  row: number,
  col: number,
  mazeX: number,
  mazeY: number,
  visited: boolean[][]
) {
  if (
    mazeX >= 0 &&
    mazeX < row &&
    mazeY >= 0 &&
    mazeY < col &&
    maze[mazeX][mazeY] === 1 &&
    visited[mazeX][mazeY] === false
  ) {
    return true;
  } else {
    return false;
  }
};

const solveMaze = function (
  maze: number[][],
  row: number,
  col: number,
  mazeX: number,
  mazeY: number,
  visited: boolean[][],
  path: string[],
  output: string
) {
  // base case
  if (mazeX === row - 1 && mazeY === col - 1) {
    path.push(output);
    return;
  }

  // Down --> mazeX+1,mazeY
  if (isSafe(maze, row, col, mazeX + 1, mazeY, visited)) {
    visited[mazeX + 1][mazeY] = true;
    solveMaze(maze, row, col, mazeX + 1, mazeY, visited, path, output + "D");
    visited[mazeX + 1][mazeY] = false;
  }
  // Left --> mazeX, mazeY-1
  if (isSafe(maze, row, col, mazeX, mazeY - 1, visited)) {
    visited[mazeX][mazeY - 1] = true;
    solveMaze(maze, row, col, mazeX, mazeY - 1, visited, path, output + "L");
    visited[mazeX][mazeY - 1] = false;
  }
  // Right --> mazeX, mazeY+1
  if (isSafe(maze, row, col, mazeX, mazeY + 1, visited)) {
    visited[mazeX][mazeY + 1] = true;
    solveMaze(maze, row, col, mazeX, mazeY + 1, visited, path, output + "R");
    visited[mazeX][mazeY + 1] = false;
  }
  // Up --> mazeX-1, mazeY
  if (isSafe(maze, row, col, mazeX - 1, mazeY, visited)) {
    visited[mazeX - 1][mazeY] = true;
    solveMaze(maze, row, col, mazeX - 1, mazeY, visited, path, output + "U");
    visited[mazeX - 1][mazeY] = false;
  }
};
solveMaze(maze, row, col, mazeX, mazeY, visited, path, output);
if (path.length > 0) {
  console.log("Paths found:", path);
} else {
  console.log("No Path Exists");
}
