// 23. Merge k Sorted Lists

/**
Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
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
listNode1.insertAtEnd(4);
listNode1.insertAtEnd(5);
let listNode2 = new LinkedList();
listNode2.insertAtEnd(1);
listNode2.insertAtEnd(3);
listNode2.insertAtEnd(4);
let listNode3 = new LinkedList();
listNode3.insertAtEnd(2);
listNode3.insertAtEnd(6);

const mergeKLists = function (lists: Array<Node | null>) {};

console.log(mergeKLists([listNode1.head, listNode2.head, listNode3.head]));
