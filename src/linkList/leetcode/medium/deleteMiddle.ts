// 2095. Delete the Middle Node of a Linked List

/**
Example 1:


Input: head = [1,3,4,7,1,2,6]
Output: [1,3,4,1,2,6]
Explanation:
The above figure represents the given linked list. The indices of the nodes are written below.
Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
We return the new list after removing this node. 
Example 2:


Input: head = [1,2,3,4]
Output: [1,2,4]
Explanation:
The above figure represents the given linked list.
For n = 4, node 2 with value 3 is the middle node, which is marked in red.
Example 3:


Input: head = [2,1]
Output: [2]
Explanation:
The above figure represents the given linked list.
For n = 2, node 1 with value 1 is the middle node, which is marked in red.
Node 0 with value 2 is the only node remaining after removing node 1.
*/

// 1. Define the ListNode class (LeetCode usually does this for you)
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 2. The Solution Function
// function deleteMiddle(head: ListNode | null): ListNode | null {
//   if (head === null || head.next === null) {
//     return null;
//   }

//   let slow: ListNode = head;
//   let fast: ListNode | null = head.next.next;

//   while (fast !== null && fast.next !== null) {
//     slow = slow.next!;
//     fast = fast.next.next;
//   }

//   slow.next = slow.next!.next;

//   return head;
// }

// 3. Optimized Solution (without using extra space for counting nodes)
function deleteMiddle(head: ListNode | null): ListNode | null {
  // if the list is empty or contains only one node
  if (!head || !head.next) {
    return null;
  }

  let slow = head;
  let fast = head.next.next;

  // Find the node just before the middle node through the loop
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // Dropping the middle node
  slow.next = slow.next!.next;

  return head;
}

// --- HELPER FUNCTIONS FOR LOCAL TESTING ---

// Convert an array to a Linked List
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

// Convert a Linked List back to an array (for easy printing)
function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// Function to run and display the tests
function runTest(inputArray: number[]) {
  console.log(`Input: head = [${inputArray.join(",")}]`);

  // 1. Convert array to linked list
  const head = arrayToLinkedList(inputArray);

  // 2. Run your solution
  const resultHead = deleteMiddle(head);

  // 3. Convert the resulting linked list back to an array
  const resultArray = linkedListToArray(resultHead);

  console.log(`Output: [${resultArray.join(",")}]\n`);
}

// --- RUN EXAMPLES ---
runTest([1, 3, 4, 7, 1, 2, 6]); // Expected Output: [1, 3, 4, 1, 2, 6]
runTest([1, 2, 3, 4]); // Expected Output: [1, 2, 4]
runTest([2, 1]); // Expected Output: [2]
runTest([1]); // Expected Output: []
