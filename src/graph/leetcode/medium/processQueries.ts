// 3607. Power Grid Maintenance

/**
Example 1:

Input: c = 5, connections = [[1,2],[2,3],[3,4],[4,5]], queries = [[1,3],[2,1],[1,1],[2,2],[1,2]]

Output: [3,2,3]

Explanation:



Initially, all stations {1, 2, 3, 4, 5} are online and form a single power grid.
Query [1,3]: Station 3 is online, so the maintenance check is resolved by station 3.
Query [2,1]: Station 1 goes offline. The remaining online stations are {2, 3, 4, 5}.
Query [1,1]: Station 1 is offline, so the check is resolved by the operational station with the smallest id among {2, 3, 4, 5}, which is station 2.
Query [2,2]: Station 2 goes offline. The remaining online stations are {3, 4, 5}.
Query [1,2]: Station 2 is offline, so the check is resolved by the operational station with the smallest id among {3, 4, 5}, which is station 3.
Example 2:

Input: c = 3, connections = [], queries = [[1,1],[2,1],[1,1]]

Output: [1,-1]

Explanation:

There are no connections, so each station is its own isolated grid.
Query [1,1]: Station 1 is online in its isolated grid, so the maintenance check is resolved by station 1.
Query [2,1]: Station 1 goes offline.
Query [1,1]: Station 1 is offline and there are no other stations in its grid, so the result is -1.
*/

const c = 5,
  connections = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ],
  queries = [
    [1, 3],
    [2, 1],
    [1, 1],
    [2, 2],
    [1, 2],
  ];

const processQueries = function (
  c: number,
  connections: number[][],
  queries: number[][]
) {
  // 1. DSU setup to find connected components (power grids)
  const parent = new Int32Array(c + 1);
  const rank = new Int32Array(c + 1);
  for (let i = 1; i <= c; i++) {
    parent[i] = i;
  }

  function find(i: number): number {
    let root = i;
    while (parent[root] !== root) {
      root = parent[root];
    }
    // Path compression
    while (parent[i] !== root) {
      const next = parent[i];
      parent[i] = root;
      i = next;
    }
    return root;
  }

  function union(i: number, j: number): void {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      if (rank[rootI] < rank[rootJ]) {
        parent[rootI] = rootJ;
      } else if (rank[rootI] > rank[rootJ]) {
        parent[rootJ] = rootI;
      } else {
        parent[rootI] = rootJ;
        rank[rootJ]++;
      }
    }
  }

  // Connect stations based on cables
  for (let i = 0; i < connections.length; i++) {
    union(connections[i][0], connections[i][1]);
  }

  // 2. Pre-calculate the root of each station and group stations by their grid
  const roots = new Int32Array(c + 1);
  const counts = new Int32Array(c + 1);
  for (let i = 1; i <= c; i++) {
    const r = find(i);
    roots[i] = r;
    counts[r]++;
  }

  // Create a flat array storage for grid members
  const offsets = new Int32Array(c + 2);
  for (let i = 1; i <= c; i++) {
    offsets[i + 1] = offsets[i] + counts[i];
  }

  const flatMembers = new Int32Array(c);
  const currentOffset = new Int32Array(c + 1);
  // By iterating 1 to c, each grid's members are inserted in sorted order
  for (let i = 1; i <= c; i++) {
    const r = roots[i];
    flatMembers[offsets[r] + currentOffset[r]] = i;
    currentOffset[r]++;
  }

  // 3. Status Tracking
  const isOnline = new Uint8Array(c + 1).fill(1); // 1 = online, 0 = offline
  const pointers = new Int32Array(c + 1).fill(0); // tracks current min index per grid root
  const results: number[] = [];

  // 4. Process Queries
  for (let i = 0; i < queries.length; i++) {
    const type = queries[i][0];
    const x = queries[i][1];

    if (type === 1) {
      // Maintenance check
      if (isOnline[x] === 1) {
        results.push(x);
      } else {
        const r = roots[x];
        const start = offsets[r];
        const end = offsets[r + 1];
        let ptr = pointers[r];

        // Advance the pointer to the first station that is still online
        while (start + ptr < end && isOnline[flatMembers[start + ptr]] === 0) {
          ptr++;
        }
        pointers[r] = ptr; // Update pointer to skip offline nodes permanently

        if (start + ptr < end) {
          results.push(flatMembers[start + ptr]);
        } else {
          results.push(-1);
        }
      }
    } else {
      // Station goes offline
      isOnline[x] = 0;
    }
  }

  return results;
};

console.log(processQueries(c, connections, queries));
