class NAryTreeNode {
  value;
  children;
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

class NAryTree {
  root;
  constructor() {
    this.root = null;
  }

  findNode(node, value) {
    if (!node) {
      return null;
    }

    if (node.value === value) {
      return node;
    }

    for (let child of node.children) {
      const result = this.findNode(child, value);
      if (result) {
        return result;
      }
    }

    return null;
  }

  insert(parentNodeValue, value) {
    //
    const newNode = new NAryTreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const parent = this.findNode(this.root, parentNodeValue);

    if (!parent) {
      console.log(`Could not find parent with value ${parentNodeValue}`);
      return;
    }
    parent.children.push(newNode);
    console.log(this.root);
  }
}

const nAryTree = new NAryTree();
nAryTree.insert(null, 1);
nAryTree.insert(1, 2);
nAryTree.insert(1, 3);
nAryTree.insert(1, 4);
nAryTree.insert(2, 5);
nAryTree.insert(2, 6);
nAryTree.insert(4, 7);
nAryTree.insert(4, 8);
nAryTree.insert(4, 9);
// console.log(nAryTree);
