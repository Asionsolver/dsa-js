// 1886. Determine Whether Matrix Can Be Obtained By Rotation

/**
Example 1:


Input: mat = [[0,1],[1,0]], target = [[1,0],[0,1]]
Output: true
Explanation: We can rotate mat 90 degrees clockwise to make mat equal target.
Example 2:


Input: mat = [[0,1],[1,1]], target = [[1,0],[0,1]]
Output: false
Explanation: It is impossible to make mat equal to target by rotating mat.
Example 3:


Input: mat = [[0,0,0],[0,1,0],[1,1,1]], target = [[1,1,1],[0,1,0],[0,0,0]]
Output: true
Explanation: We can rotate mat 90 degrees clockwise two times to make mat equal target.
*/
const mat = [
    [0, 1],
    [1, 0],
  ],
  target = [
    [1, 0],
    [0, 1],
  ];
const findRotation = function (mat: number[][], target: number[][]): boolean {
  const n = mat.length;

  // Assume all 4 rotations are a match until proven otherwise
  let canBe0 = true;
  let canBe90 = true;
  let canBe180 = true;
  let canBe270 = true;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Check 0 degree rotation
      if (mat[i][j] !== target[i][j]) {
        canBe0 = false;
      }
      // Check 90 degrees clockwise rotation
      if (mat[n - 1 - j][i] !== target[i][j]) {
        canBe90 = false;
      }
      // Check 180 degrees clockwise rotation
      if (mat[n - 1 - i][n - 1 - j] !== target[i][j]) {
        canBe180 = false;
      }
      // Check 270 degrees clockwise rotation
      if (mat[j][n - 1 - i] !== target[i][j]) {
        canBe270 = false;
      }
    }
  }

  // If any of the rotations remained true, it's possible
  return canBe0 || canBe90 || canBe180 || canBe270;
};

console.log(findRotation(mat, target));
