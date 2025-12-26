// 11. Container With Most Water

/**
Example 1:


Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
*/

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];

const maxArea = function (height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    // Calculate the height of the container (limited by the shorter side)
    const currentHeight = Math.min(height[left], height[right]);

    // Calculate the width
    const currentWidth = right - left;

    // Calculate current area
    const currentArea = currentHeight * currentWidth;

    // Update global max
    if (currentArea > maxWater) {
      maxWater = currentArea;
    }

    // Greedy strategy: Move the pointer of the shorter wall.
    // Moving the taller wall would never increase the area because the
    // height is limited by the shorter wall and the width would decrease.
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
};

console.log(maxArea(height));
