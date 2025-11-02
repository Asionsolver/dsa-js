class BinaryTreeNode {
  value: number;
  leftNode: BinaryTreeNode | null;
  rightNode: BinaryTreeNode | null;
  constructor(value: number) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}

class BinarySearchTree {
  root: null | BinaryTreeNode;
  constructor() {
    this.root = null;
  }

  addChild(value: number) {
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
    return "🚫 Could not add value"; // Fallback return
  }

  findChild(value: number) {
    if (!this.root) {
      return "No node Available.";
    }

    let currentNode: BinaryTreeNode | null = this.root;

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

  traversalLevelOrder() {
    if (!this.root) {
      return "No node Available.";
    }

    const queue: BinaryTreeNode[] = [this.root];
    const result: number[] = [];
    while (queue.length > 0) {
      const current = queue.shift(); // We know queue has elements

      if (current) {
        result.push(current.value); // Store the value
        if (current.leftNode !== null) {
          queue.push(current?.leftNode);
        }

        if (current?.rightNode !== null) {
          queue.push(current?.rightNode);
        }
      }
    }
    return result;
  }

  traversalPreOrder(node = this.root) {
    if (node) {
      console.log(node.value);
      this.traversalPreOrder(node.leftNode);
      this.traversalPreOrder(node.rightNode);
    }
  }

  traversalInOrder(node = this.root) {
    if (node) {
      this.traversalInOrder(node.leftNode);
      console.log(node.value);
      this.traversalInOrder(node.rightNode);
    }
  }
  traversalPostOrder(node = this.root) {
    if (node) {
      this.traversalPostOrder(node.leftNode);
      this.traversalPostOrder(node.rightNode);
      console.log(node.value);
    }
  }
}

let binarySearchTree = new BinarySearchTree();
// console.log("ADD CHILD METHOD PERFORM");
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
binarySearchTree.addChild(55);

// console.log("FULL BINARY TREE PERFORM");
// console.log(binarySearchTree);

// console.log("FULL BINARY TREE PERFORM");
// console.log("Final Tree Structure:");
// console.log(binarySearchTree);
// console.log(JSON.stringify(binarySearchTree, null, 4));

// console.log("BINARY TREE FIND CHILD METHOD PERFORM");
// console.log(binarySearchTree.findChild(65));

console.log("BINARY TREE TRAVERSAL LEVEL ORDER METHOD PERFORM");
console.log(binarySearchTree.traversalLevelOrder());
// binarySearchTree.traversalPreOrder();
// binarySearchTree.traversalInOrder();
binarySearchTree.traversalPostOrder();
