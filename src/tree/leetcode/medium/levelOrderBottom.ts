// 107. Binary Tree Level Order Traversal II

/**
Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
 

*/

// 1. Define the TreeNode class
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

// 2. The Solution Function
function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  // Standard Breadth-First Search (BFS)
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!; // Dequeue the first element
      currentLevel.push(node.val);

      // Add child nodes to the queue for the next level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Add the current level to the result array
    result.push(currentLevel);
  }

  // Reverse the final array to make it bottom-up
  return result.reverse();
}

// 3. Test Cases to show output locally

// Example 1: root = [3,9,20,null,null,15,7]
const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);

console.log("Example 1 Output:", levelOrderBottom(root1));
// Expected: [ [ 15, 7 ],[ 9, 20 ], [ 3 ] ]

// Example 2: root = [1]
const root2 = new TreeNode(1);
console.log("Example 2 Output:", levelOrderBottom(root2));
// Expected: [ [ 1 ] ]

// Example 3: root =[]
const root3 = null;
console.log("Example 3 Output:", levelOrderBottom(root3));
// Expected:
