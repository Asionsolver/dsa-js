// 2092. Find All People With Secret

/**
Example 1:

Input: n = 6, meetings = [[1,2,5],[2,3,8],[1,5,10]], firstPerson = 1
Output: [0,1,2,3,5]
Explanation:
At time 0, person 0 shares the secret with person 1.
At time 5, person 1 shares the secret with person 2.
At time 8, person 2 shares the secret with person 3.
At time 10, person 1 shares the secret with person 5.​​​​
Thus, people 0, 1, 2, 3, and 5 know the secret after all the meetings.
Example 2:

Input: n = 4, meetings = [[3,1,3],[1,2,2],[0,3,3]], firstPerson = 3
Output: [0,1,3]
Explanation:
At time 0, person 0 shares the secret with person 3.
At time 2, neither person 1 nor person 2 know the secret.
At time 3, person 3 shares the secret with person 0 and person 1.
Thus, people 0, 1, and 3 know the secret after all the meetings.
Example 3:

Input: n = 5, meetings = [[3,4,2],[1,2,1],[2,3,1]], firstPerson = 1
Output: [0,1,2,3,4]
Explanation:
At time 0, person 0 shares the secret with person 1.
At time 1, person 1 shares the secret with person 2, and person 2 shares the secret with person 3.
Note that person 2 can share the secret at the same time as receiving it.
At time 2, person 3 shares the secret with person 4.
Thus, people 0, 1, 2, 3, and 4 know the secret after all the meetings.

*/
const n = 6,
  meetings = [
    [1, 2, 5],
    [2, 3, 8],
    [1, 5, 10],
  ],
  firstPerson = 1;

const findAllPeople = function (
  n: number,
  meetings: number[][],
  firstPerson: number
) {
  const knowsSecret = new Uint8Array(n);
  knowsSecret[0] = 1;
  knowsSecret[firstPerson] = 1;

  // Sort meetings by time
  meetings.sort((a, b) => a[2] - b[2]);

  let i = 0;
  const m = meetings.length;

  while (i < m) {
    const currentTime = meetings[i][2];
    const currentMeetings: number[][] = [];

    // Group all meetings happening at the same time
    while (i < m && meetings[i][2] === currentTime) {
      currentMeetings.push(meetings[i]);
      i++;
    }

    // Build a local graph for this specific timestamp
    const adj = new Map<number, number[]>();
    const peopleAtTime = new Set<number>();

    for (const [u, v] of currentMeetings) {
      if (!adj.has(u)) adj.set(u, []);
      if (!adj.has(v)) adj.set(v, []);
      adj.get(u)!.push(v);
      adj.get(v)!.push(u);
      peopleAtTime.add(u);
      peopleAtTime.add(v);
    }

    // BFS starting from people who already know the secret
    const queue: number[] = [];
    for (const person of peopleAtTime) {
      if (knowsSecret[person]) {
        queue.push(person);
      }
    }

    let head = 0;
    while (head < queue.length) {
      const curr = queue[head++];
      const neighbors = adj.get(curr);
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!knowsSecret[neighbor]) {
            knowsSecret[neighbor] = 1;
            queue.push(neighbor);
          }
        }
      }
    }
  }

  // Collect all people who know the secret
  const result: number[] = [];
  for (let j = 0; j < n; j++) {
    if (knowsSecret[j]) {
      result.push(j);
    }
  }

  return result;
};

console.log(findAllPeople(n, meetings, firstPerson));
