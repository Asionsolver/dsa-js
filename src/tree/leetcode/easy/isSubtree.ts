// 572. Subtree of Another Tree

/**
Example 1:


Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true
Example 2:


Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false
 

Constraints:

The number of nodes in the root tree is in the range [1, 2000].
The number of nodes in the subRoot tree is in the range [1, 1000].
-104 <= root.val <= 104
-104 <= subRoot.val <= 104
*/

//  Definition for a binary tree node.
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

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if (root === null) {
    return false;
  }

  // Check if the trees are identical starting from the current node
  if (isSameTree(root, subRoot)) {
    return true;
  }

  // Check recursively in the left and right subtrees
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // If both nodes are null, they are identical
  if (p === null && q === null) {
    return true;
  }
  // If only one is null, they cannot be identical
  if (p === null || q === null) {
    return false;
  }
  // If the values are different, they are not identical
  if (p.val !== q.val) {
    return false;
  }
  // Recursively check left and right children
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// Example usage:
const root = new TreeNode(
  3,
  new TreeNode(4, new TreeNode(1), new TreeNode(2)),
  new TreeNode(5),
);
const subRoot = new TreeNode(4, new TreeNode(1), new TreeNode(2));

console.log(isSubtree(root, subRoot)); // Output: true

const root2 = new TreeNode(
  3,
  new TreeNode(4, new TreeNode(1), new TreeNode(2, new TreeNode(0))),
  new TreeNode(5),
);
console.log(isSubtree(root2, subRoot)); // Output: false
