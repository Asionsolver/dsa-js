class CircularListNode {
  value: number;
  next: CircularListNode | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}
class CircularLinkedList {
  head: CircularListNode | null;
  tail: CircularListNode | null;
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
    const newNode = new CircularListNode(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
    } else if (this.tail) {
      // set prev first
      newNode.next = this.head;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  unshift(value: number) {
    const newNode = new CircularListNode(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
    } else {
      let current = this.head;
      this.head = newNode;
      this.head.next = current;
      this.tail!.next = newNode;
    }
    this.length++;
  }

  toArray() {
    if (this.isEmpty()) {
      return [];
    }
    let arr = [];
    let currentNode = this.head;

    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;

      // Break when we return to the head
      if (currentNode === this.head) {
        break;
      }
    }
    return arr;
  }

  printAllNode() {
    if (!this.head) {
      console.log("Linked list is empty.");
      return;
    }

    const head = this.head;
    let currentNode: CircularListNode | null = this.head;
    let output = "";
    while (currentNode === head) {
      output += currentNode.value + " -> ";
      currentNode = currentNode.next;
    }

    output += "null";
    return output;
  }
}

let CircularList = new CircularLinkedList();

// console.log("CIRCULAR LINKED LIST HEAD", CircularList.head);
// console.log("CIRCULAR LINKED LIST TAIL", CircularList.tail);
// console.log("CIRCULAR LINKED LIST LENGTH: ", CircularList.length);
// console.log(CircularList.isEmpty());

// console.log("PUSH  Method Perform");
[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].forEach((value) =>
  CircularList.push(value)
);
// console.log("CIRCULAR LINKED LIST HEAD", CircularList.head);
// console.log("CIRCULAR LINKED LIST TAIL", CircularList.tail);
// console.log("CIRCULAR LINKED LIST LENGTH: ", CircularList.length);
// console.log(CircularList.tail?.next?.value);

// console.log("UNSHIFT  Method Perform");
[10, 9, 8].forEach((value) => CircularList.unshift(value));
// console.log("CIRCULAR LINKED LIST HEAD", CircularList.head);
// console.log("CIRCULAR LINKED LIST TAIL", CircularList.tail);
// console.log("CIRCULAR LINKED LIST LENGTH: ", CircularList.length);
// console.log(CircularList.tail?.next?.value);

console.log("TO ARRAY  Method Perform");
console.log("CIRCULAR LINKED LIST", CircularList.toArray());
