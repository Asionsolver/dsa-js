// 42. Trapping Rain Water

/**
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
*/
const height = [4, 2, 0, 3, 2, 5];
// Two Pointer Approach (O(n), O(n) space
const trap = function (height: number[]) {
  let left = new Array(height.length);
  let right = new Array(height.length);
  let maxLeft = height[0];
  let maxRight = height[height.length - 1];
  left[0] = maxLeft;
  right[right.length - 1] = maxRight;

  for (let i = 1; i < height.length; i++) {
    maxLeft = Math.max(height[i], maxLeft);
    left[i] = maxLeft;
  }
  for (let i = height.length - 2; i >= 0; i--) {
    maxRight = Math.max(height[i], maxRight);
    right[i] = maxRight;
  }

  let ans = 0;

  for (let i = 0; i < height.length; i++) {
    ans += Math.min(left[i], right[i]) - height[i];
  }

  return ans;
};
console.log(trap(height));
