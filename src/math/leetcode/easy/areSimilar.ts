// 2946. Matrix Similarity After Cyclic Shifts

/**
Example 1:

Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 4

Output: false

Explanation:

In each step left shift is applied to rows 0 and 2 (even indices), and right shift to row 1 (odd index).



Example 2:

Input: mat = [[1,2,1,2],[5,5,5,5],[6,3,6,3]], k = 2

Output: true

Explanation:



Example 3:

Input: mat = [[2,2],[2,2]], k = 3

Output: true

Explanation:

As all the values are equal in the matrix, even after performing cyclic shifts the matrix will remain the same.


*/

const mat = [
    [2, 2],
    [2, 2],
  ],
  k = 3;

const areSimilar = function (mat: number[][], k: number): boolean {
  const m = mat.length;
  const n = mat[0].length;

  // We only need to shift by k modulo n times, as shifting by n yields the same array
  const shift = k % n;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i % 2 === 0) {
        // For even rows: Left shift by `shift`
        if (mat[i][j] !== mat[i][(j + shift) % n]) {
          return false;
        }
      } else {
        // For odd rows: Right shift by `shift`
        // Added `+ n` before modulo to correctly handle any potential negative numbers in JavaScript/TypeScript
        if (mat[i][j] !== mat[i][(j - shift + n) % n]) {
          return false;
        }
      }
    }
  }

  return true;
};
console.log(areSimilar(mat, k));
