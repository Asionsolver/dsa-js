// 143. Reorder List

/**
 Example 1:


Input: head = [1,2,3,4]
Output: [1,4,2,3]
Example 2:


Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]

 */

class Node {
  value: number;
  next: Node | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  head: Node | null;
  tail: Node | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(value: number) {
    let newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current?.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  length() {
    if (this.head === null) {
      return 0;
    }
    let counter = 0;
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
      counter++;
    }

    return counter;
  }
}
let list = new SinglyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);

// console.log(list);
console.log(list.length());
const reorderList = function (head: Node | null) {
  if (head === null || head.next === null || head.next.next === null) {
    return;
  }
  // find middle
  let slow: Node | null = head;
  let fast: Node | null = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  let secondeHead = slow?.next;

  // detach two linked list
  slow!.next = null;

  // reverse the second linked list

  let prev = null;
  let current = secondeHead;
  let next = null;
  while (current) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  // insert nodes of second list into the first list
  let tempOne = head;
  let tempTwo = prev;

  while (tempTwo !== null) {
    let markerOne = tempOne.next!;
    let markerTwo = tempTwo.next;
    tempOne.next = tempTwo;
    tempTwo.next = markerOne;
    tempOne = markerOne;
    tempTwo = markerTwo;
  }
};

console.log(reorderList(list.head));
