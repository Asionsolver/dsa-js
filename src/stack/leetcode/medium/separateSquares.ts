// 3453. Separate Squares I

/**
Example 1:

Input: squares = [[0,0,1],[2,2,1]]

Output: 1.00000

Explanation:



Any horizontal line between y = 1 and y = 2 will have 1 square unit above it and 1 square unit below it. The lowest option is 1.

Example 2:

Input: squares = [[0,0,2],[1,1,1]]

Output: 1.16667

Explanation:



The areas are:

Below the line: 7/6 * 2 (Red) + 1/6 (Blue) = 15/6 = 2.5.
Above the line: 5/6 * 2 (Red) + 5/6 (Blue) = 15/6 = 2.5.
Since the areas above and below the line are equal, the output is 7/6 = 1.16667.
*/

const squares = [
  [0, 0, 1],
  [2, 2, 1],
];

const separateSquares = function (squares: number[][]): number {
  let totalArea = 0;
  let minY = Infinity;
  let maxY = -Infinity;

  // 1. Calculate total area and search bounds
  for (const sq of squares) {
    const y = sq[1];
    const l = sq[2];
    const area = l * l;
    totalArea += area;

    // Update bounds for binary search
    if (y < minY) minY = y;
    if (y + l > maxY) maxY = y + l;
  }

  const target = totalArea / 2;

  // Helper function to calculate area below a specific line y
  function getAreaBelow(h: number): number {
    let currentArea = 0;
    for (const sq of squares) {
      const y = sq[1];
      const l = sq[2];
      const top = y + l;

      if (h <= y) {
        // The line is at or below the bottom of this square
        continue;
      } else if (h >= top) {
        // The line is at or above the top of this square
        currentArea += l * l;
      } else {
        // The line cuts through the square
        // The height of the portion below the line is (h - y)
        currentArea += (h - y) * l;
      }
    }
    return currentArea;
  }

  // 2. Binary search
  let low = minY;
  let high = maxY;

  // 70 iterations are sufficient to get precision far better than 10^-5
  // for coordinates up to 10^9.
  for (let i = 0; i < 70; i++) {
    const mid = low + (high - low) / 2;
    const area = getAreaBelow(mid);

    if (area >= target) {
      // We have enough area, try to find a smaller Y (minimum Y)
      high = mid;
    } else {
      // Not enough area, need to go higher
      low = mid;
    }
  }

  return high;
};

console.log(separateSquares(squares));
