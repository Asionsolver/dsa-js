// 103. Binary Tree Zigzag Level Order Traversal

/**
Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []
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
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  let queue: TreeNode[] = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const size = queue.length;
    const currentLevel = new Array(size);
    const nextQueue: TreeNode[] = [];

    for (let i = 0; i < size; i++) {
      const node = queue[i];

      // Determine the index based on the traversal direction
      const index = leftToRight ? i : size - 1 - i;
      currentLevel[index] = node.val;

      // Collect children for the next level's queue
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }

    result.push(currentLevel);
    leftToRight = !leftToRight;
    queue = nextQueue;
  }

  return result;
}

// 3. Helper Function to build a tree from an array (LeetCode style)
function buildTree(values: (number | null)[]): TreeNode | null {
  if (!values.length || values[0] === null) return null;

  const root = new TreeNode(values[0]);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < values.length) {
    const current = queue.shift()!; // Get the next node to attach children to

    // Attach Left Child
    if (i < values.length && values[i] !== null) {
      current.left = new TreeNode(values[i]!);
      queue.push(current.left);
    }
    i++;

    // Attach Right Child
    if (i < values.length && values[i] !== null) {
      current.right = new TreeNode(values[i]!);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

// 4. Test Cases
console.log("--- Running Test Cases ---");

const tree1 = buildTree([3, 9, 20, null, null, 15, 7]);
console.log("Example 1 Output:", zigzagLevelOrder(tree1));
// Expected: [ [ 3 ], [ 20, 9 ], [ 15, 7 ] ]

const tree2 = buildTree([1]);
console.log("Example 2 Output:", zigzagLevelOrder(tree2));
// Expected: [ [ 1 ] ]

const tree3 = buildTree([]);
console.log("Example 3 Output:", zigzagLevelOrder(tree3));
// Expected: []
