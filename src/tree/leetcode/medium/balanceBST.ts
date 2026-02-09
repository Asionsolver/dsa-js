// 1382. Balance a Binary Search Tree

/**
Example 1:


Input: root = [1,null,2,null,3,null,4,null,null]
Output: [2,1,3,null,null,null,4]
Explanation: This is not the only correct answer, [3,1,4,null,2] is also correct.
Example 2:


Input: root = [2,1,3]
Output: [2,1,3]
*/
// 1. Define the TreeNode class (LeetCode definition)
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
function balanceBST(root: TreeNode | null): TreeNode | null {
  const sortedNodes: TreeNode[] = [];

  // Step 1: In-Order Traversal to get nodes in sorted order
  const inOrderTraverse = (node: TreeNode | null) => {
    if (!node) return;
    inOrderTraverse(node.left);
    sortedNodes.push(node);
    inOrderTraverse(node.right);
  };

  inOrderTraverse(root);

  // Step 2: Build balanced BST from sorted array
  const buildBalancedTree = (start: number, end: number): TreeNode | null => {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = sortedNodes[mid];

    node.left = buildBalancedTree(start, mid - 1);
    node.right = buildBalancedTree(mid + 1, end);

    return node;
  };

  return buildBalancedTree(0, sortedNodes.length - 1);
}

// ==========================================
// HELPER FUNCTIONS (To run locally)
// ==========================================

// Helper: Convert Array like [1,null,2,null,3] to a TreeNode structure
function arrayToTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0) return null;

  const root = new TreeNode(arr[0]!);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < arr.length) {
    const current = queue.shift()!;

    // Process Left Child
    if (i < arr.length && arr[i] !== null) {
      current.left = new TreeNode(arr[i]!);
      queue.push(current.left);
    }
    i++;

    // Process Right Child
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]!);
      queue.push(current.right);
    }
    i++;
  }
  return root;
}

// Helper: Convert Tree back to Array (Level Order) to view output
function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return [];

  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }

  // Remove trailing nulls to make output clean (like LeetCode)
  while (result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

// ==========================================
// EXECUTION
// ==========================================

// Test Case 1
const input1 = [1, null, 2, null, 3, null, 4, null, null];
console.log("Input Array:", input1);

const root1 = arrayToTree(input1);
const balancedRoot1 = balanceBST(root1);
const output1 = treeToArray(balancedRoot1);

console.log("Balanced Output:", output1);
// Expected format: [2, 1, 3, null, null, null, 4] or similar balanced structure

console.log("-------------------");

// Test Case 2
const input2 = [2, 1, 3];
console.log("Input Array:", input2);

const root2 = arrayToTree(input2);
const balancedRoot2 = balanceBST(root2);
const output2 = treeToArray(balancedRoot2);

console.log("Balanced Output:", output2);
