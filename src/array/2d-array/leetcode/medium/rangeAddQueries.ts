// 2536. Increment Submatrices by One

/**
Example 1:
Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
Output: [[1,1,0],[1,2,1],[0,1,1]]
Explanation: The diagram above shows the initial matrix, the matrix after the first query, and the matrix after the second query.
In the first query, we add 1 to every element in the submatrix with the top left corner (1, 1) and bottom right corner (2, 2).
In the second query, we add 1 to every element in the submatrix with the top left corner (0, 0) and bottom right corner (1, 1).
Example 2:
Input: n = 2, queries = [[0,0,1,1]]
Output: [[1,1],[1,1]]
Explanation: The diagram above shows the initial matrix and the matrix after the first query.
In the first query we add 1 to every element in the matrix.
 */

const n = 3,
  queries = [
    [1, 1, 2, 2],
    [0, 0, 1, 1],
  ];
const rangeAddQueries = function (n: number, queries: number[][]): number[][] {
  // Create an (n + 1) x (n + 1) matrix initialized with 0.
  // We use n + 1 size to handle boundary checks easily (e.g., when c2 + 1 == n).
  const mat: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  // Step 1: Apply 2D Difference Array updates
  // This runs in O(Q) time.
  for (const [r1, c1, r2, c2] of queries) {
    mat[r1][c1]++;
    mat[r1][c2 + 1]--;
    mat[r2 + 1][c1]--;
    mat[r2 + 1][c2 + 1]++;
  }

  // Step 2: Compute 2D Prefix Sums to propagate the updates
  // This runs in O(N^2) time.

  // Pass 1: Accumulate row-wise (Left to Right)
  // We only need to go up to i < n and j < n for the final result,
  // markers at index n fall outside the visible area.
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j++) {
      mat[i][j] += mat[i][j - 1];
    }
  }

  // Pass 2: Accumulate column-wise (Top to Bottom)
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      mat[i][j] += mat[i - 1][j];
    }
  }

  // Step 3: Format the output
  // Remove the extra row and column used for boundary handling
  const result: number[][] = [];
  for (let i = 0; i < n; i++) {
    result.push(mat[i].slice(0, n));
  }

  return result;
};

console.log(rangeAddQueries(n, queries));
