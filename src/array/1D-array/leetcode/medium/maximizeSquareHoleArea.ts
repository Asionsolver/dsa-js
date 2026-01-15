// 2943. Maximize Area of Square Hole in Grid

/**

Example 1:



Input: n = 2, m = 1, hBars = [2,3], vBars = [2]

Output: 4

Explanation:

The left image shows the initial grid formed by the bars. The horizontal bars are [1,2,3,4], and the vertical bars are [1,2,3].

One way to get the maximum square-shaped hole is by removing horizontal bar 2 and vertical bar 2.

Example 2:



Input: n = 1, m = 1, hBars = [2], vBars = [2]

Output: 4

Explanation:

To get the maximum square-shaped hole, we remove horizontal bar 2 and vertical bar 2.

Example 3:



Input: n = 2, m = 3, hBars = [2,3], vBars = [2,4]

Output: 4

Explanation:

One way to get the maximum square-shaped hole is by removing horizontal bar 3, and vertical bar 4.


*/
const n = 2,
  m = 3,
  hBars = [2, 3],
  vBars = [2, 4];
function maximizeSquareHoleArea(
  n: number,
  m: number,
  hBars: number[],
  vBars: number[]
): number {
  // Helper function to find the maximum consecutive run in a list of bars
  // The maximum gap size will be (longest consecutive run of bars) + 1
  const getMaxGap = (bars: number[]): number => {
    if (bars.length === 0) return 1;

    // Sort numerically to find consecutive sequences
    bars.sort((a, b) => a - b);

    let maxRun = 1;
    let currentRun = 1;

    for (let i = 0; i < bars.length - 1; i++) {
      if (bars[i] + 1 === bars[i + 1]) {
        currentRun++;
      } else {
        maxRun = Math.max(maxRun, currentRun);
        currentRun = 1;
      }
    }

    // Check the last run after the loop finishes
    maxRun = Math.max(maxRun, currentRun);

    // If we remove 'maxRun' consecutive bars, the gap merges 'maxRun + 1' cells
    return maxRun + 1;
  };

  const maxH = getMaxGap(hBars);
  const maxV = getMaxGap(vBars);

  // To form a square, the side length is limited by the smaller dimension
  const side = Math.min(maxH, maxV);

  return side * side;
}

console.log(maximizeSquareHoleArea(n, m, hBars, vBars));
