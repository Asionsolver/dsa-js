// 124. Binary Tree Maximum Path Sum

/**
Example 1:


Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
Example 2:


Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
*/

//  * Definition for a binary tree node.
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

function maxPathSum(root: TreeNode | null): number {
  let maxSum = -Infinity;

  function getGain(node: TreeNode | null): number {
    if (node === null) {
      return 0;
    }

    // Recursively calculate the maximum path sum of the left and right subtrees.
    // If the path sum from a subtree is negative, we ignore it by taking max(0, gain).
    const leftGain = Math.max(0, getGain(node.left));
    const rightGain = Math.max(0, getGain(node.right));

    // The path sum that uses the current node as the highest point (the peak of the path)
    const currentPathSum = node.val + leftGain + rightGain;

    // Update the overall maximum path sum found so far
    maxSum = Math.max(maxSum, currentPathSum);

    // Return the maximum path sum starting from this node and going down one of its branches
    return node.val + Math.max(leftGain, rightGain);
  }

  getGain(root);
  return maxSum;
}

// Example usage:
const root1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(maxPathSum(root1)); // Output: 6

const root2 = new TreeNode(
  -10,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);
console.log(maxPathSum(root2)); // Output: 42
