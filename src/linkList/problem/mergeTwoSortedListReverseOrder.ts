// Merge 2 sorted linked list in reverse order(gfg)

/**
Input: LinkedList1 = 1->3, LinkedList2 = 2->4
Output: 4->3->2->1
Explanation: After merging the two lists in non-increasing order, we have new lists as 4->3->2->1.


Input: LinkedList1 = 5->10->15->40, LinkedList2 = 2->3->20
Output: 40->20->15->10->5->3->2
Explanation: After merging the two lists in non-increasing order, we have new lists as 40->20->15->10->5->3->2.
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
listNode1.insertAtEnd(3);

let listNode2 = new LinkedList();
listNode2.insertAtEnd(2);
listNode2.insertAtEnd(4);
const mergeTwoSortedList = function (list1: Node | null, list2: Node | null) {
  if (list1 === null || list2 === null) {
    return list1 === null ? list2 : list1;
  }

  if (list1.val <= list2.val) {
    list1.next = mergeTwoSortedList(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoSortedList(list1, list2.next);
    return list2;
  }
};

const reverseList = function (head: Node | null): Node | null {
  if (head === null || head.next === null) {
    return head;
  }
  let last: Node | null = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return last;
};

const mergeResult = function (list1: Node | null, list2: Node | null) {
  let result = mergeTwoSortedList(list1, list2);
  result = reverseList(result);
  return result;
};

console.log(mergeResult(listNode1.head, listNode2.head));
