// 1878. Get Biggest Three Rhombus Sums in a Grid

/**
Example 1:


Input: grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
Output: [228,216,211]
Explanation: The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
- Blue: 20 + 3 + 200 + 5 = 228
- Red: 200 + 2 + 10 + 4 = 216
- Green: 5 + 200 + 4 + 2 = 211
Example 2:


Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: [20,9,8]
Explanation: The rhombus shapes for the three biggest distinct rhombus sums are depicted above.
- Blue: 4 + 2 + 6 + 8 = 20
- Red: 9 (area 0 rhombus in the bottom right corner)
- Green: 8 (area 0 rhombus in the bottom middle)
Example 3:

Input: grid = [[7,7,7]]
Output: [7]
Explanation: All three possible rhombus sums are the same, so return [7].

*/

const grid = [
  [3, 4, 5, 1, 3],
  [3, 3, 4, 2, 3],
  [20, 30, 200, 40, 10],
  [1, 5, 5, 4, 1],
  [4, 3, 2, 2, 5],
];

const getBiggestThree = function (grid: number[][]): number[] {
  const m = grid.length;
  const n = grid[0].length;

  // An array to keep track of the top 3 distinct biggest rhombus sums.
  const top3: number[] = [];

  // Helper function to process and insert sums dynamically keeping only the top 3.
  function addSum(sum: number): void {
    if (top3.includes(sum)) return;

    if (top3.length < 3) {
      top3.push(sum);
      top3.sort((a, b) => b - a);
    } else if (sum > top3[2]) {
      top3[2] = sum;
      top3.sort((a, b) => b - a);
    }
  }

  // Traverse every possible top vertex of a rhombus
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let L = 0;

      // Expand the side length 'L' as long as its corresponding boundaries sit correctly within the matrix limits
      while (i + 2 * L < m && j - L >= 0 && j + L < n) {
        if (L === 0) {
          // A 0-area rhombus consists merely of its center cell
          addSum(grid[i][j]);
        } else {
          let sum = 0;

          for (let k = 0; k < L; k++) {
            // Traverse Top to Right edge (excluding Right)
            sum += grid[i + k][j + k];
            // Traverse Right to Bottom edge (excluding Bottom)
            sum += grid[i + L + k][j + L - k];
            // Traverse Bottom to Left edge (excluding Left)
            sum += grid[i + 2 * L - k][j - k];
            // Traverse Left to Top edge (excluding Top)
            sum += grid[i + L - k][j - L + k];
          }

          addSum(sum);
        }
        L++;
      }
    }
  }

  return top3;
};

console.log(getBiggestThree(grid));
