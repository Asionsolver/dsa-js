// 110. Balanced Binary Tree

/**
Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: true
Example 2:


Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
Example 3:

Input: root = []
Output: true
*/
// 1. Definition for a binary tree node.
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
function isBalanced(root: TreeNode | null): boolean {
  const getHeight = (node: TreeNode | null): number => {
    if (node === null) return 0;

    const leftHeight = getHeight(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = getHeight(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  };

  return getHeight(root) !== -1;
}

// 3. Helper Function: Convert Array to Binary Tree (BFS)
// This turns [3,9,20,null,null,15,7] into a TreeNode object
function createTreeFromArray(values: (number | null)[]): TreeNode | null {
  if (values.length === 0) return null;

  const root = new TreeNode(values[0]!);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < values.length) {
    const current = queue.shift()!;

    // Left Child
    if (i < values.length) {
      if (values[i] !== null) {
        current.left = new TreeNode(values[i]!);
        queue.push(current.left);
      }
      i++;
    }

    // Right Child
    if (i < values.length) {
      if (values[i] !== null) {
        current.right = new TreeNode(values[i]!);
        queue.push(current.right);
      }
      i++;
    }
  }

  return root;
}

// 4. Test Cases
console.log("--- Test Case 1 ---");
const input1 = [3, 9, 20, null, null, 15, 7];
const root1 = createTreeFromArray(input1);
console.log(`Input: [${input1}]`);
console.log(`Output: ${isBalanced(root1)}`); // Expected: true

console.log("\n--- Test Case 2 ---");
const input2 = [1, 2, 2, 3, 3, null, null, 4, 4];
const root2 = createTreeFromArray(input2);
console.log(`Input: [${input2}]`);
console.log(`Output: ${isBalanced(root2)}`); // Expected: false

console.log("\n--- Test Case 3 ---");
const input3: (number | null)[] = [];
const root3 = createTreeFromArray(input3);
console.log(`Input: []`);
console.log(`Output: ${isBalanced(root3)}`); // Expected: true
