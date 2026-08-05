// 3310. Remove Methods From Project

/**
You are maintaining a project that has n methods numbered from 0 to n - 1.

You are given two integers n and k, and a 2D integer array invocations, where invocations[i] = [ai, bi] indicates that method ai invokes method bi.

There is a known bug in method k. Method k, along with any method invoked by it, either directly or indirectly, are considered suspicious and we aim to remove them.

A group of methods can only be removed if no method outside the group invokes any methods within it.

Return an array containing all the remaining methods after removing all the suspicious methods. You may return the answer in any order. If it is not possible to remove all the suspicious methods, none should be removed.


 */

/**
Example 1:

Input: n = 4, k = 1, invocations = [[1,2],[0,1],[3,2]]

Output: [0,1,2,3]

Explanation:



Method 2 and method 1 are suspicious, but they are directly invoked by methods 3 and 0, which are not suspicious. We return all elements without removing anything.

Example 2:

Input: n = 5, k = 0, invocations = [[1,2],[0,2],[0,1],[3,4]]

Output: [3,4]

Explanation:



Methods 0, 1, and 2 are suspicious and they are not directly invoked by any other method. We can remove them.

Example 3:

Input: n = 3, k = 2, invocations = [[1,2],[0,1],[2,0]]

Output: []

Explanation:



All methods are suspicious. We can remove them.


*/

/**
Constraints:

1 <= n <= 105
0 <= k <= n - 1
0 <= invocations.length <= 2 * 105
invocations[i] == [ai, bi]
0 <= ai, bi <= n - 1
ai != bi
invocations[i] != invocations[j]
*/

function remainingMethods(
  n: number,
  k: number,
  invocations: number[][],
): number[] {
  // Step 1: Build the adjacency list for the directed graph
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of invocations) {
    adj[u].push(v);
  }

  // Step 2: Use BFS to find all suspicious methods reachable from k
  const visited = new Uint8Array(n);
  const queue: number[] = [k];
  visited[k] = 1;
  let head = 0;

  while (head < queue.length) {
    const u = queue[head++];
    for (const v of adj[u]) {
      if (visited[v] === 0) {
        visited[v] = 1;
        queue.push(v);
      }
    }
  }

  // Step 3: Check if there's any invocation from a non-suspicious method to a suspicious one
  let canRemove = true;
  for (const [u, v] of invocations) {
    if (visited[u] === 0 && visited[v] === 1) {
      canRemove = false;
      break;
    }
  }

  // Step 4: Return the result based on the verification
  const result: number[] = [];
  if (canRemove) {
    for (let i = 0; i < n; i++) {
      if (visited[i] === 0) {
        result.push(i);
      }
    }
  } else {
    for (let i = 0; i < n; i++) {
      result.push(i);
    }
  }

  return result;
}

// Example usage:
const n = 5;
const k = 0;
const invocations = [
  [1, 2],
  [0, 2],
  [0, 1],
  [3, 4],
];
console.log(remainingMethods(n, k, invocations)); // Output: [3, 4]

const n2 = 4;
const k2 = 1;
const invocations2 = [
  [1, 2],
  [0, 1],
  [3, 2],
];
console.log(remainingMethods(n2, k2, invocations2)); // Output: [0, 1, 2, 3]

const n3 = 3;
const k3 = 2;
const invocations3 = [
  [1, 2],
  [0, 1],
  [2, 0],
];
console.log(remainingMethods(n3, k3, invocations3)); // Output: []
