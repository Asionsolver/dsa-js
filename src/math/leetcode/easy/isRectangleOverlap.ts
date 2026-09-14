// 836. Rectangle Overlap

/**
An axis-aligned rectangle is represented as a list [x1, y1, x2, y2], where (x1, y1) is the coordinate of its bottom-left corner, and (x2, y2) is the coordinate of its top-right corner. Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.

Two rectangles overlap if the area of their intersection is positive. To be clear, two rectangles that only touch at the corner or edges do not overlap.

Given two axis-aligned rectangles rec1 and rec2, return true if they overlap, otherwise return false.
*/

/**
Example 1:

Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
Output: true
Example 2:

Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]
Output: false
Example 3:

Input: rec1 = [0,0,1,1], rec2 = [2,2,3,3]
Output: false
*/

/**
Constraints:

rec1.length == 4
rec2.length == 4
-109 <= rec1[i], rec2[i] <= 109
rec1 and rec2 represent a valid rectangle with a non-zero area.
*/

// Brute Force Approach: TLE

// function isRectangleOverlap(rec1: number[], rec2: number[]): boolean {
//   const [r1x1, r1y1, r1x2, r1y2] = rec1;
//   const [r2x1, r2y1, r2x2, r2y2] = rec2;

//   // Check every unit grid point inside rec1 to see if it falls inside rec2.
//   for (let x = r1x1 + 0.5; x < r1x2; x += 1) {
//     for (let y = r1y1 + 0.5; y < r1y2; y += 1) {
//       // Check if the current point is strictly inside rec2.
//       if (x > r2x1 && x < r2x2 && y > r2y1 && y < r2y2) {
//         return true;
//       }
//     }
//   }

//   return false;
// }

// Optimized Approach: O(1) time complexity
function isRectangleOverlap(rec1: number[], rec2: number[]): boolean {
  // Calculate the overlap condition along the X-axis.
  const hasXOverlap = Math.min(rec1[2], rec2[2]) > Math.max(rec1[0], rec2[0]);

  // Calculate the overlap condition along the Y-axis.
  const hasYOverlap = Math.min(rec1[3], rec2[3]) > Math.max(rec1[1], rec2[1]);

  // Both X and Y dimensions must have positive overlap for 2D intersection.
  return hasXOverlap && hasYOverlap;
}

// Example usage:
const rec1 = [0, 0, 2, 2];
const rec2 = [1, 1, 3, 3];
console.log(isRectangleOverlap(rec1, rec2)); // Output: true

const rec3 = [0, 0, 1, 1];
const rec4 = [1, 0, 2, 1];
console.log(isRectangleOverlap(rec3, rec4)); // Output: false

const rec5 = [0, 0, 1, 1];
const rec6 = [2, 2, 3, 3];
console.log(isRectangleOverlap(rec5, rec6)); // Output: false
