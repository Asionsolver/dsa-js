// 1401. Circle and Rectangle Overlapping

/**
You are given a circle represented as (radius, xCenter, yCenter) and an axis-aligned rectangle represented as (x1, y1, x2, y2), where (x1, y1) are the coordinates of the bottom-left corner, and (x2, y2) are the coordinates of the top-right corner of the rectangle.

Return true if the circle and rectangle are overlapped otherwise return false. In other words, check if there is any point (xi, yi) that belongs to the circle and the rectangle at the same time.
*/

/**
Example 1:


Input: radius = 1, xCenter = 0, yCenter = 0, x1 = 1, y1 = -1, x2 = 3, y2 = 1
Output: true
Explanation: Circle and rectangle share the point (1,0).
Example 2:

Input: radius = 1, xCenter = 1, yCenter = 1, x1 = 1, y1 = -3, x2 = 2, y2 = -1
Output: false
Example 3:


Input: radius = 1, xCenter = 0, yCenter = 0, x1 = -1, y1 = 0, x2 = 0, y2 = 1
Output: true
 
*/

/**
Constraints:

1 <= radius <= 2000
-104 <= xCenter, yCenter <= 104
-104 <= x1 < x2 <= 104
-104 <= y1 < y2 <= 104
*/

// Brute force solution
// function checkOverlap(
//   radius: number,
//   xCenter: number,
//   yCenter: number,
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number,
// ): boolean {
//   const radiusSquared = radius * radius;

//   // Check all integer points inside the rectangle boundary.
//   for (let x = x1; x <= x2; x++) {
//     for (let y = y1; y <= y2; y++) {
//       const dx = x - xCenter;
//       const dy = y - yCenter;

//       // If any point is within or on the circle boundary, they overlap.
//       if (dx * dx + dy * dy <= radiusSquared) {
//         return true;
//       }
//     }
//   }

//   return false;
// }

// Optimized solution
function checkOverlap(
  radius: number,
  xCenter: number,
  yCenter: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): boolean {
  // Find the closest X-coordinate on the rectangle to the circle center.
  const nearestX = Math.max(x1, Math.min(xCenter, x2));

  // Find the closest Y-coordinate on the rectangle to the circle center.
  const nearestY = Math.max(y1, Math.min(yCenter, y2));

  // Calculate distance between circle center and the closest point.
  const distX = xCenter - nearestX;
  const distY = yCenter - nearestY;

  // Check if the squared distance is less than or equal to squared radius.
  return distX * distX + distY * distY <= radius * radius;
}

// Example usage:
const radius = 1;
const xCenter = 0;
const yCenter = 0;
const x1 = 1;
const y1 = -1;
const x2 = 3;
const y2 = 1;

console.log(checkOverlap(radius, xCenter, yCenter, x1, y1, x2, y2)); // Output: true

const radius2 = 1;
const xCenter2 = 1;
const yCenter2 = 1;
const x12 = 1;
const y12 = -3;
const x22 = 2;
const y22 = -1;

console.log(checkOverlap(radius2, xCenter2, yCenter2, x12, y12, x22, y22)); // Output: false

const radius3 = 1;
const xCenter3 = 0;
const yCenter3 = 0;
const x13 = -1;
const y13 = 0;
const x23 = 0;
const y23 = 1;

console.log(checkOverlap(radius3, xCenter3, yCenter3, x13, y13, x23, y23)); // Output: true
