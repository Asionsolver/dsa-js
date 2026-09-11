// 24. Swap Nodes in Pairs

/**
Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)
*/

/**
Example 1:

Input: head = [1,2,3,4]

Output: [2,1,4,3]

Explanation:



Example 2:

Input: head = []

Output: []

Example 3:

Input: head = [1]

Output: [1]

Example 4:

Input: head = [1,2,3]

Output: [2,1,3]

 


*/

/**
Constraints:

The number of nodes in the list is in the range [0, 100].
0 <= Node.val <= 100
*/

//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Brute Force Approach
// function swapPairs(head: ListNode | null): ListNode | null {
//   // If list is empty or has only one node, no swap is needed.
//   if (!head || !head.next) {
//     return head;
//   }

//   // Collect all nodes into an array.
//   const nodes: ListNode[] = [];
//   let current: ListNode | null = head;
//   while (current !== null) {
//     nodes.push(current);
//     current = current.next;
//   }

//   // Swap adjacent nodes inside the array.
//   for (let i = 0; i < nodes.length - 1; i += 2) {
//     const temp = nodes[i];
//     nodes[i] = nodes[i + 1];
//     nodes[i + 1] = temp;
//   }

//   // Reconstruct the linked list pointers based on the array order.
//   for (let i = 0; i < nodes.length - 1; i++) {
//     nodes[i].next = nodes[i + 1];
//   }
//   nodes[nodes.length - 1].next = null;

//   // Return the new head of the list.
//   return nodes[0];
// }

// Optimized Approach
function swapPairs(head: ListNode | null): ListNode | null {
  // Create a dummy node that points to the head to simplify edge cases.
  const dummy = new ListNode(0, head);

  // 'prev' points to the node right before the current pair to swap.
  let prev: ListNode = dummy;

  // Loop as long as there is a pair of nodes available to swap.
  while (prev.next !== null && prev.next.next !== null) {
    // Identify the two nodes in the current pair.
    const first: ListNode = prev.next;
    const second: ListNode = prev.next.next;

    // Perform the swap by rewiring pointers.
    first.next = second.next;
    second.next = first;
    prev.next = second;

    // Advance 'prev' to the end of the swapped pair for the next iteration.
    prev = first;
  }

  // The new head of the list is dummy.next.
  return dummy.next;
}
// Example usage:
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
const swappedHead = swapPairs(head);

// Function to print the linked list for verification
function printList(node: ListNode | null): void {
  const values: number[] = [];
  while (node) {
    values.push(node.val);
    node = node.next;
  }
  console.log(values.join(" -> "));
}

printList(swappedHead); // Output: 2 -> 1 -> 4 -> 3

const head2 = new ListNode(1, new ListNode(2, new ListNode(3)));
const swappedHead2 = swapPairs(head2);
printList(swappedHead2); // Output: 2 -> 1 -> 3
