// 1739. Building Boxes

/**
Example 1:



Input: n = 3
Output: 3
Explanation: The figure above is for the placement of the three boxes.
These boxes are placed in the corner of the room, where the corner is on the left side.
Example 2:



Input: n = 4
Output: 3
Explanation: The figure above is for the placement of the four boxes.
These boxes are placed in the corner of the room, where the corner is on the left side.
Example 3:



Input: n = 10
Output: 6
Explanation: The figure above is for the placement of the ten boxes.
These boxes are placed in the corner of the room, where the corner is on the back side.

*/

function minimumBoxes(n: number): number {
  let k = 1;
  let s = 1;

  // Find the largest complete tetrahedral pyramid we can build with <= n boxes.
  // The next layer (level k + 1) requires (k + 1) * (k + 2) / 2 boxes.
  while (s + ((k + 1) * (k + 2)) / 2 <= n) {
    k++;
    s += (k * (k + 1)) / 2;
  }

  // Calculate the remaining boxes to place
  const r = n - s;

  // Find the minimum number of additional floor boxes (j) needed to support 'r' boxes
  let j = 0;
  let added = 0;
  while (added < r) {
    j++;
    added += j;
  }

  // The result is the floor area of the perfect pyramid + the additional floor boxes
  const floorBoxesForPyramid = (k * (k + 1)) / 2;
  return floorBoxesForPyramid + j;
}

// Example usage:
console.log(minimumBoxes(3)); // Output: 3
console.log(minimumBoxes(4)); // Output: 3
console.log(minimumBoxes(10)); // Output: 6
