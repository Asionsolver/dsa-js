/**
@Doubly_Linked List Implementation

    * isEmpty
    * push -> O(1)
    * pop -> O(n);
    * shift -> O(1)
    * unshift -> O(1)
    * show list -> O(n)
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
}
let doublyList = new DoublyLinkedList();

// console.log(doublyList.head);
// console.log(doublyList.tail);
// console.log(doublyList.length);
// console.log(doublyList.isEmpty());

// console.log("PUSH  Method Perform");
doublyList.push(5);
doublyList.push(6);
doublyList.push(7);
doublyList.push(8);
doublyList.push(9);
doublyList.push(10);
// console.log("HEAD: ", doublyList.head);
// console.log("TAIL", doublyList.tail);
// console.log(doublyList.length);
// console.log(doublyList.isEmpty());

console.log("Popping  Method Perform");
console.log(doublyList.pop());
console.log(doublyList.pop());
// console.log(doublyList.head?.value);
console.log(doublyList.tail?.prev?.prev?.value);
// console.log(doublyList.head?.next?.next?.next?.next?.value);
// console.log(doublyList.length);
// console.log("DOUBLY LINKED LIST: ", doublyList);
