// 3147. Taking Maximum Energy From the Mystic Dungeon

/**
Example 1:

Input: energy = [5,2,-10,-5,1], k = 3

Output: 3

Explanation: We can gain a total energy of 3 by starting from magician 1 absorbing 2 + 1 = 3.

Example 2:

Input: energy = [-2,-3,-1], k = 2

Output: -1

Explanation: We can gain a total energy of -1 by starting from magician 2.
*/

const energy = [5, 2, -10, -5, 1],
  k = 3;

const maximumEnergy = function (energy: number[], k: number): number {
  const n = energy.length;
  let maxVal = Number.NEGATIVE_INFINITY;

  // Traverse the array from right to left
  for (let i = n - 1; i >= 0; i--) {
    // If the next jump is within the array bounds, add the
    // previously calculated total from that index to the current energy.
    if (i + k < n) {
      energy[i] += energy[i + k];
    }

    // Keep track of the maximum energy found so far
    if (energy[i] > maxVal) {
      maxVal = energy[i];
    }
  }

  return maxVal;
};

console.log(maximumEnergy(energy, k));
