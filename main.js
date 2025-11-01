class BinaryTreeNode {
  value;
  leftNode;
  rightNode;
  constructor(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class BinarySearchTree {
  root;
  constructor() {
    this.root = null;
  }

  addChild(value) {
    const newNode = new BinaryTreeNode(value);
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
        if (currentNode.leftNode === null) {
          currentNode.leftNode = newNode;
          addedValue = true;
        } else {
          currentNode = currentNode.leftNode;
        }
      } else {
        if (currentNode.rightNode === null) {
          currentNode.rightNode = newNode;
          addedValue = true;
        } else {
          currentNode = currentNode.rightNode;
        }
      }
    }
  }

  findChild(value) {
    if (!this.root) {
      return "No node Available.";
    }

    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      } else if (currentNode.value > value) {
        currentNode = currentNode.leftNode;
      } else {
        currentNode = currentNode.rightNode;
      }
    }
    return "Node not found";
  }
}

let binarySearchTree = new BinarySearchTree();
binarySearchTree.addChild(100);
binarySearchTree.addChild(200);
binarySearchTree.addChild(190);
binarySearchTree.addChild(195);
binarySearchTree.addChild(180);
binarySearchTree.addChild(185);
binarySearchTree.addChild(170);
binarySearchTree.addChild(175);
binarySearchTree.addChild(160);
binarySearchTree.addChild(165);
binarySearchTree.addChild(90);
binarySearchTree.addChild(95);
binarySearchTree.addChild(80);
binarySearchTree.addChild(85);
binarySearchTree.addChild(70);
binarySearchTree.addChild(75);
binarySearchTree.addChild(60);
binarySearchTree.addChild(65);
// console.log("FULL BINARY TREE PERFORM");
// console.log(binarySearchTree);

// console.log("FULL BINARY TREE PERFORM");
console.log("Final Tree Structure:");
console.log(binarySearchTree.findChild(60));
// console.log(binarySearchTree);
// console.log(JSON.stringify(binarySearchTree, null, 4));
