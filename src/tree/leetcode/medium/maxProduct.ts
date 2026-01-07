// 1339. Maximum Product of Splitted Binary Tree

/**
Example 1:


Input: root = [1,2,3,4,5,6]
Output: 110
Explanation: Remove the red edge and get 2 binary trees with sum 11 and 10. Their product is 110 (11*10)
Example 2:


Input: root = [1,null,2,3,4,null,null,5,6]
Output: 90
Explanation: Remove the red edge and get 2 binary trees with sum 15 and 6.Their product is 90 (15*6)

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
function maxProduct(root: TreeNode | null): number {
  const MOD = 1_000_000_007n;
  const subtreeSums: number[] = [];

  function calculateSubtreeSums(node: TreeNode | null): number {
    if (!node) return 0;
    const leftSum = calculateSubtreeSums(node.left);
    const rightSum = calculateSubtreeSums(node.right);
    const currentSum = node.val + leftSum + rightSum;
    subtreeSums.push(currentSum);
    return currentSum;
  }

  const totalSum = calculateSubtreeSums(root);

  let maxP = 0n;
  const totalSumBig = BigInt(totalSum);

  for (const s of subtreeSums) {
    if (s === totalSum) continue;
    const subSumBig = BigInt(s);
    const currentProduct = subSumBig * (totalSumBig - subSumBig);
    if (currentProduct > maxP) {
      maxP = currentProduct;
    }
  }

  return Number(maxP % MOD);
}

// 3. Helper to build tree from Array (Level Order / BFS)
function buildTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0) return null;

  const root = new TreeNode(arr[0]!);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < arr.length) {
    const current = queue.shift()!;

    // Add left child
    if (i < arr.length && arr[i] !== null) {
      current.left = new TreeNode(arr[i]!);
      queue.push(current.left);
    }
    i++;

    // Add right child
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]!);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

// 4. Test Execution
const testCase1 = [1, 2, 3, 4, 5, 6];
const root1 = buildTree(testCase1);
console.log("Test Case 1 Output:", maxProduct(root1)); // Expected: 110

const testCase2 = [1, null, 2, 3, 4, null, null, 5, 6];
const root2 = buildTree(testCase2);
console.log("Test Case 2 Output:", maxProduct(root2)); // Expected: 90
