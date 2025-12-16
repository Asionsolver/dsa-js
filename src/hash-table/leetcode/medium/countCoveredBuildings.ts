// 3531. Count Covered Buildings

/**
 Example 1:



Input: n = 3, buildings = [[1,2],[2,2],[3,2],[2,1],[2,3]]

Output: 1

Explanation:

Only building [2,2] is covered as it has at least one building:
above ([1,2])
below ([3,2])
left ([2,1])
right ([2,3])
Thus, the count of covered buildings is 1.
Example 2:



Input: n = 3, buildings = [[1,1],[1,2],[2,1],[2,2]]

Output: 0

Explanation:

No building has at least one building in all four directions.
Example 3:



Input: n = 5, buildings = [[1,3],[3,2],[3,3],[3,5],[5,3]]

Output: 1

Explanation:

Only building [3,3] is covered as it has at least one building:
above ([1,3])
below ([5,3])
left ([3,2])
right ([3,5])
Thus, the count of covered buildings is 1.

 */

const n = 3,
  buildings = [
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
  ];
const countCoveredBuildings = function (n: number, buildings: number[][]) {
  // Initialize boundary arrays.
  // Since coordinates are 1-based (1 to n), we size arrays to n + 1.
  // rowMin[x] stores the smallest 'y' found in row 'x'
  // rowMax[x] stores the largest 'y' found in row 'x'
  // colMin[y] stores the smallest 'x' found in column 'y'
  // colMax[y] stores the largest 'x' found in column 'y'

  const rowMin = new Int32Array(n + 1).fill(200000); // Initialize with a value > max n (10^5)
  const rowMax = new Int32Array(n + 1).fill(-1);
  const colMin = new Int32Array(n + 1).fill(200000);
  const colMax = new Int32Array(n + 1).fill(-1);

  // Pass 1: Determine the boundaries for each row and column
  for (let i = 0; i < buildings.length; i++) {
    const x = buildings[i][0];
    const y = buildings[i][1];

    if (y < rowMin[x]) rowMin[x] = y;
    if (y > rowMax[x]) rowMax[x] = y;

    if (x < colMin[y]) colMin[y] = x;
    if (x > colMax[y]) colMax[y] = x;
  }

  let coveredCount = 0;

  // Pass 2: Check if each building is strictly inside its row/col boundaries
  for (let i = 0; i < buildings.length; i++) {
    const x = buildings[i][0];
    const y = buildings[i][1];

    // Check Horizontal: building is not the leftmost AND not the rightmost in its row
    const isCoveredHorizontally = y > rowMin[x] && y < rowMax[x];

    // Check Vertical: building is not the topmost AND not the bottommost in its column
    const isCoveredVertically = x > colMin[y] && x < colMax[y];

    if (isCoveredHorizontally && isCoveredVertically) {
      coveredCount++;
    }
  }

  return coveredCount;
};

console.log(countCoveredBuildings(n, buildings));
