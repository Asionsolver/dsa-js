// 1882. Process Tasks Using Servers

/**

You are given two 0-indexed integer arrays servers and tasks of lengths n​​​​​​ and m​​​​​​ respectively. servers[i] is the weight of the i​​​​​​th​​​​ server, and tasks[j] is the time needed to process the j​​​​​​th​​​​ task in seconds.

Tasks are assigned to the servers using a task queue. Initially, all servers are free, and the queue is empty.

At second j, the jth task is inserted into the queue (starting with the 0th task being inserted at second 0). As long as there are free servers and the queue is not empty, the task in the front of the queue will be assigned to a free server with the smallest weight, and in case of a tie, it is assigned to a free server with the smallest index.

If there are no free servers and the queue is not empty, we wait until a server becomes free and immediately assign the next task. If multiple servers become free at the same time, then multiple tasks from the queue will be assigned in order of insertion following the weight and index priorities above.

A server that is assigned task j at second t will be free again at second t + tasks[j].

Build an array ans​​​​ of length m, where ans[j] is the index of the server the j​​​​​​th task will be assigned to.

Return the array ans​​​​.


*/

/**
Example 1:

Input: servers = [3,3,2], tasks = [1,2,3,2,1,2]
Output: [2,2,0,2,1,2]
Explanation: Events in chronological order go as follows:
- At second 0, task 0 is added and processed using server 2 until second 1.
- At second 1, server 2 becomes free. Task 1 is added and processed using server 2 until second 3.
- At second 2, task 2 is added and processed using server 0 until second 5.
- At second 3, server 2 becomes free. Task 3 is added and processed using server 2 until second 5.
- At second 4, task 4 is added and processed using server 1 until second 5.
- At second 5, all servers become free. Task 5 is added and processed using server 2 until second 7.
Example 2:

Input: servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]
Output: [1,4,1,4,1,3,2]
Explanation: Events in chronological order go as follows: 
- At second 0, task 0 is added and processed using server 1 until second 2.
- At second 1, task 1 is added and processed using server 4 until second 2.
- At second 2, servers 1 and 4 become free. Task 2 is added and processed using server 1 until second 4. 
- At second 3, task 3 is added and processed using server 4 until second 7.
- At second 4, server 1 becomes free. Task 4 is added and processed using server 1 until second 9. 
- At second 5, task 5 is added and processed using server 3 until second 7.
- At second 6, task 6 is added and processed using server 2 until second 7.

*/

/**
Constraints:

servers.length == n
tasks.length == m
1 <= n, m <= 2 * 105
1 <= servers[i], tasks[j] <= 2 * 105
*/

// Brute Force Approach: TLE
// function assignTasks(servers: number[], tasks: number[]): number[] {
//   const n = servers.length;
//   const m = tasks.length;
//   const ans: number[] = new Array(m);

//   // availableAt[i] stores the time when server i becomes free.
//   const availableAt: number[] = new Array(n).fill(0);

//   let currentTime = 0;

//   for (let j = 0; j < m; j++) {
//     // Current time must be at least the arrival time of task j.
//     currentTime = Math.max(currentTime, j);

//     let chosenServer = -1;

//     // Scan all servers to find the best available server.
//     for (let i = 0; i < n; i++) {
//       if (availableAt[i] <= currentTime) {
//         if (
//           chosenServer === -1 ||
//           servers[i] < servers[chosenServer] ||
//           (servers[i] === servers[chosenServer] && i < chosenServer)
//         ) {
//           chosenServer = i;
//         }
//       }
//     }

//     // If no server is free, fast-forward to the earliest available server.
//     if (chosenServer === -1) {
//       let earliestTime = Infinity;
//       for (let i = 0; i < n; i++) {
//         if (availableAt[i] < earliestTime) {
//           earliestTime = availableAt[i];
//         }
//       }

//       currentTime = earliestTime;

//       // Re-scan to pick the best server at this new time.
//       for (let i = 0; i < n; i++) {
//         if (availableAt[i] <= currentTime) {
//           if (
//             chosenServer === -1 ||
//             servers[i] < servers[chosenServer] ||
//             (servers[i] === servers[chosenServer] && i < chosenServer)
//           ) {
//             chosenServer = i;
//           }
//         }
//       }
//     }

//     // Assign task and mark the server's next available time.
//     ans[j] = chosenServer;
//     availableAt[chosenServer] = currentTime + tasks[j];
//   }

//   return ans;
// }

// Optimized Approach using MinHeap

// Generic MinHeap implementation for priority queue operations.
class MinHeaps<T> {
  private data: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {}

  size(): number {
    return this.data.length;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  push(val: T): void {
    // Add value at the end and bubble it up.
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined;
    const top = this.data[0];
    const bottom = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.data[index], this.data[parentIndex]) < 0) {
        [this.data[index], this.data[parentIndex]] = [
          this.data[parentIndex],
          this.data[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown(index: number): void {
    const length = this.data.length;
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < length &&
        this.compare(this.data[leftChild], this.data[smallest]) < 0
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < length &&
        this.compare(this.data[rightChild], this.data[smallest]) < 0
      ) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        [this.data[index], this.data[smallest]] = [
          this.data[smallest],
          this.data[index],
        ];
        index = smallest;
      } else {
        break;
      }
    }
  }
}

function assignTasks(servers: number[], tasks: number[]): number[] {
  const n = servers.length;
  const m = tasks.length;
  const ans: number[] = new Array(m);

  // Free servers heap ordered by: weight ascending, then index ascending.
  const freeServers = new MinHeaps<[number, number]>((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  // Busy servers heap ordered by: freeTime ascending.
  const busyServers = new MinHeaps<[number, number, number]>((a, b) => {
    return a[0] - b[0];
  });

  // Initially, all servers are free.
  for (let i = 0; i < n; i++) {
    freeServers.push([servers[i], i]);
  }

  let currentTime = 0;

  for (let j = 0; j < m; j++) {
    // Current time moves to at least task arrival time j.
    currentTime = Math.max(currentTime, j);

    // Release all servers that have finished their tasks by currentTime.
    while (!busyServers.isEmpty() && busyServers.peek()![0] <= currentTime) {
      const [_, weight, index] = busyServers.pop()!;
      freeServers.push([weight, index]);
    }

    // If no server is free, fast-forward time to when the earliest server becomes free.
    if (freeServers.isEmpty()) {
      currentTime = busyServers.peek()![0];
      while (!busyServers.isEmpty() && busyServers.peek()![0] <= currentTime) {
        const [_, weight, index] = busyServers.pop()!;
        freeServers.push([weight, index]);
      }
    }

    // Pick the best available free server.
    const [weight, index] = freeServers.pop()!;
    ans[j] = index;

    // Push the assigned server into the busy heap.
    busyServers.push([currentTime + tasks[j], weight, index]);
  }

  return ans;
}
// Example usage:
const servers = [3, 3, 2];
const tasks = [1, 2, 3, 2, 1, 2];
console.log(assignTasks(servers, tasks)); // Output: [2, 2, 0, 2, 1, 2]

const servers2 = [5, 1, 4, 3, 2];
const tasks2 = [2, 1, 2, 4, 5, 2, 1];
console.log(assignTasks(servers2, tasks2)); // Output: [1, 4, 1, 4, 1, 3, 2]
