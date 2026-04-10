// 2132. Stamping the Grid

/**
Example 1:


Input: grid = [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]], stampHeight = 4, stampWidth = 3
Output: true
Explanation: We have two overlapping stamps (labeled 1 and 2 in the image) that are able to cover all the empty cells.
Example 2:


Input: grid = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], stampHeight = 2, stampWidth = 2 
Output: false 
Explanation: There is no way to fit the stamps onto all the empty cells without the stamps going outside the grid.
*/

const grid = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ],
  stampHeight = 2,
  stampWidth = 2;

const possibleToStamp = function (
  grid: number[][],
  stampHeight: number,
  stampWidth: number,
): boolean {
  const m = grid.length;
  const n = grid[0].length;

  // Step 1: Create a 2D prefix sum of the original grid to quickly find 1s.
  const pref = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      pref[i + 1][j + 1] =
        grid[i][j] + pref[i][j + 1] + pref[i + 1][j] - pref[i][j];
    }
  }

  // Step 2: Form a valid stamps matrix and simultaneously build its 2D prefix sum.
  const valid_pref = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let isValid = 0;
      // Check if the stamp fits strictly within bounds dynamically
      if (i >= stampHeight - 1 && j >= stampWidth - 1) {
        const r1 = i - stampHeight + 1;
        const c1 = j - stampWidth + 1;
        // Query the amount of 1s in the current stamp window
        const onesCount =
          pref[i + 1][j + 1] - pref[r1][j + 1] - pref[i + 1][c1] + pref[r1][c1];
        if (onesCount === 0) {
          isValid = 1;
        }
      }
      // Construct the prefix sum on the fly
      valid_pref[i + 1][j + 1] =
        isValid +
        valid_pref[i][j + 1] +
        valid_pref[i + 1][j] -
        valid_pref[i][j];
    }
  }

  // Step 3: Check if all `0`s are covered by at least one valid stamp.
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        // Minimum and maximum boundaries defining where a covering stamp's bottom-right corner could be
        const r1 = i;
        const c1 = j;
        const r2 = Math.min(i + stampHeight - 1, m - 1);
        const c2 = Math.min(j + stampWidth - 1, n - 1);

        // Query if there is at least one valid stamp in this region
        const stampCount =
          valid_pref[r2 + 1][c2 + 1] -
          valid_pref[r1][c2 + 1] -
          valid_pref[r2 + 1][c1] +
          valid_pref[r1][c1];
        if (stampCount === 0) {
          return false; // Found an empty cell that cannot be successfully covered
        }
      }
    }
  }

  return true; // All empty cells were successfully covered
};

console.log(possibleToStamp(grid, stampHeight, stampWidth));
