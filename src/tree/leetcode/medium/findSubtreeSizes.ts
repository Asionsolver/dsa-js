// 3331. Find Subtree Sizes After Changes

/**
You are given a tree rooted at node 0 that consists of n nodes numbered from 0 to n - 1. The tree is represented by an array parent of size n, where parent[i] is the parent of node i. Since node 0 is the root, parent[0] == -1.

You are also given a string s of length n, where s[i] is the character assigned to node i.

We make the following changes on the tree one time simultaneously for all nodes x from 1 to n - 1:

Find the closest node y to node x such that y is an ancestor of x, and s[x] == s[y].
If node y does not exist, do nothing.
Otherwise, remove the edge between x and its current parent and make node y the new parent of x by adding an edge between them.
Return an array answer of size n where answer[i] is the size of the subtree rooted at node i in the final tree.
*/

/**
Example 1:

Input: parent = [-1,0,0,1,1,1], s = "abaabc"

Output: [6,3,1,1,1,1]

Explanation:


The parent of node 3 will change from node 1 to node 0.

Example 2:

Input: parent = [-1,0,4,0,1], s = "abbba"

Output: [5,2,1,1,1]

Explanation:


The following changes will happen at the same time:

The parent of node 4 will change from node 1 to node 0.
The parent of node 2 will change from node 4 to node 1.
*/

/**
Constraints:

n == parent.length == s.length
1 <= n <= 105
0 <= parent[i] <= n - 1 for all i >= 1.
parent[0] == -1
parent represents a valid tree.
s consists only of lowercase English letters.
*/

//  Brute Force Approach: TLE
// function findSubtreeSizes(parent: number[], s: string): number[] {
//   const n = parent.length;

//   // Copy parent array to store the updated parent of each node.
//   const newParent = [...parent];

//   // For each node, walk up the original tree to find the closest matching ancestor.
//   for (let x = 1; x < n; x++) {
//     let curr = parent[x];

//     while (curr !== -1) {
//       // Stop at the first ancestor that has the same character as node x.
//       if (s[curr] === s[x]) {
//         newParent[x] = curr;
//         break;
//       }
//       curr = parent[curr];
//     }
//   }

//   // Build adjacency list for the final tree after all changes.
//   const newChildren: number[][] = Array.from({ length: n }, () => []);
//   for (let i = 1; i < n; i++) {
//     newChildren[newParent[i]].push(i);
//   }

//   // Traverse top-down via BFS so every parent appears before its children.
//   const order: number[] = [0];
//   for (let idx = 0; idx < order.length; idx++) {
//     const node = order[idx];
//     for (const child of newChildren[node]) {
//       order.push(child);
//     }
//   }

//   // Initialize every subtree size to 1 (counting the node itself).
//   const answer = new Array<number>(n).fill(1);

//   // Add each child's subtree size to its new parent from bottom to top.
//   for (let i = order.length - 1; i >= 1; i--) {
//     const node = order[i];
//     answer[newParent[node]] += answer[node];
//   }

//   return answer;
// }

// Optimized Approach: O(n) time and O(n) space
function findSubtreeSizes(parent: number[], s: string): number[] {
  const n = parent.length;

  // Build adjacency list for the original tree.
  const children: number[][] = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    children[parent[i]].push(i);
  }

  // Store the updated parent of each node after simultaneous changes.
  const newParent = [...parent];

  // Track the closest ancestor index for each character ('a' to 'z') on the current DFS path.
  const lastSeen = new Array<number>(26).fill(-1);

  // Store the previous closest ancestor so we can restore it during backtracking.
  const prevAncestor = new Array<number>(n).fill(-1);

  // Use an explicit stack for iterative DFS to avoid recursion stack overflow on large skewed trees.
  const stack: number[] = [0];

  while (stack.length > 0) {
    const curr = stack.pop()!;

    if (curr >= 0) {
      const node = curr;
      const charIdx = s.charCodeAt(node) - 97;

      // If an ancestor with the same character exists on the current path, update newParent.
      if (lastSeen[charIdx] !== -1) {
        newParent[node] = lastSeen[charIdx];
      }

      // Save the previous ancestor and set the current node as the closest ancestor for this character.
      prevAncestor[node] = lastSeen[charIdx];
      lastSeen[charIdx] = node;

      // Push exit marker (~node) before children so state is restored only after all children finish.
      stack.push(~node);

      for (const child of children[node]) {
        stack.push(child);
      }
    } else {
      const node = ~curr;
      const charIdx = s.charCodeAt(node) - 97;

      // Restore the previous closest ancestor when leaving this node's subtree.
      lastSeen[charIdx] = prevAncestor[node];
    }
  }

  // Build adjacency list for the final tree.
  const newChildren: number[][] = Array.from({ length: n }, () => []);
  for (let i = 1; i < n; i++) {
    newChildren[newParent[i]].push(i);
  }

  // Collect nodes in top-down order using BFS so every parent comes before its children.
  const order: number[] = [0];
  for (let idx = 0; idx < order.length; idx++) {
    const node = order[idx];
    for (const child of newChildren[node]) {
      order.push(child);
    }
  }

  // Initialize each node's subtree size to 1 (counting itself).
  const answer = new Array<number>(n).fill(1);

  // Accumulate subtree sizes bottom-up from leaves to root.
  for (let i = order.length - 1; i >= 1; i--) {
    const node = order[i];
    answer[newParent[node]] += answer[node];
  }

  return answer;
}

// Example usage:
const parent1 = [-1, 0, 0, 1, 1, 1];
const s1 = "abaabc";
console.log(findSubtreeSizes(parent1, s1)); // Output: [6, 3, 1, 1, 1, 1]

const parent2 = [-1, 0, 4, 0, 1];
const s2 = "abbba";
console.log(findSubtreeSizes(parent2, s2)); // Output: [5, 2, 1, 1, 1]
