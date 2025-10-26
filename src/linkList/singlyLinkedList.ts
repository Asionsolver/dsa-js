/**
@Singly_Linked List Implementation

    * isEmpty
    * push
    * pop
    * shift
    * unshift
    * show list

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

  pop() {
    if (!this.head) {
      console.log(
        "There is no node available. So you can not perform POP operation."
      );
      return null;
    }
    if (this.length === 1 && this.head) {
      let removeNode = this.head;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return removeNode;
    }

    let currentNode = this.head;
    let newLastNode: ListNode | null = null;
    while (currentNode.next) {
      if (currentNode.next === this.tail) {
        // console.log("Current Node: ", currentNode);
        // console.log("Tail Node: ", this.tail);
        newLastNode = currentNode;
        // console.log("New Last Node: ", newLastNode);
        break;
      }
      console.log("CurrentNode Next", currentNode?.next);
      currentNode = currentNode?.next;
    }

    if (newLastNode && this.tail) {
      //   console.log("If newLastNode", newLastNode);
      //   console.log("If Tail", this.tail);
      const removedNode = this.tail;
      newLastNode.next = null;
      this.tail = newLastNode;
      //   console.log("Tail: ", this.tail);
      this.length--;
      return removedNode;
    }

    return null;
  }

  shift() {
    if (!this.head) {
      console.log(
        "There is no node available. So you can not perform SHIFT operation."
      );
      return null;
    }

    let removeFirstNode = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }

    this.length--;
    return removeFirstNode;
  }

  unshift(value: number) {
    const newNode = new ListNode(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let current = this.head;
      this.head = newNode;
      this.head.next = current;
    }
    this.length++;
  }

  showAllNode() {
    let arr = [];
    let currentNode = this.head;

    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return arr;
  }

  printAllNode() {
    if (!this.head) {
      console.log("Linked list is empty.");
      return;
    }

    let currentNode: ListNode | null = this.head;
    let output = "";
    while (currentNode) {
      output += currentNode.value + " -> ";
      currentNode = currentNode.next;
    }

    output += "null";
    return output;
  }
}
let list = new SinglyLinkedList();

// console.log(list.head);
// console.log(list.tail);
// console.log(list.length);
// console.log(list.isEmpty());

list.push(5);
// console.log(list.length);
list.push(6);
list.push(7);
list.push(8);
list.push(9);
list.push(10);
// console.log(list);
// console.log(list.isEmpty());

// console.log("Head Value: ", list.head);
// console.log("Tail Value", list.tail);
// console.log(list.head?.value);
// console.log(list.head?.next);
// console.log(list.head?.next?.next?.next?.next?.next);

// console.log("Popping  Method Perform");
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());

// console.log(list.tail?.value);

// console.log("Shift Method Perform");
// console.log(list.length);
// console.log(list.shift());

// console.log(list);
// console.log(list.head);
// console.log(list.tail);
// console.log(list.length);

// console.log("UnShift  Method Perform");
list.unshift(4);
list.unshift(3);
list.unshift(2);
list.unshift(1);
// console.log(list);

console.log("All Node Show:");
// console.log(list.showAllNode());
console.log(list.printAllNode());
