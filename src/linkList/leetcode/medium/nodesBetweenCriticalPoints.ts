// 2058. Find the Minimum and Maximum Number of Nodes Between

/**
A critical point in a linked list is defined as either a local maxima or a local minima.

A node is a local maxima if the current node has a value strictly greater than the previous node and the next node.

A node is a local minima if the current node has a value strictly smaller than the previous node and the next node.

Note that a node can only be a local maxima/minima if there exists both a previous node and a next node.

Given a linked list head, return an array of length 2 containing [minDistance, maxDistance] where minDistance is the minimum distance between any two distinct critical points and maxDistance is the maximum distance between any two distinct critical points. If there are fewer than two critical points, return [-1, -1].
*/

/**
Example 1:


Input: head = [3,1]
Output: [-1,-1]
Explanation: There are no critical points in [3,1].
Example 2:


Input: head = [5,3,1,2,5,1,2]
Output: [1,3]
Explanation: There are three critical points:
- [5,3,1,2,5,1,2]: The third node is a local minima because 1 is less than 3 and 2.
- [5,3,1,2,5,1,2]: The fifth node is a local maxima because 5 is greater than 2 and 1.
- [5,3,1,2,5,1,2]: The sixth node is a local minima because 1 is less than 5 and 2.
The minimum distance is between the fifth and the sixth node. minDistance = 6 - 5 = 1.
The maximum distance is between the third and the sixth node. maxDistance = 6 - 3 = 3.
Example 3:


Input: head = [1,3,2,2,3,2,2,2,7]
Output: [3,3]
Explanation: There are two critical points:
- [1,3,2,2,3,2,2,2,7]: The second node is a local maxima because 3 is greater than 1 and 2.
- [1,3,2,2,3,2,2,2,7]: The fifth node is a local maxima because 3 is greater than 2 and 2.
Both the minimum and maximum distances are between the second and the fifth node.
Thus, minDistance and maxDistance is 5 - 2 = 3.
Note that the last node is not considered a local maxima because it does not have a next node.
*/

/**
Constraints:

The number of nodes in the list is in the range [2, 105].
1 <= Node.val <= 105
*/

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function nodesBetweenCriticalPoints(head: ListNode | null): number[] {
  // If list has less than 3 nodes, no critical point is possible.
  if (!head || !head.next || !head.next.next) return [-1, -1];

  let firstIndex = -1;
  let prevCriticalIndex = -1;
  let minDistance = Infinity;

  let prev = head;
  let curr = head.next;
  let currentIndex = 1; // 0-based or 1-based, here using 1 for clarity.

  while (curr.next !== null) {
    const nextVal = curr.next.val;
    const currVal = curr.val;
    const prevVal = prev.val;

    // Check if the current node is a Local Maxima or Local Minima.
    if (
      (currVal > prevVal && currVal > nextVal) ||
      (currVal < prevVal && currVal < nextVal)
    ) {
      if (firstIndex === -1) {
        // Store the first critical point's index.
        firstIndex = currentIndex;
      } else {
        // Calculate distance from the previous critical point to find minimum.
        minDistance = Math.min(minDistance, currentIndex - prevCriticalIndex);
      }
      // Update the most recently found critical point index.
      prevCriticalIndex = currentIndex;
    }

    // Move pointers forward.
    prev = curr;
    curr = curr.next;
    currentIndex++;
  }

  // If no two critical points were found, return [-1, -1].
  if (minDistance === Infinity) return [-1, -1];

  // Maximum distance is the gap between the first and the very last critical point.
  const maxDistance = prevCriticalIndex - firstIndex;

  return [minDistance, maxDistance];
}

// Example usage:
const head = new ListNode(5, new ListNode(3, new ListNode(1, new ListNode(2, new ListNode(5, new ListNode(1, new ListNode(2)))))));
console.log(nodesBetweenCriticalPoints(head)); // Output: [1, 3]    

const head2 = new ListNode(1, new ListNode(3, new ListNode(2, new ListNode(2, new ListNode(3, new ListNode(2, new ListNode(2, new ListNode(2, new ListNode(7)))))))));
console.log(nodesBetweenCriticalPoints(head2)); // Output: [3, 3]

const head3 = new ListNode(3, new ListNode(1));
console.log(nodesBetweenCriticalPoints(head3)); // Output: [-1, -1]