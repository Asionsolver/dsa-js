// 865. Smallest Subtree with all the Deepest Nodes

/**
Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: We return the node with value 2, colored in yellow in the diagram.
The nodes coloured in blue are the deepest nodes of the tree.
Notice that nodes 5, 3 and 2 contain the deepest nodes in the tree but node 2 is the smallest subtree among them, so we return it.
Example 2:

Input: root = [1]
Output: [1]
Explanation: The root is the deepest node in the tree.
Example 3:

Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest node in the tree is 2, the valid subtrees are the subtrees of nodes 2, 1 and 0 but the subtree of node 2 is the smallest.

*/
// ==========================================
// 1. Class Definition
// ==========================================
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

// ==========================================
// 2. The Solution Logic
// ==========================================

interface SubtreeResult {
  height: number;
  node: TreeNode | null;
}

function subtreeWithAllDeepest(root: TreeNode | null): TreeNode | null {
  return dfs(root).node;
}

function dfs(node: TreeNode | null): SubtreeResult {
  if (node === null) {
    return { height: 0, node: null };
  }

  const left = dfs(node.left);
  const right = dfs(node.right);

  // If left is deeper, the answer is in the left child
  if (left.height > right.height) {
    return { height: left.height + 1, node: left.node };
  }

  // If right is deeper, the answer is in the right child
  if (right.height > left.height) {
    return { height: right.height + 1, node: right.node };
  }

  // If depths are equal, THIS node is the common ancestor
  return { height: left.height + 1, node: node };
}

// ==========================================
// 3. Helper Functions (For Local Testing)
// ==========================================

/**
 * Converts a LeetCode style array (BFS) to a Binary Tree
 */
function createTreeFromArray(arr: (number | null)[]): TreeNode | null {
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

/**
 * Converts a Binary Tree back to an array (BFS) for printing
 */
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

// ==========================================
// 4. Execution / Test Cases
// ==========================================

const testCases = [
  [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], // Example 1
  [1], // Example 2
  [0, 1, 3, null, 2], // Example 3
];

console.log("--- Running Tests ---");

testCases.forEach((arr, index) => {
  // 1. Build the tree
  const root = createTreeFromArray(arr);

  // 2. Run the solution
  const resultSubtree = subtreeWithAllDeepest(root);

  // 3. Convert result back to array to visualize
  const outputArray = treeToArray(resultSubtree);

  console.log(`Test Case ${index + 1}:`);
  console.log(`Input:  ${JSON.stringify(arr)}`);
  console.log(`Output: ${JSON.stringify(outputArray)}`);
  console.log("-------------------");
});
