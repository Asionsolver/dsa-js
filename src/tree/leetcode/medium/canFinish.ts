// 207. Course Schedule

/**
Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

*/

const numCourses = 2;
const prerequisites = [[1, 0]];

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // Array to keep track of how many prerequisites each course has
  const inDegree = new Array(numCourses).fill(0);
  // Adjacency list to represent the graph: prereq -> list of dependent courses
  const adj: number[][] = Array.from({ length: numCourses }, () => []);

  // Build the graph and calculate in-degrees
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  // Queue to hold all courses with 0 prerequisites
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let completedCourses = 0;
  let head = 0; // We use a pointer instead of queue.shift() to keep queue operations O(1)

  // Process the courses
  while (head < queue.length) {
    const curr = queue[head++];
    completedCourses++;

    // For every course that depends on the current course, reduce its in-degree
    for (const nextCourse of adj[curr]) {
      inDegree[nextCourse]--;
      // If it has no more prerequisites, we can now take it
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // If we were able to complete all courses, there was no cycle
  return completedCourses === numCourses;
}

console.log(canFinish(numCourses, prerequisites));
