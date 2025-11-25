// 304. Range Sum Query 2D - Immutable

class NumMatrix {
  prefix: number[][];

  constructor(matrix: number[][]) {
    const m = matrix.length;
    const n = matrix[0].length;

    // prefix matrix (m+1 x n+1)
    this.prefix = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // build prefix sum
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        this.prefix[i][j] =
          matrix[i - 1][j - 1] +
          this.prefix[i - 1][j] +
          this.prefix[i][j - 1] -
          this.prefix[i - 1][j - 1];
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number) {
    let p = this.prefix;

    return (
      p[row2 + 1][col2 + 1] -
      p[row1][col2 + 1] -
      p[row2 + 1][col1] +
      p[row1][col1]
    );
  }
}
// Usage
const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
];

const numMatrix = new NumMatrix(matrix);

console.log(numMatrix.sumRegion(2, 1, 4, 3)); // 8
console.log(numMatrix.sumRegion(1, 1, 2, 2)); // 11
console.log(numMatrix.sumRegion(1, 2, 2, 4)); // 12
