// 1697. Checking Existence of Edge Length Limited Paths

/**
Example 1:


Input: n = 3, edgeList = [[0,1,2],[1,2,4],[2,0,8],[1,0,16]], queries = [[0,1,2],[0,2,5]]
Output: [false,true]
Explanation: The above figure shows the given graph. Note that there are two overlapping edges between 0 and 1 with distances 2 and 16.
For the first query, between 0 and 1 there is no path where each distance is less than 2, thus we return false for this query.
For the second query, there is a path (0 -> 1 -> 2) of two edges with distances less than 5, thus we return true for this query.
Example 2:


Input: n = 5, edgeList = [[0,1,10],[1,2,5],[2,3,9],[3,4,13]], queries = [[0,4,14],[1,4,13]]
Output: [true,false]
Explanation: The above figure shows the given graph.
 
*/

class DSU {
  private parent: Int32Array;
  private rank: Int32Array;

  constructor(n: number) {
    this.parent = new Int32Array(n);
    this.rank = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.rank[i] = 1;
    }
  }

  find(i: number): number {
    if (this.parent[i] === i) {
      return i;
    }
    // Path compression
    return (this.parent[i] = this.find(this.parent[i]));
  }

  union(i: number, j: number): void {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI !== rootJ) {
      // Union by rank
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
    }
  }
}

function distanceLimitedPathsExist(
  n: number,
  edgeList: number[][],
  queries: number[][],
): boolean[] {
  const qCount = queries.length;

  // Create an index array to keep track of original query positions
  const queryIndices = Array.from({ length: qCount }, (_, i) => i);

  // Sort query indices based on the limit parameter in ascending order
  queryIndices.sort((a, b) => queries[a][2] - queries[b][2]);

  // Sort edges based on their distance in ascending order
  edgeList.sort((a, b) => a[2] - b[2]);

  const dsu = new DSU(n);
  const result = new Array<boolean>(qCount);
  let edgeIndex = 0;
  const edgeCount = edgeList.length;

  for (let i = 0; i < qCount; i++) {
    const queryIdx = queryIndices[i];
    const [p, q, limit] = queries[queryIdx];

    // Union all edges that are strictly smaller than the current query's limit
    while (edgeIndex < edgeCount && edgeList[edgeIndex][2] < limit) {
      dsu.union(edgeList[edgeIndex][0], edgeList[edgeIndex][1]);
      edgeIndex++;
    }

    // Determine if p and q are connected within the current limits
    result[queryIdx] = dsu.find(p) === dsu.find(q);
  }

  return result;
}

// Example usage:
const n1 = 3;
const edgeList1 = [
  [0, 1, 2],
  [1, 2, 4],
  [2, 0, 8],
  [1, 0, 16],
];
const queries1 = [
  [0, 1, 2],
  [0, 2, 5],
];
console.log(distanceLimitedPathsExist(n1, edgeList1, queries1)); // Output: [false, true]

const n2 = 5;
const edgeList2 = [
  [0, 1, 10],
  [1, 2, 5],
  [2, 3, 9],
  [3, 4, 13],
];
const queries2 = [
  [0, 4, 14],
  [1, 4, 13],
];
console.log(distanceLimitedPathsExist(n2, edgeList2, queries2)); // Output: [true, false]
