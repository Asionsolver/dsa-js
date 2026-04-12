// 2487. Remove Nodes From Linked List

/**
Example 1:


Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.
Example 2:

Input: head = [1,1,1,1]
Output: [1,1,1,1]
Explanation: Every node has value 1, so no nodes are removed.
*/

// 1. Define the ListNode class
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 2. The solution function
function removeNodes(head: ListNode | null): ListNode | null {
  if (!head) return null;

  const reverseList = (node: ListNode | null): ListNode | null => {
    let prev: ListNode | null = null;
    let current = node;

    while (current !== null) {
      const nextNode = current.next;
      current.next = prev;
      prev = current;
      current = nextNode;
    }

    return prev;
  };

  let reversedHead = reverseList(head);
  let current = reversedHead;
  let maxVal = current!.val;

  while (current !== null && current.next !== null) {
    if (current.next.val < maxVal) {
      current.next = current.next.next;
    } else {
      maxVal = current.next.val;
      current = current.next;
    }
  }

  return reverseList(reversedHead);
}

// --- HELPER FUNCTIONS FOR LOCAL TESTING ---

// Convert an array to a Linked List
function arrayToLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Convert a Linked List back to an array (for easy console logging)
function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// --- RUNNING TEST CASES ---

// Example 1
const input1 = [5, 2, 13, 3, 8];
let head1 = arrayToLinkedList(input1);
let result1 = removeNodes(head1);
console.log("Example 1 Input:  [5, 2, 13, 3, 8]");
console.log("Example 1 Output:", linkedListToArray(result1));
console.log("-----------------------------------------");

// Example 2
const input2 = [1, 1, 1, 1];
let head2 = arrayToLinkedList(input2);
let result2 = removeNodes(head2);
console.log("Example 2 Input:  [1, 1, 1, 1]");
console.log("Example 2 Output:", linkedListToArray(result2));
