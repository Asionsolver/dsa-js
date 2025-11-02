class BSTNode {
  value: number;
  leftNode: BSTNode | null;
  rightNode: BSTNode | null;
  constructor(value: number) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}
class BST {
  root: null | BSTNode;
  constructor() {
    this.root = null;
  }

  addChild(value: number) {
    const newNode = new BSTNode(value);
    if (this.root === null) {
      this.root = newNode;
      return newNode;
    }

    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.value) {
        return "🚫 Duplicate value not allowed";
      } else if (value < currentNode.value) {
        if (currentNode.leftNode === null) {
          currentNode.leftNode = newNode;
          return newNode;
        } else {
          currentNode = currentNode.leftNode;
        }
      } else {
        if (currentNode.rightNode === null) {
          currentNode.rightNode = newNode;
          return newNode;
        } else {
          currentNode = currentNode.rightNode;
        }
      }
    }
  }

  findChild(value: number) {
    if (!this.root) {
      return "No node Available.";
    }

    let currentNode: BSTNode | null = this.root;

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

    const queue: BSTNode[] = [this.root];
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
}

const bst = new BST();
const values = [
  50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85, 5, 15, 27, 42, 47,
  3, 7, 14, 16, 24,
];
console.log(`Adding ${values.length} values to BST:`);
values.forEach((value, index) => {
  const result = bst.addChild(value);
  if (result instanceof BSTNode) {
    console.log(`${index + 1}. Added Value: ${value} ✅`);
  } else {
    console.log(`${index + 1}. ${result} (Value: ${value})`);
  }
});
// console.log("FULL BINARY SEARCH TREE");
// console.log(bst);
// console.log("BINARY TREE FIND CHILD METHOD PERFORM");
// console.log(bst.findChild(25));

console.log("BINARY TREE TRAVERSAL LEVEL ORDER METHOD PERFORM");
console.log(bst.traversalLevelOrder());
