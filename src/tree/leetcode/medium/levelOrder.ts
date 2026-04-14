// 102. Binary Tree Level Order Traversal

/**
Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
*/

// This is optimized version of the level order traversal using a queue. It processes each level of the tree in a single pass, ensuring that we only traverse each node once. The time complexity is O(n) where n is the number of nodes in the tree, and the space complexity is O(m) where m is the maximum number of nodes at any level (the width of the tree).
// Definition for a binary tree node.
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

function levelOrder(root: TreeNode | null): number[][] {
  const result: number[][] = [];

  if (root === null) {
    return result;
  }

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      // Remove the first element from the queue
      const currentNode = queue.shift()!;

      currentLevel.push(currentNode.val);

      // Add left and right children to the queue for the next level
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    // Add the current level's values to the final result
    result.push(currentLevel);
  }

  return result;
}

let root: TreeNode | null = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(levelOrder(root));

/**
 * This is non-optimized version of the level order traversal using a queue. It processes each level of the tree in a single pass, ensuring that we only traverse each node once. The time complexity is O(n) where n is the number of nodes in the tree, and the space complexity is O(m) where m is the maximum number of nodes at any level (the width of the tree).
 */
/**
 * Definition for a binary tree node.
 */
// class TreeNode {
//   val: number;
//   left: TreeNode | null;
//   right: TreeNode | null;
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

/**
 * Given the root of a binary tree, return the level order traversal of its nodes' values.
 * (i.e., from left to right, level by level).
 *
 * @param root The root of the binary tree.
 * @returns A 2D array representing the level order traversal.
 */

/**

function levelOrder(root: TreeNode | null): number[][] {
  // Edge case: If the tree is empty, return an empty array.
  if (!root) {
    return [];
  }

  const result: number[][] = [];
  // Use a standard array as a queue.
  // 'push' to enqueue, 'shift' to dequeue.
  const queue: TreeNode[] = [root];

  // Continue processing as long as there are nodes in the queue.
  while (queue.length > 0) {
    // The number of nodes at the current level is the current size of the queue.
    const levelSize = queue.length;
    const currentLevelValues: number[] = [];

    // Process all nodes for the current level.
    for (let i = 0; i < levelSize; i++) {
      // Dequeue the node from the front.
      // The '!' (non-null assertion) is safe because we know queue.length > 0.
      const currentNode = queue.shift()!;

      // Add its value to the list for the current level.
      currentLevelValues.push(currentNode.val);

      // Enqueue children for the next level, if they exist.
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    // After processing all nodes of the level, add the level's values to the result.
    result.push(currentLevelValues);
  }

  return result;
}

// Example Usage:
let root = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);
console.log(levelOrder(root)); // Output: [[3],[9,20],[15,7]]

let root2 = new TreeNode(1);
console.log(levelOrder(root2)); // Output: [[1]]

let root3 = null;
console.log(levelOrder(root3)); // Output: []

 */
