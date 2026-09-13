// 835. Image Overlap

/**
You are given two images, img1 and img2, represented as binary, square matrices of size n x n. A binary matrix has only 0s and 1s as values.

We translate one image however we choose by sliding all the 1 bits left, right, up, and/or down any number of units. We then place it on top of the other image. We can then calculate the overlap by counting the number of positions that have a 1 in both images.

Note also that a translation does not include any kind of rotation. Any 1 bits that are translated outside of the matrix borders are erased.

Return the largest possible overlap.
*/

/**
Example 1:


Input: img1 = [[1,1,0],[0,1,0],[0,1,0]], img2 = [[0,0,0],[0,1,1],[0,0,1]]
Output: 3
Explanation: We translate img1 to right by 1 unit and down by 1 unit.

The number of positions that have a 1 in both images is 3 (shown in red).

Example 2:

Input: img1 = [[1]], img2 = [[1]]
Output: 1
Example 3:

Input: img1 = [[0]], img2 = [[0]]
Output: 0
*/

/**
Constraints:

n == img1.length == img1[i].length
n == img2.length == img2[i].length
1 <= n <= 30
img1[i][j] is either 0 or 1.
img2[i][j] is either 0 or 1.
*/

// Brute Force Approach
// function largestOverlap(img1: number[][], img2: number[][]): number {
//   const n = img1.length;
//   const points1: [number, number][] = [];
//   const points2: [number, number][] = [];

//   // Collect coordinates of all 1s from both images.
//   for (let r = 0; r < n; r++) {
//     for (let c = 0; c < n; c++) {
//       if (img1[r][c] === 1) {
//         points1.push([r, c]);
//       }
//       if (img2[r][c] === 1) {
//         points2.push([r, c]);
//       }
//     }
//   }

//   // Map to count occurrences of each shift vector (dr, dc).
//   const shiftCounts = new Map<string, number>();
//   let maxOverlap = 0;

//   // Calculate displacement vector between every pair of 1s.
//   for (const [r1, c1] of points1) {
//     for (const [r2, c2] of points2) {
//       const dr = r2 - r1;
//       const dc = c2 - c1;
//       const key = `${dr},${dc}`;

//       // Increment frequency count for this specific shift.
//       const count = (shiftCounts.get(key) || 0) + 1;
//       shiftCounts.set(key, count);

//       // Keep track of the maximum overlap found.
//       if (count > maxOverlap) {
//         maxOverlap = count;
//       }
//     }
//   }

//   return maxOverlap;
// }

// Optimized Approach
function largestOverlap(img1: number[][], img2: number[][]): number {
  const n = img1.length;
  let maxOverlap = 0;

  // Try all possible row shifts from -(n - 1) to (n - 1).
  for (let dr = -(n - 1); dr < n; dr++) {
    // Try all possible column shifts from -(n - 1) to (n - 1).
    for (let dc = -(n - 1); dc < n; dc++) {
      let currentOverlap = 0;

      // Iterate through every cell in img1.
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          const targetR = r + dr;
          const targetC = c + dc;

          // Check if the translated coordinate is within bounds and both cells contain 1.
          if (
            targetR >= 0 &&
            targetR < n &&
            targetC >= 0 &&
            targetC < n &&
            img1[r][c] === 1 &&
            img2[targetR][targetC] === 1
          ) {
            currentOverlap++;
          }
        }
      }

      // Update the maximum overlap found so far.
      maxOverlap = Math.max(maxOverlap, currentOverlap);
    }
  }

  return maxOverlap;
}
// Example usage:
const img1 = [
  [1, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
];
const img2 = [
  [0, 0, 0],
  [0, 1, 1],
  [0, 0, 1],
];

console.log(largestOverlap(img1, img2)); // Output: 3

const img3 = [[1]];
const img4 = [[1]];

console.log(largestOverlap(img3, img4)); // Output: 1

const img5 = [[0]];
const img6 = [[0]];

console.log(largestOverlap(img5, img6)); // Output: 0
