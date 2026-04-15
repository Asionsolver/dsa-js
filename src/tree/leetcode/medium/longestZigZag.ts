// 1372. Longest ZigZag Path in a Binary Tree

/**
Example 1:


Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
Output: 3
Explanation: Longest ZigZag path in blue nodes (right -> left -> right).
Example 2:


Input: root = [1,1,1,null,1,null,null,1,1,null,1]
Output: 4
Explanation: Longest ZigZag path in blue nodes (left -> right -> left -> right).
Example 3:

Input: root = [1]
Output: 0
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
function longestZigZag(root: TreeNode | null): number {
  if (!root) return 0;

  let maxStep = 0;
  // Stack maintains tuples of[current node, next expected direction is left, length of zigzag path]
  const stack: [TreeNode, boolean, number][] = [];

  if (root.left) stack.push([root.left, false, 1]);
  if (root.right) stack.push([root.right, true, 1]);

  while (stack.length > 0) {
    const [node, nextIsLeft, step] = stack.pop()!;

    if (step > maxStep) maxStep = step;

    if (nextIsLeft) {
      if (node.left) stack.push([node.left, false, step + 1]);
      if (node.right) stack.push([node.right, true, 1]);
    } else {
      if (node.right) stack.push([node.right, true, step + 1]);
      if (node.left) stack.push([node.left, false, 1]);
    }
  }

  return maxStep;
}

// 3. Helper function to build a binary tree from an array (LeetCode format)
function buildTree(values: (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null;

  const root = new TreeNode(values[0] as number);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < values.length) {
    const current = queue.shift()!;

    // Process left child
    if (values[i] !== null && values[i] !== undefined) {
      current.left = new TreeNode(values[i] as number);
      queue.push(current.left);
    }
    i++;

    // Process right child
    if (i < values.length && values[i] !== null && values[i] !== undefined) {
      current.right = new TreeNode(values[i] as number);
      queue.push(current.right);
    }
    i++;
  }
  return root;
}

// 4. Test the examples and output to the console
const example1 = [
  1,
  null,
  1,
  1,
  1,
  null,
  null,
  1,
  1,
  null,
  1,
  null,
  null,
  null,
  1,
];
const root1 = buildTree(example1);
console.log("Example 1 Output:", longestZigZag(root1)); // Expected: 3

const example2 = [1, 1, 1, null, 1, null, null, 1, 1, null, 1];
const root2 = buildTree(example2);
console.log("Example 2 Output:", longestZigZag(root2)); // Expected: 4

const example3 = [1];
const root3 = buildTree(example3);
console.log("Example 3 Output:", longestZigZag(root3)); // Expected: 0
