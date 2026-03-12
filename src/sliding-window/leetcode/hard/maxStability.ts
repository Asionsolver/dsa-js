// 3600. Maximize Spanning Tree Stability with Upgrades

/**

Example 1:

Input: n = 3, edges = [[0,1,2,1],[1,2,3,0]], k = 1

Output: 2

Explanation:

Edge [0,1] with strength = 2 must be included in the spanning tree.
Edge [1,2] is optional and can be upgraded from 3 to 6 using one upgrade.
The resulting spanning tree includes these two edges with strengths 2 and 6.
The minimum strength in the spanning tree is 2, which is the maximum possible stability.
Example 2:

Input: n = 3, edges = [[0,1,4,0],[1,2,3,0],[0,2,1,0]], k = 2

Output: 6

Explanation:

Since all edges are optional and up to k = 2 upgrades are allowed.
Upgrade edges [0,1] from 4 to 8 and [1,2] from 3 to 6.
The resulting spanning tree includes these two edges with strengths 8 and 6.
The minimum strength in the tree is 6, which is the maximum possible stability.
Example 3:

Input: n = 3, edges = [[0,1,1,1],[1,2,1,1],[2,0,1,1]], k = 0

Output: -1

Explanation:

All edges are mandatory and form a cycle, which violates the spanning tree property of acyclicity. Thus, the answer is -1.
*/

const n = 3,
  edges = [
    [0, 1, 1, 1],
    [1, 2, 1, 1],
    [2, 0, 1, 1],
  ],
  k = 0;

const maxSpanningTreeStability = function (
  n: number,
  edges: number[][],
  k: number,
): number {
  class DSU {
    parent: Int32Array;
    size: Int32Array;

    constructor(n: number) {
      this.parent = new Int32Array(n);
      this.size = new Int32Array(n);
      this.reset(n);
    }

    reset(n: number) {
      for (let i = 0; i < n; i++) {
        this.parent[i] = i;
        this.size[i] = 1;
      }
    }

    find(i: number): number {
      let root = i;
      while (root !== this.parent[root]) {
        root = this.parent[root];
      }
      let curr = i;
      while (curr !== root) {
        let nxt = this.parent[curr];
        this.parent[curr] = root;
        curr = nxt;
      }
      return root;
    }

    union(i: number, j: number): boolean {
      let rootI = this.find(i);
      let rootJ = this.find(j);
      if (rootI !== rootJ) {
        // Union by size
        if (this.size[rootI] < this.size[rootJ]) {
          this.parent[rootI] = rootJ;
          this.size[rootJ] += this.size[rootI];
        } else {
          this.parent[rootJ] = rootI;
          this.size[rootI] += this.size[rootJ];
        }
        return true;
      }
      return false;
    }
  }

  const dsu = new DSU(n);
  let min_must_s = 2000000;
  const E = edges.length;

  // Arrays for better performance and GC compared to flat objects
  let mustCount = 0;
  const mustU = new Int32Array(E);
  const mustV = new Int32Array(E);
  const mustS = new Int32Array(E);

  let optCount = 0;
  const optU = new Int32Array(E);
  const optV = new Int32Array(E);
  const optS = new Int32Array(E);

  let components = n;

  // 1. Separate edges and instantly check mandatory edges cycle validity
  for (let i = 0; i < E; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    const s = edges[i][2];
    const must = edges[i][3];

    if (must === 1) {
      mustU[mustCount] = u;
      mustV[mustCount] = v;
      mustS[mustCount] = s;
      mustCount++;
      if (s < min_must_s) min_must_s = s;

      if (dsu.union(u, v)) {
        components--;
      } else {
        return -1; // Cycle present within mandatory edges
      }
    } else {
      optU[optCount] = u;
      optV[optCount] = v;
      optS[optCount] = s;
      optCount++;
    }
  }

  // 2. Initial overarching connectivity check encompassing optional boundaries
  let tempComponents = components;
  for (let i = 0; i < optCount; i++) {
    if (dsu.union(optU[i], optV[i])) {
      tempComponents--;
      if (tempComponents === 1) break;
    }
  }

  if (tempComponents > 1) {
    return -1; // The graph cannot be connected even incorporating all probable edges without cycle
  }

  // 3. Binary search capability function
  function check(X: number): boolean {
    dsu.reset(n);
    let comps = n;

    for (let i = 0; i < mustCount; i++) {
      if (dsu.union(mustU[i], mustV[i])) {
        comps--;
      }
    }
    if (comps === 1) return true;

    for (let i = 0; i < optCount; i++) {
      if (optS[i] >= X) {
        // Cost-0 edge handling phase
        if (dsu.union(optU[i], optV[i])) {
          comps--;
          if (comps === 1) return true;
        }
      }
    }

    let upgradesUsed = 0;
    for (let i = 0; i < optCount; i++) {
      if (optS[i] < X && 2 * optS[i] >= X) {
        // Cost-1 edge handling phase
        if (dsu.union(optU[i], optV[i])) {
          comps--;
          upgradesUsed++;
          if (upgradesUsed > k) return false;
          if (comps === 1) return true;
        }
      }
    }

    return false;
  }

  // 4. Maximum extraction binary search setup processing
  let ans = -1;
  let low = 1,
    high = min_must_s === 2000000 ? 200000 : min_must_s;

  while (low <= high) {
    let mid = (low + high) >>> 1;
    if (check(mid)) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return ans;
};

console.log(maxSpanningTreeStability(n, edges, k));
