/**
@Singly_Linked List Implementation

    ** isEmpty
    ** push -> O(1)
    ** pop -> O(n);
    ** shift -> O(1)
    ** unshift -> O(1)
    ** toArray -> O(n)
    ** print All node -> O(n)
    ** delete by Value -> O(n)
    ** search Node -> O(n)
    ** get value by index -> O(n)
    ** remove value by index -> O(n)
    ** update value by index -> O(n)
    ** insert value by index -> O(n)
    ** reverse -> O(n)
    ** find middle -> O(n)
    ** clear -> O(1)
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

    let currentNode: ListNode | null = this.head;
    let output = "";
    while (currentNode) {
      output += currentNode.value + " -> ";
      currentNode = currentNode.next;
    }

    output += "null";
    return output;
  }

  searchNode(value: number) {
    if (!this.head) {
      console.log(
        "There is no node available. So you can not perform POP operation."
      );
      return null;
    }

    let current = this.head;
    if (current.value === value) {
      return true;
    }

    while (current.next !== null) {
      current = current.next;

      if (current.value === value) {
        return true;
      }
    }
    return false;
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
      this.length--;
      return;
    }

    let previous = null;
    while (current.next !== null) {
      previous = current;
      current = current.next;

      if (current.value === value) {
        //
        previous.next = current.next;
        this.length--;
        return;
      }
    }
  }
  // Return the node at a specific index
  getValueByIndex(index: number) {
    if (!this.head) {
      console.log("There is no node available.");
      return null;
    }

    if (index < 1 || index > this.length) {
      console.log(`Please provide valid index between 1 and ${this.length}`);
      return null;
    }

    let current: ListNode | null = this.head;
    for (let i = 1; i < index; i++) {
      if (current && current.next) {
        current = current.next;
      } else {
        return null;
      }
    }
    return current;
  }

  //Remove a node from a specific index
  removeNodeByIndex(index: number) {
    if (index < 1 || index > this.length + 1) {
      console.log(
        `Please provide valid index between 1 and ${this.length + 1}`
      );
      return false;
    }

    // If inserting at position 1 (beginning)
    if (index === 1) {
      return this.shift();
    }

    // If inserting at the end (position length + 1)
    if (index === this.length + 1) {
      return this.pop();
    }

    const prevNode = this.getValueByIndex(index - 1);
    if (prevNode && prevNode.next) {
      const removeNode = prevNode.next;
      prevNode.next = removeNode.next;
      this.length--;
      return removeNode;
    }

    return null;
  }
  // update the value at a specific index
  updateValueByIndex(value: number, index: number) {
    // 1st solution
    // if (!this.head) {
    //   console.log("There is no node available.");
    // }

    // if (index < 1 || index > this.length) {
    //   console.log(`Please provide valid index between 1 and ${this.length}`);
    // }

    // let current: ListNode | null = this.head;
    // for (let i = 1; i < index; i++) {
    //   if (current && current.next) {
    //     current = current.next;
    //   } else {
    //     return false;
    //   }
    // }
    // current!.value = value;

    // 2nd solution
    const node = this.getValueByIndex(index);
    if (!node) {
      return false;
    }

    node.value = value;
    return true;
  }

  // Insert a node at a specific position
  insertValueByIndex(value: number, index: number): boolean {
    if (index < 1 || index > this.length + 1) {
      console.log(
        `Please provide valid index between 1 and ${this.length + 1}`
      );
      return false;
    }

    // If inserting at position 1 (beginning)
    if (index === 1) {
      this.unshift(value);
      return true;
    }

    // If inserting at the end (position length + 1)
    if (index === this.length + 1) {
      this.push(value);
      return true;
    }

    const newNode = new ListNode(value);
    let current = this.head;

    // Move to the node at position (index - 1)
    for (let i = 2; i < index - 1; i++) {
      if (current) {
        current = current.next;
      }
    }

    if (current) {
      newNode.next = current.next;
      current.next = newNode;
      this.length++;
      return true;
    }

    return false;
  }

  // Linked list reverse
  reverse() {
    let prev = null;
    let current = this.head;
    let next = null;
    this.tail = this.head;
    // console.log((this.tail = this.head));
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }

  // Find the middle node
  findMiddle() {
    if (!this.head) return null;

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
      slow = slow.next!;
      fast = fast.next.next!;
    }

    return slow;
  }

  //  Entire list clear
  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
let list = new SinglyLinkedList();

// console.log(list.head);
// console.log(list.tail);
// console.log("Linked List Length: ",list.length);
// console.log(list.isEmpty());

list.push(5);
// console.log("Linked List Length: ",list.length);
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
// console.log("Linked List Length: ",list.length);
// console.log(list.shift());

// console.log(list);
// console.log(list.head);
// console.log(list.tail);
// console.log("Linked List Length: ",list.length);

// console.log("UnShift  Method Perform");
list.unshift(4);
list.unshift(3);
list.unshift(2);
list.unshift(1);
// console.log(list);
// console.log("Delete By Value  Method Perform");
list.deleteByValue(1);
list.deleteByValue(4);

console.log("All Node Show:");
// console.log(list.toArray());
console.log(list.printAllNode());
// if (list.searchNode(8)) {
//   console.log("This Node exists in this list.");
// } else {
//   console.log("This Node not exists in this list.");
// }

console.log("Linked List Length: ", list.length);

// console.log("Get Value By Index  Method Perform");
// console.log(list.getValueByIndex(10));
// console.log(list.getValueByIndex(1));
// console.log(list.getValueByIndex(8));
// console.log(list.getValueByIndex(2));

// console.log("Update value by index  Method Perform");
// list.updateValueByIndex(5, 9);

// console.log("InsertValueByIndex Method Perform");
// list.insertValueByIndex(50, 1);
// console.log(list.printAllNode());
// console.log("Linked List Length: ",list.length);

// console.log("Remove Node By Index Method Perform");
// console.log("Shift Method:", list.shift());
// console.log("Remove First Node By Index Method:", list.removeNodeByIndex(1));
// console.log(list.printAllNode());
// console.log("Third Remove Node By Index Method:", list.removeNodeByIndex(3));
// console.log(list.printAllNode());
// console.log("Remove Last Node By Index Method:", list.removeNodeByIndex(8));
// console.log(list.printAllNode());
// console.log("Linked List Length: ",list.length);

console.log("Reverse Method Perform");
list.reverse();
console.log(list.printAllNode());
console.log("Middle Element: ", list.findMiddle());
