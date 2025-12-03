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
const isSameTree = function (p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) {
    return true;
  }

  if (p === null || q === null) {
    return false;
  }

  if (p.val !== q.val) {
    return false;
  }

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

console.log(isSameTree(p, q));
