// 1606. Find Servers That Handled Most Number of Requests

/**
You have k servers numbered from 0 to k-1 that are being used to handle multiple requests simultaneously. Each server has infinite computational capacity but cannot handle more than one request at a time. The requests are assigned to servers according to a specific algorithm:

The ith (0-indexed) request arrives.
If all servers are busy, the request is dropped (not handled at all).
If the (i % k)th server is available, assign the request to that server.
Otherwise, assign the request to the next available server (wrapping around the list of servers and starting from 0 if necessary). For example, if the ith server is busy, try to assign the request to the (i+1)th server, then the (i+2)th server, and so on.
You are given a strictly increasing array arrival of positive integers, where arrival[i] represents the arrival time of the ith request, and another array load, where load[i] represents the load of the ith request (the time it takes to complete). Your goal is to find the busiest server(s). A server is considered busiest if it handled the most number of requests successfully among all the servers.

Return a list containing the IDs (0-indexed) of the busiest server(s). You may return the IDs in any order.
*/

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

/**
Constraints:

1 <= k <= 105
1 <= arrival.length, load.length <= 105
arrival.length == load.length
1 <= arrival[i], load[i] <= 109
arrival is strictly increasing.
*/

// optimized solution using min-heap and segment tree
// const k = 3,
//   arrival = [1, 2, 3, 4, 5],
//   load = [5, 2, 3, 3, 3];
// class MinHeap {
//   private heap: { end: number; id: number }[];

//   constructor() {
//     this.heap = [];
//   }

//   push(val: { end: number; id: number }): void {
//     this.heap.push(val);
//     this.bubbleUp(this.heap.length - 1);
//   }

//   pop(): { end: number; id: number } | undefined {
//     if (this.heap.length === 0) return undefined;
//     const top = this.heap[0];
//     const bottom = this.heap.pop()!;
//     if (this.heap.length > 0) {
//       this.heap[0] = bottom;
//       this.bubbleDown(0);
//     }
//     return top;
//   }

//   peek(): { end: number; id: number } | undefined {
//     return this.heap[0];
//   }

//   isEmpty(): boolean {
//     return this.heap.length === 0;
//   }

//   private bubbleUp(index: number): void {
//     while (index > 0) {
//       const parentIndex = (index - 1) >>> 1; // Unsigned right shift for integer division
//       if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
//         [this.heap[index], this.heap[parentIndex]] = [
//           this.heap[parentIndex],
//           this.heap[index],
//         ];
//         index = parentIndex;
//       } else {
//         break;
//       }
//     }
//   }

//   private bubbleDown(index: number): void {
//     const length = this.heap.length;
//     while (true) {
//       const leftIndex = (index << 1) + 1;
//       const rightIndex = (index << 1) + 2;
//       let smallestIndex = index;

//       if (
//         leftIndex < length &&
//         this.compare(this.heap[leftIndex], this.heap[smallestIndex]) < 0
//       ) {
//         smallestIndex = leftIndex;
//       }
//       if (
//         rightIndex < length &&
//         this.compare(this.heap[rightIndex], this.heap[smallestIndex]) < 0
//       ) {
//         smallestIndex = rightIndex;
//       }

//       if (smallestIndex !== index) {
//         [this.heap[index], this.heap[smallestIndex]] = [
//           this.heap[smallestIndex],
//           this.heap[index],
//         ];
//         index = smallestIndex;
//       } else {
//         break;
//       }
//     }
//   }

//   private compare(
//     a: { end: number; id: number },
//     b: { end: number; id: number }
//   ): number {
//     if (a.end !== b.end) {
//       return a.end - b.end;
//     }
//     return a.id - b.id;
//   }
// }

// class SegmentTree {
//   private tree: Uint32Array; // Stores whether there is *any* free server in range (1 yes, 0 no)
//   private k: number;

//   constructor(k: number) {
//     this.k = k;
//     // Size needs to be approx 4*k. We use a power of 2 for simplicity or just 4*k.
//     this.tree = new Uint32Array(4 * k);
//     this.build(1, 0, k - 1);
//   }

//   private build(node: number, start: number, end: number): void {
//     if (start === end) {
//       this.tree[node] = 1; // Leaf: server is available initially
//     } else {
//       const mid = (start + end) >>> 1;
//       this.build(node << 1, start, mid);
//       this.build((node << 1) + 1, mid + 1, end);
//       this.tree[node] = this.tree[node << 1] | this.tree[(node << 1) + 1];
//     }
//   }

//   // Mark server at idx as val (1 = free, 0 = busy)
//   update(idx: number, val: number): void {
//     this.updateNode(1, 0, this.k - 1, idx, val);
//   }

//   private updateNode(
//     node: number,
//     start: number,
//     end: number,
//     idx: number,
//     val: number
//   ): void {
//     if (start === end) {
//       this.tree[node] = val;
//       return;
//     }
//     const mid = (start + end) >>> 1;
//     if (idx <= mid) {
//       this.updateNode(node << 1, start, mid, idx, val);
//     } else {
//       this.updateNode((node << 1) + 1, mid + 1, end, idx, val);
//     }
//     // Internal node is 1 if either child has availability
//     this.tree[node] = this.tree[node << 1] | this.tree[(node << 1) + 1];
//   }

//   // Find first available server index >= queryStart
//   queryFirst(queryStart: number): number {
//     if (queryStart >= this.k) return -1;
//     return this.queryNode(1, 0, this.k - 1, queryStart, this.k - 1);
//   }

//   private queryNode(
//     node: number,
//     start: number,
//     end: number,
//     L: number,
//     R: number
//   ): number {
//     // If range is outside query or no available servers in this subtree
//     if (L > end || R < start || this.tree[node] === 0) {
//       return -1;
//     }
//     if (start === end) {
//       return start;
//     }

//     const mid = (start + end) >>> 1;
//     let res = -1;

//     // Try left child if it overlaps with the query range
//     if (L <= mid) {
//       res = this.queryNode(node << 1, start, mid, L, R);
//     }

//     // If found in left, return it (since we want the first/smallest index)
//     if (res !== -1) return res;

//     // Otherwise try right
//     return this.queryNode((node << 1) + 1, mid + 1, end, L, R);
//   }
// }

// function busiestServers(
//   k: number,
//   arrival: number[],
//   load: number[]
// ): number[] {
//   const counts = new Uint32Array(k);
//   const busyServers = new MinHeap();
//   const availableServers = new SegmentTree(k);

//   for (let i = 0; i < arrival.length; i++) {
//     const arrivalTime = arrival[i];
//     const duration = load[i];

//     // 1. Free up servers that have completed their tasks
//     while (!busyServers.isEmpty() && busyServers.peek()!.end <= arrivalTime) {
//       const freedServer = busyServers.pop()!;
//       availableServers.update(freedServer.id, 1);
//     }

//     // 2. Find the target server
//     const targetIndex = i % k;

//     // Check availability starting from targetIndex to end
//     let assignedServerId = availableServers.queryFirst(targetIndex);

//     // If not found, wrap around and check from 0 to targetIndex - 1
//     if (assignedServerId === -1) {
//       assignedServerId = availableServers.queryFirst(0);
//     }

//     // 3. Assign request if a server was found
//     if (assignedServerId !== -1) {
//       counts[assignedServerId]++;
//       availableServers.update(assignedServerId, 0); // Mark busy
//       busyServers.push({ end: arrivalTime + duration, id: assignedServerId });
//     }
//     // If assignedServerId is still -1, the request is dropped
//   }

//   // 4. Find max requests handled
//   let maxRequests = 0;
//   for (let i = 0; i < k; i++) {
//     if (counts[i] > maxRequests) {
//       maxRequests = counts[i];
//     }
//   }

//   // 5. Collect all servers with max requests
//   const result: number[] = [];
//   for (let i = 0; i < k; i++) {
//     if (counts[i] === maxRequests) {
//       result.push(i);
//     }
//   }

//   return result;
// }

// Optimized solution using Min-Heap and Segment Tree
// Min-Heap implementation to store busy servers ordered by end time.
class BusyServerHeap {
  private heap: [number, number][]; // [endTime, serverId]

  constructor() {
    this.heap = [];
  }

  public size(): number {
    return this.heap.length;
  }

  public peek(): [number, number] | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // Insert a busy server into the heap.
  public push(val: [number, number]): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  // Remove and return the server that finishes earliest.
  public pop(): [number, number] | null {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(idx: number): void {
    while (idx > 0) {
      const parentIdx = (idx - 1) >> 1;
      // Compare based on endTime.
      if (this.heap[idx][0] < this.heap[parentIdx][0]) {
        [this.heap[idx], this.heap[parentIdx]] = [
          this.heap[parentIdx],
          this.heap[idx],
        ];
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  private bubbleDown(idx: number): void {
    const length = this.heap.length;
    while (true) {
      let smallest = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (left < length && this.heap[left][0] < this.heap[smallest][0]) {
        smallest = left;
      }
      if (right < length && this.heap[right][0] < this.heap[smallest][0]) {
        smallest = right;
      }

      if (smallest !== idx) {
        [this.heap[idx], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[idx],
        ];
        idx = smallest;
      } else {
        break;
      }
    }
  }
}

// Segment Tree to maintain available servers and query the first available server in a range.
class AvailableServersTree {
  private tree: Int32Array;
  private n: number;

  constructor(n: number) {
    this.n = n;
    this.tree = new Int32Array(4 * n);
    this.build(1, 0, n - 1);
  }

  // Build the tree where initially all servers are available (value = 1).
  private build(node: number, l: number, r: number): void {
    if (l === r) {
      this.tree[node] = 1;
      return;
    }
    const mid = (l + r) >> 1;
    this.build(node * 2, l, mid);
    this.build(node * 2 + 1, mid + 1, r);
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }

  // Update the availability of a server (1 = free, 0 = busy).
  public update(idx: number, val: number): void {
    this.updateNode(1, 0, this.n - 1, idx, val);
  }

  private updateNode(
    node: number,
    l: number,
    r: number,
    idx: number,
    val: number,
  ): void {
    if (l === r) {
      this.tree[node] = val;
      return;
    }
    const mid = (l + r) >> 1;
    if (idx <= mid) {
      this.updateNode(node * 2, l, mid, idx, val);
    } else {
      this.updateNode(node * 2 + 1, mid + 1, r, idx, val);
    }
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }

  // Query the first available server in range [ql, qr].
  public queryFirst(ql: number, qr: number): number {
    if (ql > qr) return -1;
    return this.queryFirstNode(1, 0, this.n - 1, ql, qr);
  }

  private queryFirstNode(
    node: number,
    l: number,
    r: number,
    ql: number,
    qr: number,
  ): number {
    // If range does not overlap or no available servers exist in this subtree.
    if (l > qr || r < ql || this.tree[node] === 0) {
      return -1;
    }
    if (l === r) {
      return l;
    }
    const mid = (l + r) >> 1;

    // Try the left child first to get the smallest index.
    const leftResult = this.queryFirstNode(node * 2, l, mid, ql, qr);
    if (leftResult !== -1) {
      return leftResult;
    }

    // If not found in left, search in the right child.
    return this.queryFirstNode(node * 2 + 1, mid + 1, r, ql, qr);
  }
}

function busiestServers(
  k: number,
  arrival: number[],
  load: number[],
): number[] {
  const n = arrival.length;
  const requestCount = new Array<number>(k).fill(0);
  const busyHeap = new BusyServerHeap();
  const availableTree = new AvailableServersTree(k);

  for (let i = 0; i < n; i++) {
    const curArrival = arrival[i];
    const curLoad = load[i];

    // Free up all servers that have finished their work by curArrival.
    while (busyHeap.size() > 0 && busyHeap.peek()![0] <= curArrival) {
      const finished = busyHeap.pop()!;
      const serverId = finished[1];
      // Mark server as available in the Segment Tree.
      availableTree.update(serverId, 1);
    }

    const preferredServer = i % k;

    // First, try to find an available server in [preferredServer, k - 1].
    let assignedServer = availableTree.queryFirst(preferredServer, k - 1);

    // If not found, wrap around and search in [0, preferredServer - 1].
    if (assignedServer === -1) {
      assignedServer = availableTree.queryFirst(0, preferredServer - 1);
    }

    // If an available server is found, assign the request.
    if (assignedServer !== -1) {
      // Mark server as busy in the Segment Tree.
      availableTree.update(assignedServer, 0);

      // Push server to heap with its completion time.
      busyHeap.push([curArrival + curLoad, assignedServer]);

      // Increment request count for this server.
      requestCount[assignedServer]++;
    }
    // If assignedServer === -1, all servers are busy, so request is dropped.
  }

  // Find the maximum requests handled by any server.
  let maxRequests = 0;
  for (let count of requestCount) {
    if (count > maxRequests) {
      maxRequests = count;
    }
  }

  // Collect all servers achieving this maximum count.
  const result: number[] = [];
  for (let i = 0; i < k; i++) {
    if (requestCount[i] === maxRequests) {
      result.push(i);
    }
  }

  return result;
}
// Example usage:
const k = 3,
  arrival = [1, 2, 3, 4, 5],
  load = [5, 2, 3, 3, 3];
console.log(busiestServers(k, arrival, load)); // Output: [1]

const k2 = 3,
  arrival2 = [1, 2, 3, 4],
  load2 = [1, 2, 1, 2];
console.log(busiestServers(k2, arrival2, load2)); // Output: [0]

const k3 = 3,
  arrival3 = [1, 2, 3],
  load3 = [10, 12, 11];
console.log(busiestServers(k3, arrival3, load3)); // Output: [0, 1, 2]
