// 3047. Find the Largest Area of Square Inside Two Rectangles

/**
Example 1:


Input: bottomLeft = [[1,1],[2,2],[3,1]], topRight = [[3,3],[4,4],[6,6]]

Output: 1

Explanation:

A square with side length 1 can fit inside either the intersecting region of rectangles 0 and 1 or the intersecting region of rectangles 1 and 2. Hence the maximum area is 1. It can be shown that a square with a greater side length can not fit inside any intersecting region of two rectangles.

Example 2:


Input: bottomLeft = [[1,1],[1,3],[1,5]], topRight = [[5,5],[5,7],[5,9]]

Output: 4

Explanation:

A square with side length 2 can fit inside either the intersecting region of rectangles 0 and 1 or the intersecting region of rectangles 1 and 2. Hence the maximum area is 2 * 2 = 4. It can be shown that a square with a greater side length can not fit inside any intersecting region of two rectangles.

Example 3:

  
Input: bottomLeft = [[1,1],[2,2],[1,2]], topRight = [[3,3],[4,4],[3,4]]

Output: 1

Explanation:

A square with side length 1 can fit inside the intersecting region of any two rectangles. Also, no larger square can, so the maximum area is 1. Note that the region can be formed by the intersection of more than 2 rectangles.

Example 4:

  
Input: bottomLeft = [[1,1],[3,3],[3,1]], topRight = [[2,2],[4,4],[4,2]]

Output: 0

Explanation:

No pair of rectangles intersect, hence, the answer is 0.
*/

const bottomLeft = [
    [1, 1],
    [1, 3],
    [1, 5],
  ],
  topRight = [
    [5, 5],
    [5, 7],
    [5, 9],
  ];

const largestSquareArea = function (
  bottomLeft: number[][],
  topRight: number[][]
): number {
  let maxSide = 0;
  const n = bottomLeft.length;

  // Iterate through every unique pair of rectangles
  for (let i = 0; i < n; i++) {
    const ax1 = bottomLeft[i][0];
    const ay1 = bottomLeft[i][1];
    const ax2 = topRight[i][0];
    const ay2 = topRight[i][1];

    for (let j = i + 1; j < n; j++) {
      const bx1 = bottomLeft[j][0];
      const by1 = bottomLeft[j][1];
      const bx2 = topRight[j][0];
      const by2 = topRight[j][1];

      // Find the coordinates of the intersection rectangle
      // Max of the bottom-lefts
      const interX1 = Math.max(ax1, bx1);
      const interY1 = Math.max(ay1, by1);

      // Min of the top-rights
      const interX2 = Math.min(ax2, bx2);
      const interY2 = Math.min(ay2, by2);

      // Calculate width and height of the intersection
      const width = interX2 - interX1;
      const height = interY2 - interY1;

      // Check if there is a valid intersection
      if (width > 0 && height > 0) {
        // The largest square fits into the smallest dimension of the intersection
        const currentSide = Math.min(width, height);
        if (currentSide > maxSide) {
          maxSide = currentSide;
        }
      }
    }
  }

  // Return the area. Use BigInt multiplication if numbers were larger,
  // but 10^14 fits in standard JS number type.
  return maxSide * maxSide;
};

console.log(largestSquareArea(bottomLeft, topRight));
