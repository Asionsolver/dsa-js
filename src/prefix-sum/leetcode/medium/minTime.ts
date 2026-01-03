// 3494. Find the Minimum Amount of Time to Brew Potions

/**
Example 1:

Input: skill = [1,5,2,4], mana = [5,1,4,2]

Output: 110

Explanation:

Potion Number	Start time	Wizard 0 done by	Wizard 1 done by	Wizard 2 done by	Wizard 3 done by
0	0	5	30	40	60
1	52	53	58	60	64
2	54	58	78	86	102
3	86	88	98	102	110
As an example for why wizard 0 cannot start working on the 1st potion before time t = 52, consider the case where the wizards started preparing the 1st potion at time t = 50. At time t = 58, wizard 2 is done with the 1st potion, but wizard 3 will still be working on the 0th potion till time t = 60.

Example 2:

Input: skill = [1,1,1], mana = [1,1,1]

Output: 5

Explanation:

Preparation of the 0th potion begins at time t = 0, and is completed by time t = 3.
Preparation of the 1st potion begins at time t = 1, and is completed by time t = 4.
Preparation of the 2nd potion begins at time t = 2, and is completed by time t = 5.
Example 3:

Input: skill = [1,2,3,4], mana = [1,2]

Output: 21
*/
const skill = [1, 5, 2, 4],
  mana = [5, 1, 4, 2];
const minTime = function (skill: number[], mana: number[]) {
  const n = skill.length;
  const m = mana.length;

  // P stores prefix sums of skills.
  // P[i] = sum(skill[0]...skill[i-1])
  // Using Float64Array for efficient numeric storage, though standard array works too.
  const P = new Float64Array(n + 1);
  P[0] = 0;
  for (let i = 0; i < n; i++) {
    P[i + 1] = P[i] + skill[i];
  }

  let currentStart = 0;

  // Iterate through each transition between potion j-1 and potion j
  for (let j = 1; j < m; j++) {
    const manaPrev = mana[j - 1];
    const manaCurr = mana[j];

    // We need to find the bottleneck wizard that pushes the start time of the current potion.
    // We calculate max(P[i+1] * manaPrev - P[i] * manaCurr) for all wizards i.

    // Initialize maxGap with the case for the first wizard (i=0).
    // Since P[0] is 0, the expression P[0+1]*manaPrev - P[0]*manaCurr simplifies to:
    let maxGap = P[1] * manaPrev;

    // Check remaining wizards
    for (let i = 1; i < n; i++) {
      // P[i+1] * manaPrev is the relative finish time of prev potion at wizard i
      // P[i] * manaCurr is the relative start offset of curr potion at wizard i
      const gap = P[i + 1] * manaPrev - P[i] * manaCurr;
      if (gap > maxGap) {
        maxGap = gap;
      }
    }

    // Update the start time for the current potion (relative to wizard 0)
    currentStart += maxGap;
  }

  // The total time is determined by when the last wizard (n-1) finishes the last potion (m-1).
  // The last potion starts at wizard 0 at 'currentStart'.
  // It takes 'sum(skill) * mana[m-1]' duration to finish processing by the last wizard.
  // sum(skill) is P[n].
  return currentStart + P[n] * mana[m - 1];
};

console.log(minTime(skill, mana));
