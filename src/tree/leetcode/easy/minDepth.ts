// 111. Minimum Depth of Binary Tree

/**
Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 2
Example 2:

Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
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
function minDepth(root: TreeNode | null): number {
  if (!root) return 0;

  let queue: TreeNode[] = [root];
  let depth = 1;

  while (queue.length > 0) {
    const nextQueue: TreeNode[] = [];

    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];

      // If we hit a leaf node (no children), we found our minimum depth
      if (!node.left && !node.right) {
        return depth;
      }

      // Add child nodes to the next level's queue
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }

    // Move to the next level
    queue = nextQueue;
    depth++;
  }

  return depth;
}

// ==============================================================
// 3. Local Testing Code to show output in your terminal
// ==============================================================

// Example 1: root =[3,9,20,null,null,15,7]
const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));

console.log("Example 1 Output:", minDepth(root1)); // Expected Output: 2

// Example 2: root =[2,null,3,null,4,null,5,null,6]
const root2 = new TreeNode(2);
root2.right = new TreeNode(3);
root2.right.right = new TreeNode(4);
root2.right.right.right = new TreeNode(5);
root2.right.right.right.right = new TreeNode(6);

console.log("Example 2 Output:", minDepth(root2)); // Expected Output: 5
