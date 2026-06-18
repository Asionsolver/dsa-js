// 2. Add Two Numbers

/**
Example 1:


Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

*/

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const dummyHead = new ListNode(0);
  let curr = dummyHead;
  let carry = 0;
  let p = l1;
  let q = l2;

  // Loop until we reach the end of both lists and there is no carry left
  while (p !== null || q !== null || carry !== 0) {
    const x = p !== null ? p.val : 0;
    const y = q !== null ? q.val : 0;

    const sum = carry + x + y;
    carry = Math.floor(sum / 10);

    curr.next = new ListNode(sum % 10);
    curr = curr.next;

    if (p !== null) p = p.next;
    if (q !== null) q = q.next;
  }

  return dummyHead.next;
}

// Example usage:
const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));

const result = addTwoNumbers(l1, l2);

// Function to print the linked list
function printList(node: ListNode | null): void {
  const values: number[] = [];
  while (node !== null) {
    values.push(node.val);
    node = node.next;
  }
  console.log(values.join(" -> "));
}

printList(result); // Output: 7 -> 0 -> 8
