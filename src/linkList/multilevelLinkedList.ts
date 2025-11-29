// multi-level doubly linked list

class ListNode {
  value: number;
  prev: ListNode | null;
  next: ListNode | null;
  child: ListNode | null;
  constructor(value: number) {
    this.value = value;
    this.prev = null;
    this.next = null;
    this.child = null;
  }
}

function connect(a: ListNode, b: ListNode) {
  a.next = b;
  b.prev = a;
}

function createMultiLevelList(): ListNode {
  // Level 1
  const n1 = new ListNode(1);
  const n2 = new ListNode(2);
  const n3 = new ListNode(3);
  const n4 = new ListNode(4);
  const n5 = new ListNode(5);
  const n6 = new ListNode(6);

  connect(n1, n2);
  connect(n2, n3);
  connect(n3, n4);
  connect(n4, n5);
  connect(n5, n6);

  // Level 2 under 3
  const n7 = new ListNode(7);
  const n8 = new ListNode(8);
  const n9 = new ListNode(9);
  const n10 = new ListNode(10);

  connect(n7, n8);
  connect(n8, n9);
  connect(n9, n10);

  n3.child = n7;

  // Level 3 under 8
  const n11 = new ListNode(11);
  const n12 = new ListNode(12);

  connect(n11, n12);

  n8.child = n11;

  return n1; // head of the multilevel list
}

function printMultiLevel(head: ListNode) {
  const visited = new Set<ListNode>();

  function dfs(node: ListNode | null, level: number) {
    while (node) {
      const indent = " ".repeat(level * 4);
      console.log(`${indent}${node.value}`);

      // prevent printing same node twice if cycles exist
      if (visited.has(node)) return;
      visited.add(node);

      if (node.child) {
        console.log(`${indent}Child of ${node.value}:`);
        dfs(node.child, level + 1);
      }

      node = node.next;
    }
  }

  dfs(head, 0);
}

// function toSafeJSON(head: ListNode) {
//   const visited = new Set<ListNode>();

//   function clone(node: ListNode | null): any {
//     if (!node || visited.has(node)) return null;
//     visited.add(node);

//     return {
//       value: node.value,
//       next: clone(node.next),
//       child: clone(node.child),
//     };
//   }

//   return clone(head);
// }
const head = createMultiLevelList();
printMultiLevel(head);
// console.log(JSON.stringify(toSafeJSON(head), null, 4));
