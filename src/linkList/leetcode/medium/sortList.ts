// 148. Sort List

/**
Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
Example 3:

Input: head = []
Output: []
*/

// ---------------------------------------------------------
// 1. Class Definition (Required)
// ---------------------------------------------------------
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// ---------------------------------------------------------
// 2. The Solution Logic (Merge Sort)
// ---------------------------------------------------------
function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head;
  }

  let slow: ListNode = head;
  let fast: ListNode | null = head.next;

  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  const mid = slow.next;
  slow.next = null;

  const left = sortList(head);
  const right = sortList(mid);

  return merge(left, right);
}

function merge(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  if (l1 !== null) current.next = l1;
  else if (l2 !== null) current.next = l2;

  return dummy.next;
}

// ---------------------------------------------------------
// 3. Helper Functions (For local testing)
// ---------------------------------------------------------

// Convert Array -> Linked List
function createLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

// Convert Linked List -> Array (for printing)
function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// ---------------------------------------------------------
// 4. Run Test Cases
// ---------------------------------------------------------

// Example 1
const input1 = [4, 2, 1, 3];
const list1 = createLinkedList(input1);
const sorted1 = sortList(list1);
console.log("Example 1 Output:", linkedListToArray(sorted1)); // Expected: [1, 2, 3, 4]

// Example 2
const input2 = [-1, 5, 3, 4, 0];
const list2 = createLinkedList(input2);
const sorted2 = sortList(list2);
console.log("Example 2 Output:", linkedListToArray(sorted2)); // Expected: [-1, 0, 3, 4, 5]

// Example 3
const input3: number[] = [];
const list3 = createLinkedList(input3);
const sorted3 = sortList(list3);
console.log("Example 3 Output:", linkedListToArray(sorted3)); // Expected: []
