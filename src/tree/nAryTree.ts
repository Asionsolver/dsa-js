class NAryTreeNode {
  value: number;
  children: NAryTreeNode[];
  constructor(value: number) {
    this.value = value;
    this.children = [];
  }
}

class NAryTree {
  root: null | NAryTreeNode;
  constructor() {
    this.root = null;
  }

  findNode(node: NAryTreeNode, value: number): null | NAryTreeNode {
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

  insert(parentNodeValue: null | number, value: number) {
    //
    const newNode = new NAryTreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const parent = this.findNode(this.root, parentNodeValue!);

    if (!parent) {
      console.log(`Could not find parent with value ${parentNodeValue}`);
      return;
    }
    parent.children.push(newNode);
    // console.log(this.root);
  }
  breadthFirstSearch() {
    if (!this.root) {
      return;
    }

    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current) {
        console.log(current?.value);
        queue.push(...current.children);
      }
    }
  }

  depthFirstSearch(node = this.root) {
    if (!node) {
      return;
    }
    console.log(node.value);
    for (const child of node.children) {
      this.depthFirstSearch(child);
    }
  }

  delete() {
    //
  }
}

const nAryTree = new NAryTree();
nAryTree.insert(null, 1);
nAryTree.insert(1, 2);
nAryTree.insert(1, 3);
nAryTree.insert(1, 5);
nAryTree.insert(2, 7);
nAryTree.insert(2, 8);
nAryTree.insert(3, 4);
nAryTree.insert(3, 6);
nAryTree.insert(5, 9);
nAryTree.insert(5, 10);
console.log(nAryTree);
// nAryTree.breadthFirstSearch();
// nAryTree.depthFirstSearch();
