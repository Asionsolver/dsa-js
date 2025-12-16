// 19. Remove Nth Node From End of List

/**
Example 1:


Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Example 2:

Input: head = [1], n = 1
Output: []
Example 3:

Input: head = [1,2], n = 1
Output: [1]
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

const n = 2;

// const getLengthOfLinkedList = function (head: Node | null) {
//   let length = 0;
//   let current = head;

//   while (current !== null) {
//     length++;
//     current = current.next;
//   }

//   return length;
// };

// two pass solution
// const removeNthFromEnd = function (head: Node | null, n: number): Node | null {
//   let length = getLengthOfLinkedList(head);

//   if (n === length) {
//     let temp = head?.next!;
//     head = null;
//     return temp;
//   }

//   let travel_front = length - n;
//   let temp: Node | null = head;
//   let prev: Node | null = null;

//   while (travel_front--) {
//     prev = temp;
//     temp = temp?.next!;
//   }

//   if (prev !== null) {
//     prev.next = temp?.next ?? null;
//   }

//   temp = null;
//   return head;
// };

// one pass solution
const removeNthFromEnd = function (head: Node | null, n: number): Node | null {
  if (head === null) return null;

  let temp = head;
  for (let i = 1; i <= n; i++) {
    temp = temp.next!;
  }

  if (temp === null) {
    let result = head?.next!;
    head = null;
    return result;
  }

  let prev = head;

  while (temp !== null && temp.next !== null) {
    prev = prev?.next!;
    temp = temp?.next;
  }

  prev.next = prev?.next?.next!;
  return head;
};
console.log(removeNthFromEnd(listNode1.head, n));
