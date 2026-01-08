// 1110. Delete Nodes And Return Forest

/**
Example 1:


Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
Output: [[1,2,null,4],[6],[7]]
Example 2:

Input: root = [1,2,4,null,3], to_delete = [3]
Output: [[1,2,4]]

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
function delNodes(root: TreeNode | null, to_delete: number[]): TreeNode[] {
  const toDeleteSet = new Set(to_delete);
  const forest: TreeNode[] = [];

  const dfs = (node: TreeNode | null, isRoot: boolean): TreeNode | null => {
    if (!node) return null;

    const shouldDelete = toDeleteSet.has(node.val);

    if (isRoot && !shouldDelete) {
      forest.push(node);
    }

    node.left = dfs(node.left, shouldDelete);
    node.right = dfs(node.right, shouldDelete);

    return shouldDelete ? null : node;
  };

  dfs(root, true);
  return forest;
}

// ---------------------------------------------------------
// 3. Helper Functions (To create inputs and view outputs)
// ---------------------------------------------------------

// Helper: Converts a LeetCode style array (BFS) into a TreeNode structure
function createTreeFromArray(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0 || arr[0] === null) return null;

  let root = new TreeNode(arr[0]);
  let queue: TreeNode[] = [root];
  let i = 1;

  while (i < arr.length) {
    let current = queue.shift()!;

    // Left Child
    if (i < arr.length && arr[i] !== null) {
      current.left = new TreeNode(arr[i]!);
      queue.push(current.left);
    }
    i++;

    // Right Child
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]!);
      queue.push(current.right);
    }
    i++;
  }
  return root;
}

// Helper: Converts a Tree back to an array (for console.log visibility)
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

  // Remove trailing nulls to clean up output
  while (result.length > 0 && result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

// ---------------------------------------------------------
// 4. Execution / Test Cases
// ---------------------------------------------------------

console.log("--- Test Case 1 ---");
// Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
const root1 = createTreeFromArray([1, 2, 3, 4, 5, 6, 7]);
const result1 = delNodes(root1, [3, 5]);

// Convert the resulting forest of trees back to arrays to print them
const output1 = result1.map((treeRoot) => treeToArray(treeRoot));
console.log("Output:", JSON.stringify(output1));
// Expected: [[1,2,null,4],[6],[7]] (Order might vary)

console.log("\n--- Test Case 2 ---");
// Input: root = [1,2,4,null,3], to_delete = [3]
const root2 = createTreeFromArray([1, 2, 4, null, 3]);
const result2 = delNodes(root2, [3]);

const output2 = result2.map((treeRoot) => treeToArray(treeRoot));
console.log("Output:", JSON.stringify(output2));
// Expected: [[1,2,4]]
