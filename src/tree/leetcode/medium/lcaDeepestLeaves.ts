// 1123. Lowest Common Ancestor of Deepest Leaves

/**
Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: We return the node with value 2, colored in yellow in the diagram.
The nodes coloured in blue are the deepest leaf-nodes of the tree.
Note that nodes 6, 0, and 8 are also leaf nodes, but the depth of them is 2, but the depth of nodes 7 and 4 is 3.
Example 2:

Input: root = [1]
Output: [1]
Explanation: The root is the deepest node in the tree, and it's the lca of itself.
Example 3:

Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest leaf node in the tree is 2, the lca of one node is itself.
*/

/**
 * Definition for a binary tree node.
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

function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
  // Helper function that returns a tuple: [LCA_Node, depth_of_subtree]
  function dfs(node: TreeNode | null): [TreeNode | null, number] {
    // Base case: If the node is null, depth is 0
    if (!node) {
      return [null, 0];
    }

    // Recursively find the LCA and depth of the left and right subtrees
    const [leftNode, leftDepth] = dfs(node.left);
    const [rightNode, rightDepth] = dfs(node.right);

    // If depths are equal, the current node is the LCA for the deepest leaves in its subtrees
    if (leftDepth === rightDepth) {
      return [node, leftDepth + 1];
    }

    // If the left subtree is deeper, the LCA must be within the left subtree
    if (leftDepth > rightDepth) {
      return [leftNode, leftDepth + 1];
    }
    // Otherwise, the LCA must be within the right subtree
    else {
      return [rightNode, rightDepth + 1];
    }
  }

  // The dfs function returns[LcaNode, MaxDepth], we just want the node.
  return dfs(root)[0];
}

// Example usage:
// Constructing the tree for Example 1
const root = new TreeNode(
  3,
  new TreeNode(
    5,
    new TreeNode(6),
    new TreeNode(2, new TreeNode(7), new TreeNode(4)),
  ),
  new TreeNode(1, new TreeNode(0), new TreeNode(8)),
);

console.log(lcaDeepestLeaves(root)); // Output: TreeNode with value 2
