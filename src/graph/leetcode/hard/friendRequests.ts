// 2076. Process Restricted Friend Requests

/**
Example 1:

Input: n = 3, restrictions = [[0,1]], requests = [[0,2],[2,1]]
Output: [true,false]
Explanation:
Request 0: Person 0 and person 2 can be friends, so they become direct friends. 
Request 1: Person 2 and person 1 cannot be friends since person 0 and person 1 would be indirect friends (1--2--0).
Example 2:

Input: n = 3, restrictions = [[0,1]], requests = [[1,2],[0,2]]
Output: [true,false]
Explanation:
Request 0: Person 1 and person 2 can be friends, so they become direct friends.
Request 1: Person 0 and person 2 cannot be friends since person 0 and person 1 would be indirect friends (0--2--1).
Example 3:

Input: n = 5, restrictions = [[0,1],[1,2],[2,3]], requests = [[0,4],[1,2],[3,1],[3,4]]
Output: [true,false,true,false]
Explanation:
Request 0: Person 0 and person 4 can be friends, so they become direct friends.
Request 1: Person 1 and person 2 cannot be friends since they are directly restricted.
Request 2: Person 3 and person 1 can be friends, so they become direct friends.
Request 3: Person 3 and person 4 cannot be friends since person 0 and person 1 would be indirect friends (0--4--3--1).
*/

const friendRequests = function (
  n: number,
  restrictions: number[][],
  requests: number[][],
): boolean[] {
  // Initialize Disjoint Set Union (DSU) arrays
  const parent = new Int32Array(n);
  const rank = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    parent[i] = i;
  }

  // Find with path compression
  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  // Union by rank
  function union(x: number, y: number): void {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
      } else if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
      } else {
        parent[rootY] = rootX;
        rank[rootX]++;
      }
    }
  }

  const result: boolean[] = [];

  // Process each friend request
  for (let i = 0; i < requests.length; i++) {
    const u = requests[i][0];
    const v = requests[i][1];

    const rootU = find(u);
    const rootV = find(v);

    // If they are already in the same set, they are already friends
    if (rootU === rootV) {
      result.push(true);
      continue;
    }

    let isValid = true;

    // Check against all restrictions
    for (let j = 0; j < restrictions.length; j++) {
      const x = restrictions[j][0];
      const y = restrictions[j][1];

      const rootX = find(x);
      const rootY = find(y);

      // If grouping rootU and rootV merges the restricted groups rootX and rootY
      if (
        (rootX === rootU && rootY === rootV) ||
        (rootX === rootV && rootY === rootU)
      ) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      union(rootU, rootV);
      result.push(true);
    } else {
      result.push(false);
    }
  }

  return result;
};

console.log(
  friendRequests(
    3,
    [[0, 1]],
    [
      [1, 2],
      [0, 2],
    ],
  ),
); // Output: [true, false]

console.log(
  friendRequests(
    5,
    [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
    [
      [0, 4],
      [1, 2],
      [3, 1],
      [3, 4],
    ],
  ),
); // Output: [true, false, true, false]
