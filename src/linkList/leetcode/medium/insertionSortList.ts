// 147. Insertion Sort List

/**
Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
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

// 2. The Algorithm
function insertionSortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;

  const dummy = new ListNode(0);
  dummy.next = head;

  let lastSorted: ListNode = head;
  let curr: ListNode | null = head.next;

  while (curr !== null) {
    if (lastSorted.val <= curr.val) {
      lastSorted = lastSorted.next!;
    } else {
      let prev: ListNode = dummy;

      while (prev.next !== null && prev.next.val < curr.val) {
        prev = prev.next;
      }

      lastSorted.next = curr.next;
      curr.next = prev.next;
      prev.next = curr;
    }
    curr = lastSorted.next;
  }

  return dummy.next;
}

// 3. Helper function: Convert Array to Linked List
function arrayToLinkedList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// 4. Helper function: Convert Linked List to Array (for easy printing)
function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// --- RUNNING THE TEST CASES ---

// Example 1
const input1 = [4, 2, 1, 3];
const list1 = arrayToLinkedList(input1);
const sortedList1 = insertionSortList(list1);
console.log("Example 1:");
console.log("Input: ", input1);
console.log("Output:", linkedListToArray(sortedList1));
console.log("-----------------------");

// Example 2
const input2 = [-1, 5, 3, 4, 0];
const list2 = arrayToLinkedList(input2);
const sortedList2 = insertionSortList(list2);
console.log("Example 2:");
console.log("Input: ", input2);
console.log("Output:", linkedListToArray(sortedList2));
