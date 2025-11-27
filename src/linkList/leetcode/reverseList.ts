// 206. Reverse Linked List

/**
Example 1:


Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:


Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []
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

  insertAtEnd(val: number) {
    const newNode = new Node(val);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
}

let listNode1 = new LinkedList();
listNode1.insertAtEnd(1);
listNode1.insertAtEnd(2);
listNode1.insertAtEnd(3);
listNode1.insertAtEnd(4);
listNode1.insertAtEnd(5);

const reverseList = function (head: Node | null) {
  let prev = null;
  let current = head;
  let next = null;

  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev; // prev becomes new head
};

console.log(reverseList(listNode1.head));
