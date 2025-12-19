// 1578. Minimum Time to Make Rope Colorful

/**
Example 1:


Input: colors = "abaac", neededTime = [1,2,3,4,5]
Output: 3
Explanation: In the above image, 'a' is blue, 'b' is red, and 'c' is green.
Bob can remove the blue balloon at index 2. This takes 3 seconds.
There are no longer two consecutive balloons of the same color. Total time = 3.
Example 2:


Input: colors = "abc", neededTime = [1,2,3]
Output: 0
Explanation: The rope is already colorful. Bob does not need to remove any balloons from the rope.
Example 3:


Input: colors = "aabaa", neededTime = [1,2,3,4,1]
Output: 2
Explanation: Bob will remove the balloons at indices 0 and 4. Each balloons takes 1 second to remove.
There are no longer two consecutive balloons of the same color. Total time = 1 + 1 = 2.
*/

const colors = "abc",
  neededTime = [1, 2, 3];

const minCost = function (colors: string, neededTime: number[]) {
  let totalTime = 0;

  for (let i = 1; i < colors.length; i++) {
    // Check if current balloon has the same color as the previous one
    if (colors[i] === colors[i - 1]) {
      // We must remove one. Add the smaller time to totalTime.
      totalTime += Math.min(neededTime[i], neededTime[i - 1]);

      // We keep the balloon that takes MORE time.
      // Update the current index with the maximum time so the next
      // iteration compares the "kept" balloon with the next one.
      neededTime[i] = Math.max(neededTime[i], neededTime[i - 1]);
    }
  }

  return totalTime;
};

console.log(minCost(colors, neededTime));
