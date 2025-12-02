// 104. Maximum Depth of Binary Tree

/**
Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:

Input: root = [1,null,2]
Output: 2

*/
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

// Recursive Depth-First Search
const maxDepth = function (root: TreeNode | null): number {
  // Base Case: If the node is null, the depth is 0
  if (root === null) {
    return 0;
  }

  // Recursive Step:

  const leftDepth = maxDepth(root.left);

  const rightDepth = maxDepth(root.right);

  //  The depth of the current node is the max of the children + 1
  return Math.max(leftDepth, rightDepth) + 1;
};

console.log(maxDepth(root));
