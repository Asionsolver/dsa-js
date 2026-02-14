// 799. Champagne Tower

/**
Example 1:

Input: poured = 1, query_row = 1, query_glass = 1
Output: 0.00000
Explanation: We poured 1 cup of champange to the top glass of the tower (which is indexed as (0, 0)). There will be no excess liquid so all the glasses under the top glass will remain empty.
Example 2:

Input: poured = 2, query_row = 1, query_glass = 1
Output: 0.50000
Explanation: We poured 2 cups of champange to the top glass of the tower (which is indexed as (0, 0)). There is one cup of excess liquid. The glass indexed as (1, 0) and the glass indexed as (1, 1) will share the excess liquid equally, and each will get half cup of champange.
Example 3:

Input: poured = 100000009, query_row = 33, query_glass = 17
Output: 1.00000
*/

const poured = 1,
  query_row = 1,
  query_glass = 1;
const champagneTower = function (
  poured: number,
  query_row: number,
  query_glass: number,
): number {
  // Create a 2D array to represent the pyramid.
  // Since query_row < 100, a size of 102x102 is sufficient to handle overflows to the next row.
  const tower: number[][] = new Array(102)
    .fill(0)
    .map(() => new Array(102).fill(0));

  // Pour all champagne into the top glass
  tower[0][0] = poured;

  // Iterate through each row to distribute the champagne
  // We only need to process up to query_row - 1 because row 'i' fills row 'i+1'.
  for (let r = 0; r <= query_row; r++) {
    for (let c = 0; c <= r; c++) {
      const currentVolume = tower[r][c];

      // If the current glass overflows
      if (currentVolume > 1) {
        const overflow = (currentVolume - 1) / 2.0;

        // Distribute excess to the bottom-left and bottom-right glasses
        tower[r + 1][c] += overflow;
        tower[r + 1][c + 1] += overflow;
      }
    }
  }

  // The result is the amount in the specific glass, capped at 1.0
  return Math.min(1, tower[query_row][query_glass]);
};

console.log(champagneTower(poured, query_glass, query_row));
