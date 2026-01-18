// 1944. Number of Visible People in a Queue

/**
Example 1:



Input: heights = [10,6,8,5,11,9]
Output: [3,1,2,1,1,0]
Explanation:
Person 0 can see person 1, 2, and 4.
Person 1 can see person 2.
Person 2 can see person 3 and 4.
Person 3 can see person 4.
Person 4 can see person 5.
Person 5 can see no one since nobody is to the right of them.
Example 2:

Input: heights = [5,1,2,3,10]
Output: [4,1,1,1,0]
*/

const heights = [10, 6, 8, 5, 11, 9];
const canSeePersonsCount = function (heights: number[]): number[] {
  const n = heights.length;
  const ans = new Array(n).fill(0);
  const stack: number[] = []; // Stores heights of people to the right

  // Traverse from right to left
  for (let i = n - 1; i >= 0; i--) {
    const currentHeight = heights[i];

    // While there are people in the stack and the current person is taller than them:
    // 1. The current person can see them.
    // 2. The current person blocks them from being seen by anyone further left.
    while (stack.length > 0 && currentHeight > stack[stack.length - 1]) {
      ans[i]++;
      stack.pop();
    }

    // If the stack is not empty after the loop, it means there is a person
    // to the right who is taller than the current person.
    // The current person can see this taller neighbor.
    if (stack.length > 0) {
      ans[i]++;
    }

    // Push the current person's height onto the stack
    stack.push(currentHeight);
  }

  return ans;
};
console.log(canSeePersonsCount(heights));
