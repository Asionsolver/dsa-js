// 993. Cousins in Binary Tree

/**
Example 1:


Input: root = [1,2,3,4], x = 4, y = 3
Output: false
Example 2:


Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
Output: true
Example 3:


Input: root = [1,2,3,null,4], x = 2, y = 3
Output: false

*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
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

function isCousins(root: TreeNode | null, x: number, y: number): boolean {
  let xDepth: number = -1;
  let yDepth: number = -1;
  let xParent: TreeNode | null = null;
  let yParent: TreeNode | null = null;

  // Helper function to perform DFS
  function dfs(
    node: TreeNode | null,
    parent: TreeNode | null,
    depth: number,
  ): void {
    if (!node) return;

    // Optimization: Early exit if both nodes have been successfully found
    if (xDepth !== -1 && yDepth !== -1) return;

    // Check and record if the current node matches x or y
    if (node.val === x) {
      xDepth = depth;
      xParent = parent;
    } else if (node.val === y) {
      yDepth = depth;
      yParent = parent;
    }

    // Traverse down the tree, incrementing the depth
    dfs(node.left, node, depth + 1);
    dfs(node.right, node, depth + 1);
  }

  // Start DFS starting from the root at depth 0, with a null parent
  dfs(root, null, 0);

  // Nodes are cousins if they are found at the same depth and have different parents
  return xDepth === yDepth && xParent !== yParent;
}

// Example usage:
let root: TreeNode = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);

console.log(isCousins(root, 4, 3)); // Output: false
