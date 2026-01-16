// 1606. Find Servers That Handled Most Number of Requests

/**
Example 1:


Input: k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3] 
Output: [1] 
Explanation: 
All of the servers start out available.
The first 3 requests are handled by the first 3 servers in order.
Request 3 comes in. Server 0 is busy, so it's assigned to the next available server, which is 1.
Request 4 comes in. It cannot be handled since all servers are busy, so it is dropped.
Servers 0 and 2 handled one request each, while server 1 handled two requests. Hence server 1 is the busiest server.
Example 2:

Input: k = 3, arrival = [1,2,3,4], load = [1,2,1,2]
Output: [0]
Explanation: 
The first 3 requests are handled by first 3 servers.
Request 3 comes in. It is handled by server 0 since the server is available.
Server 0 handled two requests, while servers 1 and 2 handled one request each. Hence server 0 is the busiest server.
Example 3:

Input: k = 3, arrival = [1,2,3], load = [10,12,11]
Output: [0,1,2]
Explanation: Each server handles a single request, so they are all considered the busiest.
 
*/

const k = 3,
  arrival = [1, 2, 3, 4, 5],
  load = [5, 2, 3, 3, 3];
class MinHeap {
  private heap: { end: number; id: number }[];

  constructor() {
    this.heap = [];
  }

  push(val: { end: number; id: number }): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): { end: number; id: number } | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const bottom = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this.bubbleDown(0);
    }
    return top;
  }

  peek(): { end: number; id: number } | undefined {
    return this.heap[0];
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = (index - 1) >>> 1; // Unsigned right shift for integer division
      if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      const leftIndex = (index << 1) + 1;
      const rightIndex = (index << 1) + 2;
      let smallestIndex = index;

      if (
        leftIndex < length &&
        this.compare(this.heap[leftIndex], this.heap[smallestIndex]) < 0
      ) {
        smallestIndex = leftIndex;
      }
      if (
        rightIndex < length &&
        this.compare(this.heap[rightIndex], this.heap[smallestIndex]) < 0
      ) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex !== index) {
        [this.heap[index], this.heap[smallestIndex]] = [
          this.heap[smallestIndex],
          this.heap[index],
        ];
        index = smallestIndex;
      } else {
        break;
      }
    }
  }

  private compare(
    a: { end: number; id: number },
    b: { end: number; id: number }
  ): number {
    if (a.end !== b.end) {
      return a.end - b.end;
    }
    return a.id - b.id;
  }
}

class SegmentTree {
  private tree: Uint32Array; // Stores whether there is *any* free server in range (1 yes, 0 no)
  private k: number;

  constructor(k: number) {
    this.k = k;
    // Size needs to be approx 4*k. We use a power of 2 for simplicity or just 4*k.
    this.tree = new Uint32Array(4 * k);
    this.build(1, 0, k - 1);
  }

  private build(node: number, start: number, end: number): void {
    if (start === end) {
      this.tree[node] = 1; // Leaf: server is available initially
    } else {
      const mid = (start + end) >>> 1;
      this.build(node << 1, start, mid);
      this.build((node << 1) + 1, mid + 1, end);
      this.tree[node] = this.tree[node << 1] | this.tree[(node << 1) + 1];
    }
  }

  // Mark server at idx as val (1 = free, 0 = busy)
  update(idx: number, val: number): void {
    this.updateNode(1, 0, this.k - 1, idx, val);
  }

  private updateNode(
    node: number,
    start: number,
    end: number,
    idx: number,
    val: number
  ): void {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = (start + end) >>> 1;
    if (idx <= mid) {
      this.updateNode(node << 1, start, mid, idx, val);
    } else {
      this.updateNode((node << 1) + 1, mid + 1, end, idx, val);
    }
    // Internal node is 1 if either child has availability
    this.tree[node] = this.tree[node << 1] | this.tree[(node << 1) + 1];
  }

  // Find first available server index >= queryStart
  queryFirst(queryStart: number): number {
    if (queryStart >= this.k) return -1;
    return this.queryNode(1, 0, this.k - 1, queryStart, this.k - 1);
  }

  private queryNode(
    node: number,
    start: number,
    end: number,
    L: number,
    R: number
  ): number {
    // If range is outside query or no available servers in this subtree
    if (L > end || R < start || this.tree[node] === 0) {
      return -1;
    }
    if (start === end) {
      return start;
    }

    const mid = (start + end) >>> 1;
    let res = -1;

    // Try left child if it overlaps with the query range
    if (L <= mid) {
      res = this.queryNode(node << 1, start, mid, L, R);
    }

    // If found in left, return it (since we want the first/smallest index)
    if (res !== -1) return res;

    // Otherwise try right
    return this.queryNode((node << 1) + 1, mid + 1, end, L, R);
  }
}

function busiestServers(
  k: number,
  arrival: number[],
  load: number[]
): number[] {
  const counts = new Uint32Array(k);
  const busyServers = new MinHeap();
  const availableServers = new SegmentTree(k);

  for (let i = 0; i < arrival.length; i++) {
    const arrivalTime = arrival[i];
    const duration = load[i];

    // 1. Free up servers that have completed their tasks
    while (!busyServers.isEmpty() && busyServers.peek()!.end <= arrivalTime) {
      const freedServer = busyServers.pop()!;
      availableServers.update(freedServer.id, 1);
    }

    // 2. Find the target server
    const targetIndex = i % k;

    // Check availability starting from targetIndex to end
    let assignedServerId = availableServers.queryFirst(targetIndex);

    // If not found, wrap around and check from 0 to targetIndex - 1
    if (assignedServerId === -1) {
      assignedServerId = availableServers.queryFirst(0);
    }

    // 3. Assign request if a server was found
    if (assignedServerId !== -1) {
      counts[assignedServerId]++;
      availableServers.update(assignedServerId, 0); // Mark busy
      busyServers.push({ end: arrivalTime + duration, id: assignedServerId });
    }
    // If assignedServerId is still -1, the request is dropped
  }

  // 4. Find max requests handled
  let maxRequests = 0;
  for (let i = 0; i < k; i++) {
    if (counts[i] > maxRequests) {
      maxRequests = counts[i];
    }
  }

  // 5. Collect all servers with max requests
  const result: number[] = [];
  for (let i = 0; i < k; i++) {
    if (counts[i] === maxRequests) {
      result.push(i);
    }
  }

  return result;
}
console.log(busiestServers(k, arrival, load));
