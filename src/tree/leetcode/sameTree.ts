// 100. Same Tree

import { sign } from "crypto";

/**

Example 1:


Input: p = [1,2,3], q = [1,2,3]
Output: true
Example 2:


Input: p = [1,2], q = [1,null,2]
Output: false
Example 3:


Input: p = [1,2,1], q = [1,1,2]
Output: false
 
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(value: number) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

let p = new TreeNode(1);
p.left = new TreeNode(2);
p.right = new TreeNode(1);

let q = new TreeNode(1);
q.left = new TreeNode(1);
q.right = new TreeNode(2);

// Recursive Approach
// const isSameTree = function (p: TreeNode | null, q: TreeNode | null): boolean {
//   if (p === null && q === null) {
//     return true;
//   }

//   if (p === null || q === null) {
//     return false;
//   }

//   if (p.val !== q.val) {
//     return false;
//   }

//   return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
// };

//Iterative Approach
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Queue stores pairs of nodes to compare
  const queue: (TreeNode | null)[] = [p, q];

  while (queue.length > 0) {
    const nodeP = queue.shift();
    const nodeQ = queue.shift();

    // If both are null, continue to the next pair
    if (!nodeP && !nodeQ) continue;

    // If one is null or values differ, return false
    if (!nodeP || !nodeQ || nodeP.val !== nodeQ.val) {
      return false;
    }

    // Push left children pair
    queue.push(nodeP.left);
    queue.push(nodeQ.left);

    // Push right children pair
    queue.push(nodeP.right);
    queue.push(nodeQ.right);
  }

  return true;
}

console.log(isSameTree(p, q));
