// 2050. Parallel Courses III

/**
Example 1:


Input: n = 3, relations = [[1,3],[2,3]], time = [3,2,5]
Output: 8
Explanation: The figure above represents the given graph and the time required to complete each course. 
We start course 1 and course 2 simultaneously at month 0.
Course 1 takes 3 months and course 2 takes 2 months to complete respectively.
Thus, the earliest time we can start course 3 is at month 3, and the total time required is 3 + 5 = 8 months.
Example 2:


Input: n = 5, relations = [[1,5],[2,5],[3,5],[3,4],[4,5]], time = [1,2,3,4,5]
Output: 12
Explanation: The figure above represents the given graph and the time required to complete each course.
You can start courses 1, 2, and 3 at month 0.
You can complete them after 1, 2, and 3 months respectively.
Course 4 can be taken only after course 3 is completed, i.e., after 3 months. It is completed after 3 + 4 = 7 months.
Course 5 can be taken only after courses 1, 2, 3, and 4 have been completed, i.e., after max(1,2,3,7) = 7 months.
Thus, the minimum time needed to complete all the courses is 7 + 5 = 12 months.

*/

const n = 3,
  relations = [
    [1, 3],
    [2, 3],
  ],
  time = [3, 2, 5];
const minimumTime = function (
  n: number,
  relations: number[][],
  time: number[],
): number {
  // Adjacency list to represent the directed graph
  const graph: number[][] = Array.from({ length: n }, () => []);
  const inDegree: number[] = new Array(n).fill(0);

  // dist[i] stores the max time to complete course i
  const dist: number[] = [...time];

  // Build the graph
  for (const [prev, next] of relations) {
    const u = prev - 1; // Convert 1-based index to 0-based
    const v = next - 1;
    graph[u].push(v);
    inDegree[v]++;
  }

  // Queue for BFS (Topological Sort)
  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  // Process the graph
  let head = 0; // Using an index pointer instead of .shift() for O(1) dequeue time
  while (head < queue.length) {
    const u = queue[head++];

    for (const v of graph[u]) {
      // The time to complete course v is its own time plus the max time to complete its prerequisites
      dist[v] = Math.max(dist[v], dist[u] + time[v]);

      inDegree[v]--;
      // Once all prerequisites of course v are finished, it can be added to the queue
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  // Find the maximum time among all courses
  let maxTime = 0;
  for (let i = 0; i < n; i++) {
    if (dist[i] > maxTime) {
      maxTime = dist[i];
    }
  }

  return maxTime;
};

console.log(minimumTime(n, relations, time)); // Output: 8
