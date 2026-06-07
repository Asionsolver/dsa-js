// 2196. Create Binary Tree From Descriptions

/**
Example 1:


Input: descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
Output: [50,20,80,15,17,19]
Explanation: The root node is the node with value 50 since it has no parent.
The resulting binary tree is shown in the diagram.
Example 2:


Input: descriptions = [[1,2,1],[2,3,0],[3,4,1]]
Output: [1,2,null,null,3,4]
Explanation: The root node is the node with value 1 since it has no parent.
The resulting binary tree is shown in the diagram.

*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
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

function createBinaryTree(descriptions: number[][]): TreeNode | null {
  const nodeMap = new Map<number, TreeNode>();
  const children = new Set<number>();

  // Step 1: Populate the map and set up node relationships
  for (const [parentVal, childVal, isLeft] of descriptions) {
    if (!nodeMap.has(parentVal)) {
      nodeMap.set(parentVal, new TreeNode(parentVal));
    }
    if (!nodeMap.has(childVal)) {
      nodeMap.set(childVal, new TreeNode(childVal));
    }

    const parentNode = nodeMap.get(parentVal)!;
    const childNode = nodeMap.get(childVal)!;

    if (isLeft === 1) {
      parentNode.left = childNode;
    } else {
      parentNode.right = childNode;
    }

    children.add(childVal);
  }

  // Step 2: Find the root node (the node that is never a child)
  let root: TreeNode | null = null;
  for (const [parentVal] of descriptions) {
    if (!children.has(parentVal)) {
      root = nodeMap.get(parentVal) || null;
      break;
    }
  }

  return root;
}

// Test cases
const descriptions1 = [
  [20, 15, 1],
  [20, 17, 0],
  [50, 20, 1],
  [50, 80, 0],
  [80, 19, 1],
];
const tree1 = createBinaryTree(descriptions1);
console.log(tree1); // Output: TreeNode { val: 50, left: TreeNode { val: 20, left: TreeNode { val: 15, left: null, right: null }, right: TreeNode { val: 17, left: null, right: null } }, right: TreeNode { val: 80, left: TreeNode { val: 19, left: null, right: null }, right: null } }

const descriptions2 = [
  [1, 2, 1],
  [2, 3, 0],
  [3, 4, 1],
];
const tree2 = createBinaryTree(descriptions2);
console.log(tree2); // Output: TreeNode { val: 1, left: TreeNode { val: 2, left: null, right: null }, right: null } with left child TreeNode { val: 2, left: null, right: TreeNode { val: 3, left: TreeNode { val: 4, left: null, right: null }, right: null } }
