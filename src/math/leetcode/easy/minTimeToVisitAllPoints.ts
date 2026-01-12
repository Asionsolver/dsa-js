// 1266. Minimum Time Visiting All Points

/**
Example 1:


Input: points = [[1,1],[3,4],[-1,0]]
Output: 7
Explanation: One optimal path is [1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]   
Time from [1,1] to [3,4] = 3 seconds 
Time from [3,4] to [-1,0] = 4 seconds
Total time = 7 seconds
Example 2:

Input: points = [[3,2],[-2,2]]
Output: 5

*/

const points = [
  [1, 1],
  [3, 4],
  [-1, 0],
];

function minTimeToVisitAllPoints(points: number[][]): number {
  let totalTime = 0;

  // Iterate through the array of points, stopping before the last one
  for (let i = 0; i < points.length - 1; i++) {
    const [currentX, currentY] = points[i];
    const [nextX, nextY] = points[i + 1];

    // Calculate absolute differences
    const dx = Math.abs(nextX - currentX);
    const dy = Math.abs(nextY - currentY);

    // The time taken between two points is the maximum of the
    // horizontal difference or vertical difference.
    // This is because diagonal moves cover both x and y distance simultaneously.
    totalTime += Math.max(dx, dy);
  }

  return totalTime;
}

console.log(minTimeToVisitAllPoints(points));
