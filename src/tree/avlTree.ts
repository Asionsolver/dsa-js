class AVLNode {
  value: number;
  leftNode: AVLNode | null;
  rightNode: AVLNode | null;
  height: number;
  constructor(value: number) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
    this.height = 1;
  }
}
class AVL {
  root: null | AVLNode;
  constructor() {
    this.root = null;
  }

  treeHeight(node: AVLNode | null) {
    if (!node) {
      return 0;
    }

    return node.height;
  }

  balanceFactor(node: AVLNode) {
    const leftHeight = this.treeHeight(node.leftNode);
    const rightHeight = this.treeHeight(node.rightNode);
    const balanceFactor = leftHeight - rightHeight;

    return balanceFactor;
  }

  add(value: number) {
    this.root = this.insert(this.root, value);
    console.log(this.root);
  }
  updateHeight(node: AVLNode) {
    node.height =
      Math.max(
        this.treeHeight(node.leftNode),
        this.treeHeight(node.rightNode)
      ) + 1;
  }
  insert(node: AVLNode | null, value: number) {
    if (!node) {
      return new AVLNode(value);
    }
    if (value < node.value) {
      node.leftNode = this.insert(node.leftNode, value);
    } else if (value > node.value) {
      node.rightNode = this.insert(node.rightNode, value);
    } else {
      console.log("Please Provide Unique Value");
      return node;
    }

    this.updateHeight(node);

    const balance = this.balanceFactor(node);

    // left rotation
    if (balance < -1 && value > node.rightNode!.value) {
      return this.rotateLeft(node);
    }
    // right rotation
    if (balance > 1 && value < node.leftNode!.value) {
      return this.rotateRight(node);
    }

    // left-right rotation
    if (balance > 1 && value < node.leftNode!.value) {
      node.leftNode = this.rotateLeft(node.leftNode!);
      return this.rotateRight(node);
    }
    //right-left rotation
    if (balance < -1 && value < node.rightNode!.value) {
      node.rightNode = this.rotateRight(node.leftNode!);
      return this.rotateLeft(node);
    }

    return node;
  }

  rotateLeft(node: AVLNode) {
    const newRoot = node.rightNode!;

    const temp = newRoot?.leftNode;
    if (newRoot) {
      newRoot.leftNode = node;
      node.rightNode = temp;
      node.height =
        1 +
        Math.max(
          this.treeHeight(node.leftNode),
          this.treeHeight(node.rightNode)
        );

      newRoot.height =
        1 +
        Math.max(
          this.treeHeight(newRoot.leftNode),
          this.treeHeight(newRoot.rightNode)
        );
    }

    return newRoot;
  }

  rotateRight(node: AVLNode) {
    const newRoot = node.leftNode!;
    const temp = newRoot?.rightNode;

    if (newRoot) {
      newRoot.rightNode = node;
      node.leftNode = temp;
      node.height =
        1 +
        Math.max(
          this.treeHeight(node.leftNode),
          this.treeHeight(node.rightNode)
        );
      newRoot.height =
        1 +
        Math.max(
          this.treeHeight(newRoot.leftNode),
          this.treeHeight(newRoot.rightNode)
        );
    }

    return newRoot;
  }

  findChild(value: number) {
    if (!this.root) {
      return "No node Available.";
    }

    let currentNode: AVLNode | null = this.root;

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
  inOrder(node = this.root, result: number[] = []) {
    if (node) {
      this.inOrder(node.leftNode, result);
      result.push(node.value);
      this.inOrder(node.rightNode, result);
    }

    return result;
  }
  // Helper method to find node with minimum value
  minValueNode(node: AVLNode) {
    let current = node;
    while (current.leftNode) {
      current = current.leftNode;
    }
    return current;
  }
  delete(value: number) {
    this.root = this.deleteNode(this.root, value);
  }
  deleteNode(node: null | AVLNode, value: number) {
    //
    if (!node) {
      return node;
    }

    if (value < node.value) {
      node.leftNode = this.deleteNode(node.leftNode, value);
    } else if (value > node.value) {
      node.rightNode = this.deleteNode(node.rightNode, value);
    } else {
      // Node to be deleted found
      if (!node.leftNode || !node.rightNode) {
        // Node with one child or no child
        const temp = node.leftNode ? node.leftNode : node.rightNode;
        node = temp; // Replace with the child (or null if no child)
      } else {
        // Node with two children
        const temp = this.minValueNode(node.rightNode); // In-order successor
        node.value = temp.value; // Replace value with successor
        node.rightNode = this.deleteNode(node.rightNode, temp.value); // Delete successor
      }
    }

    if (!node) {
      return node;
    }
    this.updateHeight(node);

    const balance = this.balanceFactor(node);

    // left rotation
    if (balance < -1 && value > node.rightNode!.value) {
      return this.rotateLeft(node);
    }
    // right rotation
    if (balance > 1 && value < node.leftNode!.value) {
      return this.rotateRight(node);
    }

    // left-right rotation
    if (balance > 1 && value < node.leftNode!.value) {
      node.leftNode = this.rotateLeft(node.leftNode!);
      return this.rotateRight(node);
    }
    //right-left rotation
    if (balance < -1 && value < node.rightNode!.value) {
      node.rightNode = this.rotateRight(node.rightNode!);
      return this.rotateLeft(node);
    }

    return node;
  }
}

const avlTree = new AVL();

avlTree.add(10);
// avlTree.add(10);
avlTree.add(20);
avlTree.add(30);
avlTree.add(40);
avlTree.add(50);

console.log("DELETING...");
avlTree.delete(10);
console.log("SEARCHING ", avlTree.findChild(40));
