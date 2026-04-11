// 649. Dota2 Senate

/**
Example 1:

Input: senate = "RD"
Output: "Radiant"
Explanation: 
The first senator comes from Radiant and he can just ban the next senator's right in round 1. 
And the second senator can't exercise any rights anymore since his right has been banned. 
And in round 2, the first senator can just announce the victory since he is the only guy in the senate who can vote.
Example 2:

Input: senate = "RDD"
Output: "Dire"
Explanation: 
The first senator comes from Radiant and he can just ban the next senator's right in round 1. 
And the second senator can't exercise any rights anymore since his right has been banned. 
And the third senator comes from Dire and he can ban the first senator's right in round 1. 
And in round 2, the third senator can just announce the victory since he is the only guy in the senate who can vote.
*/

const senate = "RDD";

const predictPartyVictory = function (senate: string): string {
  const rQueue: number[] = [];
  const dQueue: number[] = [];
  const n = senate.length;

  // Populate the initial queues with indices of the senators
  for (let i = 0; i < n; i++) {
    if (senate[i] === "R") {
      rQueue.push(i);
    } else {
      dQueue.push(i);
    }
  }

  let rPointer = 0;
  let dPointer = 0;

  // Process rounds until one party's queue runs out of valid voting members
  while (rPointer < rQueue.length && dPointer < dQueue.length) {
    const rIndex = rQueue[rPointer];
    const dIndex = dQueue[dPointer];

    if (rIndex < dIndex) {
      // Radiant acts first, bans the Dire senator, and moves to the next round
      rQueue.push(rIndex + n);
    } else {
      // Dire acts first, bans the Radiant senator, and moves to the next round
      dQueue.push(dIndex + n);
    }

    // Move pointers forward (simulates shift/dequeue operation)
    rPointer++;
    dPointer++;
  }

  // If there are still Radiants left in the queue, they win. Otherwise, Dire wins.
  return rPointer < rQueue.length ? "Radiant" : "Dire";
};

console.log(predictPartyVictory(senate));
