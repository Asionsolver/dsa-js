// 1022. Sum of Root To Leaf Binary Numbers

/**
Example 1:


Input: root = [1,0,1,0,1,0,1]
Output: 22
Explanation: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22
Example 2:

Input: root = [0]
Output: 0
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
function sumRootToLeaf(root: TreeNode | null): number {
  const dfs = (node: TreeNode | null, currentVal: number): number => {
    if (!node) return 0;

    // Shift left by 1 (multiply by 2) and add current bit
    currentVal = (currentVal << 1) | node.val;

    // If leaf node, return the calculated value
    if (!node.left && !node.right) {
      return currentVal;
    }

    return dfs(node.left, currentVal) + dfs(node.right, currentVal);
  };

  return dfs(root, 0);
}

// 3. Helper: Build Tree from Array (Breadth-First/Queue approach)
function buildTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null;

  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < arr.length) {
    const current = queue.shift()!;

    // Process Left Child
    if (i < arr.length) {
      if (arr[i] !== null) {
        const leftNode = new TreeNode(arr[i]!);
        current.left = leftNode;
        queue.push(leftNode);
      }
      i++;
    }

    // Process Right Child
    if (i < arr.length) {
      if (arr[i] !== null) {
        const rightNode = new TreeNode(arr[i]!);
        current.right = rightNode;
        queue.push(rightNode);
      }
      i++;
    }
  }

  return root;
}

// 4. Test Cases
console.log("--- Test Case 1 ---");
const input1 = [1, 0, 1, 0, 1, 0, 1];
const root1 = buildTree(input1);
const result1 = sumRootToLeaf(root1);
console.log(`Input: [${input1}]`);
console.log(`Output: ${result1}`); // Expected: 22

console.log("\n--- Test Case 2 ---");
const input2 = [0];
const root2 = buildTree(input2);
const result2 = sumRootToLeaf(root2);
console.log(`Input: [${input2}]`);
console.log(`Output: ${result2}`); // Expected: 0
