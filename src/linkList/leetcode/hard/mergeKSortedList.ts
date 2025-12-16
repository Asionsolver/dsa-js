// 23. Merge k Sorted Lists

/**
Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []

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
listNode1.insertAtEnd(4);
listNode1.insertAtEnd(5);
let listNode2 = new LinkedList();
listNode2.insertAtEnd(1);
listNode2.insertAtEnd(3);
listNode2.insertAtEnd(4);
let listNode3 = new LinkedList();
listNode3.insertAtEnd(2);
listNode3.insertAtEnd(6);

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

const partitionAndMerge = function (
  start: number,
  end: number,
  lists: Array<Node | null>
): Node | null {
  if (start > end) {
    return null;
  }

  if (start === end) {
    return lists[start];
  }

  let mid = Math.floor(start + (end - start) / 2);

  let l1 = partitionAndMerge(start, mid, lists);
  let l2 = partitionAndMerge(mid + 1, end, lists);

  return mergeTwoLists(l1, l2);
};

const mergeKLists = function (lists: Array<Node | null>) {
  let size = lists.length;
  if (size === 0) {
    return null;
  }

  return partitionAndMerge(0, size - 1, lists);
};

console.log(mergeKLists([listNode1.head, listNode2.head, listNode3.head]));
