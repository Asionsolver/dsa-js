// 337. House Robber III

/**
Example 1:


Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
Example 2:


Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
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

function rob(root: TreeNode | null): number {
  // Helper function that returns a tuple: [max_if_robbed, max_if_not_robbed]
  const dfs = (node: TreeNode | null): [number, number] => {
    if (node === null) {
      return [0, 0]; // Base case: an empty node yields $0
    }

    // Traverse left and right children
    const [robLeft, notRobLeft] = dfs(node.left);
    const [robRight, notRobRight] = dfs(node.right);

    // Option 1: We rob this node.
    // We CANNOT rob its direct children, so we must add the 'notRobbed' values of the children.
    const robNode = node.val + notRobLeft + notRobRight;

    // Option 2: We DON'T rob this node.
    // We are free to rob or not rob the children. We greedily pick the maximum from each child.
    const notRobNode =
      Math.max(robLeft, notRobLeft) + Math.max(robRight, notRobRight);

    return [robNode, notRobNode];
  };

  // Start the DFS from the root
  const [robRoot, notRobRoot] = dfs(root);

  // Return the maximum of robbing the root vs not robbing the root
  return Math.max(robRoot, notRobRoot);
}

// Example usage:
const root1 = new TreeNode(
  3,
  new TreeNode(2, null, new TreeNode(3)),
  new TreeNode(3, null, new TreeNode(1)),
);
console.log(rob(root1)); // Output: 7

const root2 = new TreeNode(
  3,
  new TreeNode(4, new TreeNode(1), new TreeNode(3)),
  new TreeNode(5, null, new TreeNode(1)),
);
console.log(rob(root2)); // Output: 9
