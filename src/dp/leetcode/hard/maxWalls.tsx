// 3661. Maximum Walls Destroyed by Robots

/**
Example 1:

Input: robots = [4], distance = [3], walls = [1,10]

Output: 1

Explanation:

robots[0] = 4 fires left with distance[0] = 3, covering [1, 4] and destroys walls[0] = 1.
Thus, the answer is 1.
Example 2:

Input: robots = [10,2], distance = [5,1], walls = [5,2,7]

Output: 3

Explanation:

robots[0] = 10 fires left with distance[0] = 5, covering [5, 10] and destroys walls[0] = 5 and walls[2] = 7.
robots[1] = 2 fires left with distance[1] = 1, covering [1, 2] and destroys walls[1] = 2.
Thus, the answer is 3.
Example 3:
Input: robots = [1,2], distance = [100,1], walls = [10]

Output: 0

Explanation:

In this example, only robots[0] can reach the wall, but its shot to the right is blocked by robots[1]; thus the answer is 0.
 */

const robots = [4],
  distance = [3],
  walls = [1, 10];

  
const maxWalls = function (
  robots: number[],
  distance: number[],
  walls: number[],
): number {
  const n = robots.length;
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = { x: robots[i], d: distance[i] };
  }
  // Sort robots by position
  arr.sort((a, b) => a.x - b.x);

  // Sort walls in ascending order
  walls.sort((a, b) => a - b);

  const uniqueWalls: number[] = [];
  let wallsAtRobots = 0;
  let rIdx = 0;

  // Filter uniquely covered walls residing exactly at robot positions
  for (let i = 0; i < walls.length; i++) {
    const w = walls[i];
    while (rIdx < n && arr[rIdx].x < w) {
      rIdx++;
    }
    if (rIdx < n && arr[rIdx].x === w) {
      wallsAtRobots++;
    } else {
      uniqueWalls.push(w);
    }
  }

  // Binary Search to accurately count the strictly scoped walls in an inclusive numeric range [L, R]
  const count_walls = (L: number, R: number): number => {
    if (L > R) return 0;
    let left = 0,
      right = uniqueWalls.length - 1;
    let startIdx = uniqueWalls.length;

    while (left <= right) {
      const mid = (left + right) >> 1;
      if (uniqueWalls[mid] >= L) {
        startIdx = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    if (startIdx === uniqueWalls.length || uniqueWalls[startIdx] > R) return 0;

    left = startIdx;
    right = uniqueWalls.length - 1;
    let endIdx = uniqueWalls.length;

    while (left <= right) {
      const mid = (left + right) >> 1;
      if (uniqueWalls[mid] > R) {
        endIdx = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return endIdx - startIdx;
  };

  // DP Initialization
  let dpL = count_walls(arr[0].x - arr[0].d, arr[0].x - 1);
  let dpR = 0;

  for (let i = 0; i < n - 1; i++) {
    const A = Math.min(arr[i + 1].x - 1, arr[i].x + arr[i].d);
    const B = Math.max(arr[i].x + 1, arr[i + 1].x - arr[i + 1].d);

    const w_LL = count_walls(B, arr[i + 1].x - 1);
    const w_RR = count_walls(arr[i].x + 1, A);

    let w_RL = 0;
    if (A >= B) {
      // Reaches overlap, evaluate whole contiguous affected sequence
      w_RL = count_walls(arr[i].x + 1, arr[i + 1].x - 1);
    } else {
      // Disjoint bounds, sum up mutually exclusive intervals safely
      w_RL = count_walls(arr[i].x + 1, A) + count_walls(B, arr[i + 1].x - 1);
    }

    const new_dpL = Math.max(dpL + w_LL, dpR + w_RL);
    const new_dpR = Math.max(dpL, dpR + w_RR); // Note: w_LR represents no coverage from neither which contributes 0 walls

    dpL = new_dpL;
    dpR = new_dpR;
  }

  const wN_R = count_walls(arr[n - 1].x + 1, arr[n - 1].x + arr[n - 1].d);
  const maxWalls = Math.max(dpL, dpR + wN_R);

  return maxWalls + wallsAtRobots;
};
console.log(maxWalls(robots, distance, walls));
