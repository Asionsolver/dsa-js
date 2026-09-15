// 25. Reverse Nodes in k-Group

/**
Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.
*/

/**
Example 1:


Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
Example 2:


Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
*/

/**
Constraints:

The number of nodes in the list is n.
1 <= k <= n <= 5000
0 <= Node.val <= 1000
 

Follow-up: Can you solve the problem in O(1) extra memory space?
*/

//  * Definition for singly-linked list.
class ListNode {
  val: number;

  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;

    this.next = next === undefined ? null : next;
  }
}

// Brute Force Approach: Using an Array to Store Nodes
// function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
//   if (!head || k <= 1) {
//     return head;
//   }

//   // Collect all nodes into an array.
//   const nodes: ListNode[] = [];
//   let curr: ListNode | null = head;
//   while (curr !== null) {
//     nodes.push(curr);
//     curr = curr.next;
//   }

//   const n = nodes.length;

//   // Reverse each group of size k in the array.
//   for (let i = 0; i + k <= n; i += k) {
//     let left = i;
//     let right = i + k - 1;
//     while (left < right) {
//       const temp = nodes[left];
//       nodes[left] = nodes[right];
//       nodes[right] = temp;
//       left++;
//       right--;
//     }
//   }

//   // Re-link the nodes according to the new order.
//   for (let i = 0; i < n - 1; i++) {
//     nodes[i].next = nodes[i + 1];
//   }
//   nodes[n - 1].next = null;

//   return nodes[0];
// }

// Optimized Approach: In-Place Reversal of Nodes in k-Group
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (!head || k <= 1) {
    return head;
  }

  // Create a dummy node to simplify edge cases at the head.
  const dummy = new ListNode(0, head);
  let prevGroupEnd: ListNode = dummy;

  while (true) {
    // Find the k-th node of the current group.
    const kthNode = getKthNode(prevGroupEnd, k);
    if (!kthNode) {
      break;
    }

    // Identify boundary nodes for reconnection.
    const nextGroupStart = kthNode.next;
    const currGroupStart = prevGroupEnd.next!;

    // Reverse the nodes in the current group.
    let prev: ListNode | null = nextGroupStart;
    let curr: ListNode | null = currGroupStart;

    while (curr !== nextGroupStart) {
      const tempNext: ListNode | null = curr!.next;
      curr!.next = prev;
      prev = curr;
      curr = tempNext;
    }

    // Connect previous group's end to the newly reversed group's head.
    prevGroupEnd.next = kthNode;

    // Move prevGroupEnd forward for the next iteration.
    prevGroupEnd = currGroupStart;
  }

  return dummy.next;
}

// Helper function to find the k-th node from a starting node.
function getKthNode(start: ListNode, k: number): ListNode | null {
  let curr: ListNode | null = start;
  while (curr !== null && k > 0) {
    curr = curr.next;
    k--;
  }
  return curr;
}
// Example usage:
const head = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
);
const k = 2;
const newHead = reverseKGroup(head, k);

// Print the modified linked list.
let curr: ListNode | null = newHead;
const result: number[] = [];
while (curr !== null) {
  result.push(curr.val);
  curr = curr.next;
}
console.log(result); // Output: [2, 1, 4, 3, 5]

const head2 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
);
const k2 = 3;
const newHead2 = reverseKGroup(head2, k2);

// Print the modified linked list.
let curr2: ListNode | null = newHead2;
const result2: number[] = [];
while (curr2 !== null) {
  result2.push(curr2.val);
  curr2 = curr2.next;
}
console.log(result2); // Output: [3, 2, 1, 4, 5]

const head3 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))),
);
const k3 = 1;
const newHead3 = reverseKGroup(head3, k3);

// Print the modified linked list.
let curr3: ListNode | null = newHead3;
const result3: number[] = [];
while (curr3 !== null) {
  result3.push(curr3.val);
  curr3 = curr3.next;
}
console.log(result3); // Output: [1, 2, 3, 4, 5]
