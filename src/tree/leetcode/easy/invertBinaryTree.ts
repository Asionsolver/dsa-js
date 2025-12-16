// 226. Invert Binary Tree

/**
Example 1:


Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
Example 2:


Input: root = [2,1,3]
Output: [2,3,1]
Example 3:

Input: root = []
Output: []


*/
class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: null | TreeNode;
  constructor() {
    this.root = null;
  }

  addChild(value: number) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return newNode;
    }

    let currentNode = this.root;
    let addedValue = false;

    while (!addedValue && currentNode) {
      if (currentNode.value === value) {
        console.log("🚫 Duplicate value not allowed");
        return "🚫 Duplicate value not allowed";
      }
      // if current node value is greater than value
      else if (currentNode.value > value) {
        // going left side
        if (currentNode.left === null) {
          currentNode.left = newNode;
          addedValue = true;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          addedValue = true;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    return "🚫 Could not add value"; // Fallback return
  }
}

let binarySearchTree = new BinarySearchTree();
console.log("ADD CHILD METHOD PERFORM");
binarySearchTree.addChild(4);
binarySearchTree.addChild(2);
binarySearchTree.addChild(7);
binarySearchTree.addChild(1);
binarySearchTree.addChild(3);
binarySearchTree.addChild(6);
binarySearchTree.addChild(9);

// console.log(binarySearchTree);

// Recursive Solution
// const invertTree = function (root: TreeNode | null): TreeNode | null {
//   if (root === null) {
//     return null;
//   }

//   // swap
//   const temp = root.left;
//   root.left = root.right;
//   root.right = temp;

//   // recursively invert
//   invertTree(root.left);
//   invertTree(root.right);

//   return root;
// };

// Iterative Solution
const invertTree = function (root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null;
  }
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;

    // swap children
    const temp = node?.left;
    node.left = node?.right;
    node.right = temp;

    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }

  return root;
};

console.log(invertTree(binarySearchTree.root));
