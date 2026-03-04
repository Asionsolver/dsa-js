// 1582. Special Positions in a Binary Matrix

/**
Example 1:


Input: mat = [[1,0,0],[0,0,1],[1,0,0]]
Output: 1
Explanation: (1, 2) is a special position because mat[1][2] == 1 and all other elements in row 1 and column 2 are 0.
Example 2:


Input: mat = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: (0, 0), (1, 1) and (2, 2) are special positions.
*/

const mat = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

function numSpecial(mat: number[][]): number {
  const m = mat.length;
  const n = mat[0].length;

  // Arrays to store the count of 1s in each row and column
  const rowSum = new Array(m).fill(0);
  const colSum = new Array(n).fill(0);

  // Step 1: Count the 1s for each row and column
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1) {
        rowSum[i]++;
        colSum[j]++;
      }
    }
  }

  let specialCount = 0;

  // Step 2: Check for special positions
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // A position is special if it's 1 and is the ONLY 1 in its row and column
      if (mat[i][j] === 1 && rowSum[i] === 1 && colSum[j] === 1) {
        specialCount++;
      }
    }
  }

  return specialCount;
}

console.log(numSpecial(mat));
