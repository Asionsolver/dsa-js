// 2265. Count Nodes Equal to Average of Subtree

/**
Given the root of a binary tree, return the number of nodes where the value of the node is equal to the average of the values in its subtree.

Note:

The average of n elements is the sum of the n elements divided by n and rounded down to the nearest integer.
A subtree of root is a tree consisting of root and all of its descendants.
*/

/**
Example 1:


Input: root = [4,8,5,0,1,null,6]
Output: 5
Explanation: 
For the node with value 4: The average of its subtree is (4 + 8 + 5 + 0 + 1 + 6) / 6 = 24 / 6 = 4.
For the node with value 5: The average of its subtree is (5 + 6) / 2 = 11 / 2 = 5.
For the node with value 0: The average of its subtree is 0 / 1 = 0.
For the node with value 1: The average of its subtree is 1 / 1 = 1.
For the node with value 6: The average of its subtree is 6 / 1 = 6.
Example 2:


Input: root = [1]
Output: 1
Explanation: For the node with value 1: The average of its subtree is 1 / 1 = 1.
*/

/**
Constraints:

The number of nodes in the tree is in the range [1, 1000].
0 <= Node.val <= 1000
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

// Brute Force
// function averageOfSubtree(root: TreeNode | null): number {
//   let matchingNodesCount = 0;

//   // Helper function to calculate sum and count for a given node's subtree.
//   function getSubtreeStats(node: TreeNode | null): [number, number] {
//     if (node === null) {
//       return [0, 0];
//     }

//     const [leftSum, leftCount] = getSubtreeStats(node.left);
//     const [rightSum, rightCount] = getSubtreeStats(node.right);

//     const totalSum = node.val + leftSum + rightSum;
//     const totalCount = 1 + leftCount + rightCount;

//     return [totalSum, totalCount];
//   }

//   // Traverse every node in the tree.
//   function traverse(node: TreeNode | null): void {
//     if (node === null) return;

//     // Calculate sum and count repeatedly for each node.
//     const [sum, count] = getSubtreeStats(node);

//     if (Math.floor(sum / count) === node.val) {
//       matchingNodesCount++;
//     }

//     // Visit left and right children.
//     traverse(node.left);
//     traverse(node.right);
//   }

//   traverse(root);
//   return matchingNodesCount;
// }

// Optimized

function averageOfSubtree(root: TreeNode | null): number {
  let matchingNodesCount = 0;

  // Helper function that returns [sum, count] of the subtree rooted at current node.
  function postOrderDfs(node: TreeNode | null): [number, number] {
    // Base case: null node contributes 0 sum and 0 count.
    if (node === null) {
      return [0, 0];
    }

    // Recursively compute the sum and count of the left subtree.
    const [leftSum, leftCount] = postOrderDfs(node.left);

    // Recursively compute the sum and count of the right subtree.
    const [rightSum, rightCount] = postOrderDfs(node.right);

    // Aggregate results for the current node.
    const currentSum = node.val + leftSum + rightSum;
    const currentCount = 1 + leftCount + rightCount;

    // Check if the current node value matches the rounded-down average.
    if (Math.floor(currentSum / currentCount) === node.val) {
      matchingNodesCount++;
    }

    // Return the accumulated sum and count to the parent node.
    return [currentSum, currentCount];
  }

  // Start post-order DFS traversal from the root.
  postOrderDfs(root);

  return matchingNodesCount;
}

// Example usage:
const root = new TreeNode(
  4,
  new TreeNode(8, new TreeNode(0), new TreeNode(1)),
  new TreeNode(5, null, new TreeNode(6)),
);

console.log(averageOfSubtree(root)); // Output: 5

const singleNodeRoot = new TreeNode(1);
console.log(averageOfSubtree(singleNodeRoot)); // Output: 1
// বর্তমান node-কে root ধরে তার subtree-র [sum, count] রিটার্ন করার helper function.
