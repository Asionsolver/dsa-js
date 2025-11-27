// Singly Linked List
// 21. Merge Two Sorted Lists
/**
Example 1:


Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]

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
listNode1.insertAtEnd(4);
// console.log(listNode1);

let listNode2 = new LinkedList();
listNode2.insertAtEnd(1);
listNode2.insertAtEnd(3);
listNode2.insertAtEnd(4);
// console.log(listNode2);

const mergeTwoLists = function (list1: Node | null, list2: Node | null) {
  if (list1 === null || list2 === null) {
    return list1 === null ? list2 : list1;
  }

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
function toArray(head: Node | null): number[] {
  let res = [];
  while (head !== null) {
    res.push(head.val);
    head = head.next;
  }
  return res;
}
let mergedHead = mergeTwoLists(listNode1.head, listNode2.head);
console.log(toArray(mergedHead));
