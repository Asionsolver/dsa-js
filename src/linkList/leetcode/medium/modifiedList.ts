// 3217. Delete Nodes From Linked List Present in Array

/**
Example 1:

Input: nums = [1,2,3], head = [1,2,3,4,5]

Output: [4,5]

Explanation:



Remove the nodes with values 1, 2, and 3.

Example 2:

Input: nums = [1], head = [1,2,1,2,1,2]

Output: [2,2,2]

Explanation:



Remove the nodes with value 1.

Example 3:

Input: nums = [5], head = [1,2,3,4]

Output: [1,2,3,4]

Explanation:



No node has value 5.
*/

// 1. Define the Linked List Node
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 2. The Solution Function
function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
  const numSet = new Set(nums);
  const dummy = new ListNode(0);
  dummy.next = head;

  let current = dummy;
  while (current.next !== null) {
    if (numSet.has(current.next.val)) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return dummy.next;
}

// --- HELPER FUNCTIONS FOR TESTING ---

/**
 * Converts an array into a Linked List
 */
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

/**
 * Converts a Linked List back into an array for easy printing
 */
function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// --- EXECUTION EXAMPLE ---

// Input: nums = [1, 2, 3], head = [1, 2, 3, 4, 5]
const nums = [1, 2, 3];
const listHead = createLinkedList([1, 2, 3, 4, 5]);

console.log("Original List:", linkedListToArray(listHead));

// Run the function
const resultHead = modifiedList(nums, listHead);

// Output: [4, 5]
console.log("Modified List:", linkedListToArray(resultHead));

// Example 2:
const nums2 = [1];
const listHead2 = createLinkedList([1, 2, 1, 2, 1, 2]);
const resultHead2 = modifiedList(nums2, listHead2);
console.log("Example 2 Result:", linkedListToArray(resultHead2)); // [2, 2, 2]
