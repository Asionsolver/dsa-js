// 143. Reorder List

/**
 Example 1:


Input: head = [1,2,3,4]
Output: [1,4,2,3]
Example 2:


Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]

 */

class ListNode {
  value: number;
  next: ListNode | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0;
  }

  push(value: number) {
    const newNode = new ListNode(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    this.length++;
  }

  toArray() {
    let arr = [];
    let currentNode = this.head;

    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return arr;
  }

  reorderList(head: ListNode) {
    let current = head;

    let tail = head.next;

    while (current) {
      current;
    }
  }
}
let list = new SinglyLinkedList();

// console.log(list.head);
// console.log(list.tail);
// console.log("Linked List Length: ",list.length);
// console.log(list.isEmpty());

list.push(1);
// console.log("Linked List Length: ",list.length);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
console.log(list.toArray());
