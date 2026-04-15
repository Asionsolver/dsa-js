// 637. Average of Levels in Binary Tree

/**
Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [3.00000,14.50000,11.00000]
Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
Hence return [3, 14.5, 11].
Example 2:


Input: root = [3,9,20,15,7]
Output: [3.00000,14.50000,11.00000]


*/

// 1. Define the TreeNode class (LeetCode provides this behind the scenes)
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

// 2. The Solution Function (Breadth-First Search)

function averageOfLevels(root: TreeNode | null): number[] {
  if (!root) return [];

  const result: number[] = [];
  let queue: TreeNode[] = [root];

  while (queue.length > 0) {
    let levelSum = 0;
    const levelCount = queue.length;
    const nextQueue: TreeNode[] = [];

    // Traverse all nodes at the current level
    for (let i = 0; i < levelCount; i++) {
      const node = queue[i];
      levelSum += node.val;

      // Add child nodes to the nextQueue for the next level's processing
      if (node.left !== null) nextQueue.push(node.left);
      if (node.right !== null) nextQueue.push(node.right);
    }

    // Calculate the average for the current level
    result.push(levelSum / levelCount);

    // Move to the next level
    queue = nextQueue;
  }

  return result;
}

let root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

console.log(averageOfLevels(root)); // Output: [3.00000,14.50000,11.00000]
