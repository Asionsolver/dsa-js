// 84. Largest Rectangle in Histogram

/**
Example 1:


Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
Example 2:


Input: heights = [2,4]
Output: 4

*/

const heights = [2, 1, 5, 6, 2, 3];

const largestRectangleArea = function (heights: number[]): number {
  let maxArea = 0;
  // Stack will store the indices of the histogram bars.
  const stack: number[] = [];
  const n = heights.length;

  // Iterate up to n (inclusive) to handle the remaining elements in the stack
  for (let i = 0; i <= n; i++) {
    // If we are at the end, treat the height as 0 to flush out the stack.
    const currentHeight = i === n ? 0 : heights[i];

    // While the stack is not empty and the current bar is shorter than the
    // bar at the top of the stack, we resolve the bar at the top.
    while (
      stack.length > 0 &&
      currentHeight < heights[stack[stack.length - 1]]
    ) {
      // The height of the rectangle is the height of the bar at the top of the stack
      const height = heights[stack.pop()!];

      // The width of the rectangle is determined by the current index and the new top of the stack.
      // If the stack is empty, it means this bar was the shortest so far, so width is `i`.
      // Otherwise, it's bounded by the new top of the stack on the left and `i` on the right.
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

      // Calculate area and update maxArea
      maxArea = Math.max(maxArea, height * width);
    }

    // Push the current index to the stack
    stack.push(i);
  }

  return maxArea;
};

console.log(largestRectangleArea(heights));
