//85. Maximal Rectangle

/**
Example 1:


Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.
Example 2:

Input: matrix = [["0"]]
Output: 0
Example 3:

Input: matrix = [["1"]]
Output: 1
*/
const matrix = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
];
function maximalRectangle(matrix: string[][]): number {
  if (!matrix || matrix.length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;

  // This array will hold the height of the histogram for the current row
  const heights: number[] = new Array(cols).fill(0);
  let maxArea = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Update heights: accumulation if '1', reset if '0'
      if (matrix[i][j] === "1") {
        heights[j] += 1;
      } else {
        heights[j] = 0;
      }
    }

    // Calculate the maximal rectangle for the current row's histogram
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
}

/**
 * Helper function to solve "Largest Rectangle in Histogram" problem.
 * Uses a monotonic stack to solve in O(n) time.
 */
function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let maxArea = 0;

  // We iterate up to heights.length (inclusive).
  // The i === heights.length case acts as a virtual bar of height 0
  // to force popping remaining elements from the stack.
  for (let i = 0; i <= heights.length; i++) {
    // Use 0 as the height for the virtual last element
    const currentHeight = i === heights.length ? 0 : heights[i];

    // While the current bar is lower than the bar at the stack top,
    // we can calculate the area for the rectangle with height of the stack top.
    while (
      stack.length > 0 &&
      heights[stack[stack.length - 1]] >= currentHeight
    ) {
      const h = heights[stack.pop()!];

      // Width calculation:
      // If stack is empty, it means the popped height extends all the way to index 0.
      // Otherwise, it extends from the new stack top (exclusive) to current index 'i' (exclusive).
      const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

      maxArea = Math.max(maxArea, h * w);
    }

    stack.push(i);
  }

  return maxArea;
}

console.log(maximalRectangle(matrix));
