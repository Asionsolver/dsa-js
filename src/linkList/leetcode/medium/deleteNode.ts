// 237. Delete Node in a Linked List

/**
Example 1:


Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
Example 2:


Input: head = [4,5,1,9], node = 1
Output: [4,5,9]
Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.
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
function deleteNode(node: ListNode | null): void {
  if (node === null || node.next === null) return;

  // Copy the value of the next node into the current node
  node.val = node.next.val;

  // Bypass the next node
  node.next = node.next.next;
}

// --- HELPER FUNCTIONS FOR LOCAL TESTING ---

// Helper to convert an Array to a Linked List
function createLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper to find a specific node by its value
function getNodeByValue(head: ListNode | null, val: number): ListNode | null {
  let current = head;
  while (current !== null) {
    if (current.val === val) return current;
    current = current.next;
  }
  return null;
}

// Helper to convert a Linked List back to an Array for easy console logging
function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// --- RUN THE TEST CASES ---

console.log("--- Test Case 1 ---");
let head1 = createLinkedList([4, 5, 1, 9]);
let nodeToDelete1 = getNodeByValue(head1, 5); // We want to delete node '5'

console.log("Before:", linkedListToArray(head1));
deleteNode(nodeToDelete1); // Call the function
console.log("After: ", linkedListToArray(head1));
// Output should be: [4, 1, 9]

console.log("\n--- Test Case 2 ---");
let head2 = createLinkedList([4, 5, 1, 9]);
let nodeToDelete2 = getNodeByValue(head2, 1); // We want to delete node '1'

console.log("Before:", linkedListToArray(head2));
deleteNode(nodeToDelete2); // Call the function
console.log("After: ", linkedListToArray(head2));
// Output should be: [4, 5, 9]
