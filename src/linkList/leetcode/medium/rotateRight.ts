// 61. Rotate List

/**
Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
Example 2:


Input: head = [0,1,2], k = 4
Output: [2,0,1]


*/

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  // 1. Handle edge cases
  if (!head || !head.next || k === 0) {
    return head;
  }

  let length = 1;
  let tail = head;

  // 2. Find the length of the list and the current tail node
  while (tail.next) {
    length++;
    tail = tail.next;
  }

  // 3. Calculate the effective number of rotations
  k = k % length;
  if (k === 0) {
    return head;
  }

  // 4. Connect the tail to the head to form a circular list
  tail.next = head;

  // 5. Find the new tail which will be at (length - k - 1) steps away from the start
  let stepsToNewTail = length - k - 1;
  let newTail = head;

  for (let i = 0; i < stepsToNewTail; i++) {
    // We use the non-null assertion (!) because we are guaranteed a node exists here
    newTail = newTail.next!;
  }

  // 6. The new head is the next node of the new tail
  const newHead = newTail.next;

  // 7. Break the circular link
  newTail.next = null;

  return newHead;
}

// Example usage:
const head = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
);
const k = 2;
const rotatedList = rotateRight(head, k);

// Function to print the list (for testing purposes)
function printList(node: ListNode | null) {
  const values: number[] = [];
  while (node) {
    values.push(node.val);
    node = node.next;
  }
  console.log(values);
}

printList(rotatedList); // Output: [4, 5, 1, 2, 3]

const head2 = new ListNode(0, new ListNode(1, new ListNode(2)));
const k2 = 4;
const rotatedList2 = rotateRight(head2, k2);
printList(rotatedList2); // Output: [2, 0, 1]
