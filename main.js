class BSTNode {
  value;
  leftNode;
  rightNode;
  constructor(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
  }
}
class BST {
  root;
  constructor() {
    this.root = null;
  }

  addChild(value) {
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

console.log(bst);
