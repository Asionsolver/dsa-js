// 2130. Maximum Twin Sum of a Linked List

/**
Example 1:


Input: head = [5,4,2,1]
Output: 6
Explanation:
Nodes 0 and 1 are the twins of nodes 3 and 2, respectively. All have twin sum = 6.
There are no other nodes with twins in the linked list.
Thus, the maximum twin sum of the linked list is 6. 
Example 2:


Input: head = [4,2,2,3]
Output: 7
Explanation:
The nodes with twins present in this linked list are:
- Node 0 is the twin of node 3 having a twin sum of 4 + 3 = 7.
- Node 1 is the twin of node 2 having a twin sum of 2 + 2 = 4.
Thus, the maximum twin sum of the linked list is max(7, 4) = 7. 
Example 3:


Input: head = [1,100000]
Output: 100001
Explanation:
There is only one node with a twin in the linked list having twin sum of 1 + 100000 = 100001.
*/

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function pairSum(head: ListNode | null): number {
  if (head === null) return 0;

  // Step 1: Find the middle of the linked list
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half of the linked list
  let prev: ListNode | null = null;
  let curr: ListNode | null = slow;

  while (curr !== null) {
    let nextTemp: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  // Step 3: Compare values from both halves
  let firstHalf: ListNode | null = head;
  let secondHalf: ListNode | null = prev; // Head of the reversed second half
  let maxTwinSum = 0;

  while (secondHalf !== null && firstHalf !== null) {
    const currentSum = firstHalf.val + secondHalf.val;
    maxTwinSum = Math.max(maxTwinSum, currentSum);

    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
  }

  return maxTwinSum;
}

// Example usage:
const head = new ListNode(5, new ListNode(4, new ListNode(2, new ListNode(1))));
console.log(pairSum(head)); // Output: 6

const head2 = new ListNode(
  4,
  new ListNode(2, new ListNode(2, new ListNode(3))),
);
console.log(pairSum(head2)); // Output: 7

const head3 = new ListNode(1, new ListNode(100000));
console.log(pairSum(head3)); // Output: 100001
