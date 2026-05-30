// 3161. Block Placement Queries

/**
Example 1:

Input: queries = [[1,2],[2,3,3],[2,3,1],[2,2,2]]

Output: [false,true,true]

Explanation:



For query 0, place an obstacle at x = 2. A block of size at most 2 can be placed before x = 3.

Example 2:

Input: queries = [[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]]

Output: [true,true,false]

Explanation:



Place an obstacle at x = 7 for query 0. A block of size at most 7 can be placed before x = 7.
Place an obstacle at x = 2 for query 2. Now, a block of size at most 5 can be placed before x = 7, and a block of size at most 2 before x = 2.

*/

function getResults(queries: number[][]): boolean[] {
  let M = 0;
  // Find the maximum limit of our number line bounds
  for (let i = 0; i < queries.length; i++) {
    if (queries[i][1] > M) {
      M = queries[i][1];
    }
  }

  // We use a flat Int32Array for performance reasons
  // Layout per node (4 spaces): [has_obs, min_val, max_val, max_gap]
  const treeSize = M + 1;
  const tree = new Int32Array(16 * treeSize);

  function build(node: number, L: number, R: number) {
    const base = node << 2;
    if (L === R) {
      if (L === 0) {
        tree[base] = 1; // has_obs
        tree[base + 1] = 0; // min_val
        tree[base + 2] = 0; // max_val
        tree[base + 3] = 0; // max_gap
      } else {
        tree[base] = 0;
        tree[base + 1] = 1e9;
        tree[base + 2] = -1e9;
        tree[base + 3] = 0;
      }
      return;
    }

    const mid = (L + R) >> 1;
    const left = node << 1;
    const right = left | 1;

    build(left, L, mid);
    build(right, mid + 1, R);

    const lBase = left << 2;
    const rBase = right << 2;

    tree[base] = tree[lBase] | tree[rBase];
    if (tree[base] === 1) {
      tree[base + 1] = tree[lBase] === 1 ? tree[lBase + 1] : tree[rBase + 1];
      tree[base + 2] = tree[rBase] === 1 ? tree[rBase + 2] : tree[lBase + 2];
      let mg =
        tree[lBase + 3] > tree[rBase + 3] ? tree[lBase + 3] : tree[rBase + 3];
      if (tree[lBase] === 1 && tree[rBase] === 1) {
        const cross = tree[rBase + 1] - tree[lBase + 2];
        if (cross > mg) mg = cross;
      }
      tree[base + 3] = mg;
    } else {
      tree[base + 1] = 1e9;
      tree[base + 2] = -1e9;
      tree[base + 3] = 0;
    }
  }

  function update(node: number, L: number, R: number, x: number) {
    const base = node << 2;
    if (L === R) {
      tree[base] = 1;
      tree[base + 1] = x;
      tree[base + 2] = x;
      tree[base + 3] = 0;
      return;
    }

    const mid = (L + R) >> 1;
    const left = node << 1;
    const right = left | 1;

    if (x <= mid) {
      update(left, L, mid, x);
    } else {
      update(right, mid + 1, R, x);
    }

    const lBase = left << 2;
    const rBase = right << 2;

    tree[base] = tree[lBase] | tree[rBase];
    if (tree[base] === 1) {
      tree[base + 1] = tree[lBase] === 1 ? tree[lBase + 1] : tree[rBase + 1];
      tree[base + 2] = tree[rBase] === 1 ? tree[rBase + 2] : tree[lBase + 2];
      let mg =
        tree[lBase + 3] > tree[rBase + 3] ? tree[lBase + 3] : tree[rBase + 3];
      if (tree[lBase] === 1 && tree[rBase] === 1) {
        const cross = tree[rBase + 1] - tree[lBase + 2];
        if (cross > mg) mg = cross;
      }
      tree[base + 3] = mg;
    } else {
      tree[base + 1] = 1e9;
      tree[base + 2] = -1e9;
      tree[base + 3] = 0;
    }
  }

  let q_has = 0;
  let q_max = -1e9;
  let q_gap = 0;

  function query(node: number, L: number, R: number, qL: number, qR: number) {
    const base = node << 2;
    if (qL <= L && R <= qR) {
      if (q_has === 0) {
        q_has = tree[base];
        q_max = tree[base + 2];
        q_gap = tree[base + 3];
      } else {
        if (tree[base] === 1) {
          let mg = tree[base + 3];
          let cross = tree[base + 1] - q_max;
          if (mg > q_gap) q_gap = mg;
          if (cross > q_gap) q_gap = cross;
          q_max = tree[base + 2];
        }
      }
      return;
    }

    const mid = (L + R) >> 1;
    if (qL <= mid) query(node << 1, L, mid, qL, qR);
    if (qR > mid) query((node << 1) | 1, mid + 1, R, qL, qR);
  }

  build(1, 0, M);

  const results: boolean[] = [];

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    if (q[0] === 1) {
      update(1, 0, M, q[1]);
    } else {
      const x = q[1];
      const sz = q[2];

      // Re-eval query states dynamically
      q_has = 0;
      q_max = -1e9;
      q_gap = 0;

      query(1, 0, M, 0, x);

      let max_possible = q_gap;
      const end_space = x - q_max;
      if (end_space > max_possible) {
        max_possible = end_space;
      }

      results.push(max_possible >= sz);
    }
  }

  return results;
}

// Example usage:
const queries1 = [
  [1, 2],
  [2, 3, 3],
  [2, 3, 1],
  [2, 2, 2],
];
console.log(getResults(queries1)); // Output: [false,true,true]

const queries2 = [
  [1, 7],
  [2, 7, 6],
  [1, 2],
  [2, 7, 5],
  [2, 7, 6],
];
console.log(getResults(queries2)); // Output: [true,true,false]
