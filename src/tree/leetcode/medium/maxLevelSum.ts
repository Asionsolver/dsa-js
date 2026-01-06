// 1161. Maximum Level Sum of a Binary Tree

/**
Example 1:


Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.
Example 2:

Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2
*/
/**
 * 1. The TreeNode Class Definition
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

/**
 * 2. The Solution Function
 */
function maxLevelSum(root: TreeNode | null): number {
  if (!root) return 0;

  let maxSum = -Infinity;
  let maxLevel = 1;
  let currentLevel = 1;
  let queue: TreeNode[] = [root];

  while (queue.length > 0) {
    let currentLevelSum = 0;
    const nextQueue: TreeNode[] = [];

    for (const node of queue) {
      currentLevelSum += node.val;
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }

    if (currentLevelSum > maxSum) {
      maxSum = currentLevelSum;
      maxLevel = currentLevel;
    }

    queue = nextQueue;
    currentLevel++;
  }

  return maxLevel;
}

/**
 * 3. Helper Function: Converts an array (LeetCode format) to a TreeNode
 */
function buildTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < arr.length) {
    const current = queue.shift()!;

    // Process left child
    if (i < arr.length) {
      if (arr[i] !== null) {
        current.left = new TreeNode(arr[i]!);
        queue.push(current.left);
      }
      i++;
    }

    // Process right child
    if (i < arr.length) {
      if (arr[i] !== null) {
        current.right = new TreeNode(arr[i]!);
        queue.push(current.right);
      }
      i++;
    }
  }
  return root;
}

/**
 * 4. Driver / Testing Code
 */

// Example 1
// Input: root = [1,7,0,7,-8,null,null]
const input1 = [1, 7, 0, 7, -8, null, null];
const root1 = buildTree(input1);
console.log("Example 1 Output:", maxLevelSum(root1)); // Expected: 2

// Example 2
// Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
const input2 = [989, null, 10250, 98693, -89388, null, null, null, -32127];
const root2 = buildTree(input2);
console.log("Example 2 Output:", maxLevelSum(root2)); // Expected: 2
