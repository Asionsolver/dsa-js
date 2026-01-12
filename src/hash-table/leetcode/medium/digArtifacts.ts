// 2201. Count Artifacts That Can Be Extracted

/**
Example 1:


Input: n = 2, artifacts = [[0,0,0,0],[0,1,1,1]], dig = [[0,0],[0,1]]
Output: 1
Explanation: 
The different colors represent different artifacts. Excavated cells are labeled with a 'D' in the grid.
There is 1 artifact that can be extracted, namely the red artifact.
The blue artifact has one part in cell (1,1) which remains uncovered, so we cannot extract it.
Thus, we return 1.
Example 2:


Input: n = 2, artifacts = [[0,0,0,0],[0,1,1,1]], dig = [[0,0],[0,1],[1,1]]
Output: 2
Explanation: Both the red and blue artifacts have all parts uncovered (labeled with a 'D') and can be extracted, so we return 2.
*/
const n = 2,
  artifacts = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
  ],
  dig = [
    [0, 0],
    [0, 1],
  ];

const digArtifacts = function (
  n: number,
  artifacts: number[][],
  dig: number[][]
): number {
  // 1. Create a 2D boolean grid to represent the excavated cells.
  // Size is n x n. Initialized to false.
  const isDug: boolean[][] = Array.from({ length: n }, () =>
    new Array(n).fill(false)
  );

  // 2. Mark the excavated cells in the grid.
  for (const [r, c] of dig) {
    isDug[r][c] = true;
  }

  let extractedCount = 0;

  // 3. Iterate through each artifact to check if it is fully uncovered.
  for (const [r1, c1, r2, c2] of artifacts) {
    let canExtract = true;

    // Iterate over the artifact's rectangular area.
    // Constraint: Each artifact covers at most 4 cells, so this nested loop is O(1).
    checkLoop: for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        // If we find a cell that hasn't been dug, this artifact cannot be extracted.
        if (!isDug[r][c]) {
          canExtract = false;
          break checkLoop; // Break out of both loops
        }
      }
    }

    if (canExtract) {
      extractedCount++;
    }
  }

  return extractedCount;
};

console.log(digArtifacts(n, artifacts, dig));
