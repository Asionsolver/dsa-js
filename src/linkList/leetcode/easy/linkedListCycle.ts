// 141. Linked List Cycle

/**
Example 1:


Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
Example 2:


Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
Example 3:


Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.


*/
class Node {
  val: number;
  next: Node | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  head: Node | null;
  tail: Node | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // O(1) insert using tail
  insertAtEnd(val: number) {
    const newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  // Create cycle like LeetCode, using pos
  createCycle(pos: number) {
    if (pos < 0) return;

    let cycleNode = this.head;
    for (let i = 0; i < pos; i++) {
      cycleNode = cycleNode!.next;
    }

    this.tail!.next = cycleNode!;
  }
}

let listNode1 = new LinkedList();
listNode1.insertAtEnd(3);
listNode1.insertAtEnd(2);
listNode1.insertAtEnd(0);
listNode1.insertAtEnd(-4);
// create cycle: pos = 1 → tail.next = node with value 2
listNode1.createCycle(1);
const hasCycle = function (head: Node | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next?.next;
    if (slow === fast) {
      return true;
    }
  }

  return false;
};

console.log(hasCycle(listNode1.head));
