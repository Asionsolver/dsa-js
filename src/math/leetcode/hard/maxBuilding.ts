// 1840. Maximum Building Height

/**
Example 1:


Input: n = 5, restrictions = [[2,1],[4,1]]
Output: 2
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,1,2], and the tallest building has a height of 2.
Example 2:


Input: n = 6, restrictions = []
Output: 5
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,3,4,5], and the tallest building has a height of 5.
Example 3:


Input: n = 10, restrictions = [[5,3],[2,5],[7,4],[10,3]]
Output: 5
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,3,3,4,4,5,4,3], and the tallest building has a height of 5.

*/

function maxBuilding(n: number, restrictions: number[][]): number {
  // Sort restrictions based on their building index
  restrictions.sort((a, b) => a[0] - b[0]);

  // If building n is not in restrictions, add a virtual restriction with its
  // theoretical maximum possible height (n - 1)
  if (
    restrictions.length === 0 ||
    restrictions[restrictions.length - 1][0] !== n
  ) {
    restrictions.push([n, n - 1]);
  }

  // Add building 1 which must have a height of 0
  restrictions.unshift([1, 0]);

  const m = restrictions.length;

  // Pass 1: Left-to-right propagation
  for (let i = 1; i < m; i++) {
    const limit =
      restrictions[i - 1][1] + (restrictions[i][0] - restrictions[i - 1][0]);
    if (restrictions[i][1] > limit) {
      restrictions[i][1] = limit;
    }
  }

  // Pass 2: Right-to-left propagation
  for (let i = m - 2; i >= 0; i--) {
    const limit =
      restrictions[i + 1][1] + (restrictions[i + 1][0] - restrictions[i][0]);
    if (restrictions[i][1] > limit) {
      restrictions[i][1] = limit;
    }
  }

  // Calculate the peak height possible between each pair of adjacent restricted buildings
  let maxHeight = 0;
  for (let i = 1; i < m; i++) {
    const id1 = restrictions[i - 1][0];
    const h1 = restrictions[i - 1][1];
    const id2 = restrictions[i][0];
    const h2 = restrictions[i][1];

    const d = id2 - id1;
    const peak = Math.floor((h1 + h2 + d) / 2);
    if (peak > maxHeight) {
      maxHeight = peak;
    }
  }

  return maxHeight;
}

// Test cases
console.log(
  maxBuilding(5, [
    [2, 1],
    [4, 1],
  ]),
); // Output: 2
console.log(maxBuilding(6, [])); // Output: 5
console.log(
  maxBuilding(10, [
    [5, 3],
    [2, 5],
    [7, 4],
    [10, 3],
  ]),
); // Output: 5
