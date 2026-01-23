// 3510. Minimum Pair Removal to Sort Array II

/**
Example 1:

Input: nums = [5,2,3,1]

Output: 2

Explanation:

The pair (3,1) has the minimum sum of 4. After replacement, nums = [5,2,4].
The pair (2,4) has the minimum sum of 6. After replacement, nums = [5,6].
The array nums became non-decreasing in two operations.

Example 2:

Input: nums = [1,2,2]

Output: 0

Explanation:

The array nums is already sorted.
*/

const nums = [5, 2, 3, 1];

const minOperations = function (nums: number[]): number {
  const n = nums.length;
  if (n < 2) return 0;

  // Doubly Linked List Node Class
  class Node {
    id: number;
    val: number;
    prev: Node | null = null;
    next: Node | null = null;
    removed: boolean = false;

    constructor(id: number, val: number) {
      this.id = id;
      this.val = val;
    }
  }

  // Initialize DLL
  const nodes: Node[] = new Array(n);
  for (let i = 0; i < n; i++) {
    nodes[i] = new Node(i, nums[i]);
    if (i > 0) {
      nodes[i].prev = nodes[i - 1];
      nodes[i - 1].next = nodes[i];
    }
  }

  // Count initial inversions (bad pairs)
  let badCount = 0;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      badCount++;
    }
  }

  if (badCount === 0) return 0;

  type HeapNode = { sum: number; id: number };

  // Min Heap Implementation
  const heap: HeapNode[] = [];

  // Comparator: Min sum, then Min ID (leftmost)
  const compare = (a: HeapNode, b: HeapNode) => {
    if (a.sum !== b.sum) return a.sum < b.sum ? -1 : 1;
    return a.id - b.id;
  };

  const push = (item: HeapNode) => {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >>> 1;
      if (compare(heap[i], heap[p]) < 0) {
        [heap[i], heap[p]] = [heap[p], heap[i]];
        i = p;
      } else {
        break;
      }
    }
  };

  const pop = (): HeapNode | undefined => {
    if (heap.length === 0) return undefined;
    const top = heap[0];
    const bottom = heap.pop();
    if (heap.length > 0 && bottom) {
      heap[0] = bottom;
      let i = 0;
      const len = heap.length;
      while (true) {
        const left = (i << 1) + 1;
        const right = (i << 1) + 2;
        let smallest = i;
        if (left < len && compare(heap[left], heap[smallest]) < 0) {
          smallest = left;
        }
        if (right < len && compare(heap[right], heap[smallest]) < 0) {
          smallest = right;
        }
        if (smallest !== i) {
          [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
          i = smallest;
        } else {
          break;
        }
      }
    }
    return top;
  };

  // Initialize Heap with all adjacent pairs
  for (let i = 0; i < n - 1; i++) {
    push({ sum: nums[i] + nums[i + 1], id: i });
  }

  let ops = 0;

  while (badCount > 0) {
    const item = pop();
    if (!item) break; // Should not happen

    const u = nodes[item.id];

    // Validation: Check if node is removed or if sum is stale
    if (u.removed || !u.next || u.val + u.next.val !== item.sum) {
      continue;
    }

    const v = u.next;

    // Remove contributions of affected edges to badCount
    // Edge: prev(u) -> u
    if (u.prev && u.prev.val > u.val) badCount--;
    // Edge: u -> v
    if (u.val > v.val) badCount--;
    // Edge: v -> next(v)
    if (v.next && v.val > v.next.val) badCount--;

    // Perform Merge: u absorbs v
    u.val = u.val + v.val;
    u.next = v.next;
    if (u.next) {
      u.next.prev = u;
    }
    v.removed = true;

    // Add contributions of new/modified edges to badCount
    // Edge: prev(u) -> u (new val)
    if (u.prev && u.prev.val > u.val) badCount++;
    // Edge: u -> next(u) (new neighbor)
    if (u.next && u.val > u.next.val) badCount++;

    // Push new adjacent sums to heap
    if (u.prev) {
      push({ sum: u.prev.val + u.val, id: u.prev.id });
    }
    if (u.next) {
      push({ sum: u.val + u.next.val, id: u.id });
    }

    ops++;
  }

  return ops;
};

console.log(minOperations(nums));
