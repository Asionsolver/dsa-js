/**
@Doubly_Linked List Implementation

    ** isEmpty
    ** push -> O(1)
    ** pop -> O(n);
    ** shift -> O(1)
    ** unshift -> O(1)
    ** toArray -> O(n)
    ** print All node -> O(n)
    ** delete by Value -> O(n)
    * search Node -> O(n)
    * get value by index -> O(n)
    * remove value by index -> O(n)
    * update value by index -> O(n)
    * insert value by index -> O(n)
    * reverse -> O(n)
    * find middle -> O(n)
    * clear -> O(1)
*/
class DoublyListNode {
  value: number;
  next: DoublyListNode | null;
  prev: DoublyListNode | null;
  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  head: DoublyListNode | null;
  tail: DoublyListNode | null;
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
    const newNode = new DoublyListNode(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.tail) {
      // set prev first
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
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

    // if there is only a single node
    if (this.length === 1 && this.head) {
      const removedNode = this.head;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return removedNode;
    }

    // Otherwise — there are multiple nodes
    const removedNode = this.tail!; // last node
    const newTail = removedNode.prev; // second-last node

    if (newTail) {
      newTail.next = null;
      this.tail = newTail;
    }

    removedNode.prev = null;
    this.length--;

    return removedNode;
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
      this.head!.prev = null;
    }

    this.length--;
    return removeFirstNode;
  }

  unshift(value: number) {
    const newNode = new DoublyListNode(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let current = this.head;
      current!.prev = newNode;
      this.head = newNode;
      this.head.next = current;
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

  printAllNode() {
    if (!this.head) {
      console.log("Linked list is empty.");
      return;
    }

    let currentNode: DoublyListNode | null = this.head;
    let output = "";
    while (currentNode) {
      output += currentNode.value + " -> ";
      currentNode = currentNode.next;
    }

    output += "null";
    return output;
  }

  deleteByValue(value: number) {
    if (!this.head) {
      console.log(
        "There is no node available. So you can not perform POP operation."
      );
      return null;
    }

    let current = this.head;
    if (current.value === value) {
      this.head = current?.next;
      this.head!.prev = null;
      // current.next = null;
      this.length--;
      return current;
    }

    while (current.next !== null) {
      current = current.next;
      if (current.value === value) {
        current.prev!.next = current.next;
        this.length--;
        return current;
      }
    }
    return null;
  }
}
let doublyList = new DoublyLinkedList();

// console.log("DOUBLY LINKED LIST HEAD",doublyList.head);
// console.log("DOUBLY LINKED LIST TAIL",doublyList.tail);
// console.log("DOUBLY LINKED LIST LENGTH: ",doublyList.length);
// console.log(doublyList.isEmpty());

// console.log("PUSH  Method Perform");
doublyList.push(11);
doublyList.push(12);
doublyList.push(13);
doublyList.push(14);
doublyList.push(15);
doublyList.push(16);
doublyList.push(17);
doublyList.push(18);
doublyList.push(19);
doublyList.push(20);
// console.log("HEAD: ", doublyList.head);
// console.log("TAIL", doublyList.tail);
//  console.log("DOUBLY LINKED LIST LENGTH: ",doublyList.length);;
// console.log(doublyList.isEmpty());

// console.log("Popping  Method Perform");
// console.log("POPPED NODE: ", doublyList.pop());
// console.log("DOUBLY LINKED LIST TAIL", doublyList.tail);
// console.log("POPPED NODE: ", doublyList.pop());
// console.log("DOUBLY LINKED LIST LENGTH: ", doublyList.length);

// console.log("Shift  Method Perform");
// console.log("SHIFT NODE: ", doublyList.shift());
// console.log("SHIFT NODE: ", doublyList.shift());
// console.log("HEAD: ", doublyList.head);
// console.log("PREVIOUS NODE: ", doublyList.head?.prev);
// console.log("DOUBLY LINKED LIST LENGTH: ", doublyList.length);

// console.log("UnShift  Method Perform");
doublyList.unshift(10);
doublyList.unshift(9);
// console.log("HEAD: ", doublyList.head);
// console.log("HEAD: ", doublyList.head?.next);

// console.log("ToArray  Method Perform");
// console.log(doublyList.toArray());
// console.log("DOUBLY LINKED LIST LENGTH: ", doublyList.length);

// console.log("Print All Node  Method Perform");
console.log(doublyList.printAllNode());

console.log("delete By Value Method Perform");
// console.log("DELETED VALUE: ", doublyList.deleteByValue(9));
console.log("DOUBLY LINKED LIST LENGTH: ", doublyList.length);
console.log("DELETED VALUE: ", doublyList.deleteByValue(20));

console.log(doublyList.toArray());
// console.log("HEAD: ", doublyList.head);
console.log("DOUBLY LINKED LIST LENGTH: ", doublyList.length);
