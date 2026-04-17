// 210. Course Schedule II

/**
Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
Example 2:

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
Example 3:

Input: numCourses = 1, prerequisites = []
Output: [0]
*/

const findOrder = function (
  numCourses: number,
  prerequisites: number[][],
): number[] {
  // adjList[i] contains all the courses that depend on course i
  const adjList: number[][] = Array.from({ length: numCourses }, () => []);
  // inDegrees[i] represents the number of prerequisites course i still needs
  const inDegrees: number[] = new Array(numCourses).fill(0);

  // Build the graph and populate inDegrees
  for (const [course, pre] of prerequisites) {
    adjList[pre].push(course);
    inDegrees[course]++;
  }

  // Queue to hold all courses that have no remaining prerequisites
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegrees[i] === 0) {
      queue.push(i);
    }
  }

  const order: number[] = [];
  let head = 0; // Using a pointer to simulate dequeue for O(1) time complexity

  // Process the courses
  while (head < queue.length) {
    const currentCourse = queue[head++];
    order.push(currentCourse);

    // Reduce the in-degree of neighboring courses
    for (const nextCourse of adjList[currentCourse]) {
      inDegrees[nextCourse]--;
      // If the neighboring course has no more prerequisites, add it to queue
      if (inDegrees[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // If order contains all courses, we succeeded. Otherwise, there was a cycle.
  return order.length === numCourses ? order : [];
};

// example test case
console.log(findOrder(2, [[1, 0]])); // Output: [0, 1]
console.log(
  findOrder(4, [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
  ]),
); // Output: [0, 1, 2, 3] or [0, 2, 1, 3]
console.log(findOrder(1, [])); // Output: [0]
