// 2127. Maximum Employees to Be Invited to a Meeting

/**

Example 1:


Input: favorite = [2,2,1,2]
Output: 3
Explanation:
The above figure shows how the company can invite employees 0, 1, and 2, and seat them at the round table.
All employees cannot be invited because employee 2 cannot sit beside employees 0, 1, and 3, simultaneously.
Note that the company can also invite employees 1, 2, and 3, and give them their desired seats.
The maximum number of employees that can be invited to the meeting is 3. 
Example 2:

Input: favorite = [1,2,0]
Output: 3
Explanation: 
Each employee is the favorite person of at least one other employee, and the only way the company can invite them is if they invite every employee.
The seating arrangement will be the same as that in the figure given in example 1:
- Employee 0 will sit between employees 2 and 1.
- Employee 1 will sit between employees 0 and 2.
- Employee 2 will sit between employees 1 and 0.
The maximum number of employees that can be invited to the meeting is 3.
Example 3:


Input: favorite = [3,0,1,4,1]
Output: 4
Explanation:
The above figure shows how the company will invite employees 0, 1, 3, and 4, and seat them at the round table.
Employee 2 cannot be invited because the two spots next to their favorite employee 1 are taken.
So the company leaves them out of the meeting.
The maximum number of employees that can be invited to the meeting is 4.
*/

const favorite = [2, 2, 1, 2];
const maximumInvitations = function (favorite: number[]): number {
  const n = favorite.length;
  const inDegree = new Int32Array(n);

  // Step 1: Calculate in-degrees
  for (let i = 0; i < n; i++) {
    inDegree[favorite[i]]++;
  }

  const queue = new Int32Array(n);
  let head = 0,
    tail = 0;

  const depth = new Int32Array(n).fill(1);

  // Enqueue all nodes with 0 in-degree (leaves of the chains)
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue[tail++] = i;
    }
  }

  // Step 2: Topological sort to calculate the max depth (longest chain) ending at each cycle node
  while (head < tail) {
    const u = queue[head++];
    const v = favorite[u];

    depth[v] = Math.max(depth[v], depth[u] + 1);

    if (--inDegree[v] === 0) {
      queue[tail++] = v;
    }
  }

  let maxCycle = 0;
  let sum2Cycles = 0;

  // Step 3: Traverse the cycles
  for (let i = 0; i < n; i++) {
    // Nodes part of a cycle will have inDegree > 0
    if (inDegree[i] > 0) {
      let length = 0;
      let curr = i;

      // Measure cycle length and mark nodes as visited
      while (inDegree[curr] > 0) {
        inDegree[curr] = 0; // Mark visited by breaking its inDegree
        curr = favorite[curr];
        length++;
      }

      if (length === 2) {
        // For 2-cycles, we can gather the max chain spanning from both endpoints
        // and we can accumulate multiple 2-cycle components together
        sum2Cycles += depth[i] + depth[favorite[i]];
      } else if (length > 2) {
        // For >2-cycles, we can only form an isolated loop
        // So we can only take the largest such cycle available
        maxCycle = Math.max(maxCycle, length);
      }
    }
  }

  // Step 4: Return the theoretical maximum of the two exclusive arrangements
  return Math.max(maxCycle, sum2Cycles);
};

console.log(maximumInvitations(favorite));
