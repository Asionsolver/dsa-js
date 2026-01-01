// 3186. Maximum Total Damage With Spell Casting

/**
Example 1:

Input: power = [1,1,3,4]

Output: 6

Explanation:

The maximum possible damage of 6 is produced by casting spells 0, 1, 3 with damage 1, 1, 4.

Example 2:

Input: power = [7,1,6,6]

Output: 13

Explanation:

The maximum possible damage of 13 is produced by casting spells 1, 2, 3 with damage 1, 6, 6.


*/

const power = [1, 1, 3, 4];
const maximumTotalDamage = function (power: number[]) {
  // 1. Count frequencies of each damage value
  const countMap = new Map<number, number>();
  for (const p of power) {
    countMap.set(p, (countMap.get(p) || 0) + 1);
  }

  // 2. Create a sorted array of unique damage values
  const uniqueDamages = Array.from(countMap.keys()).sort((a, b) => a - b);
  const n = uniqueDamages.length;

  // dp[i] represents the max damage possible considering unique spells up to index i
  const dp = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    const damage = uniqueDamages[i];
    const currentTotalDamage = damage * countMap.get(damage)!;

    // Option 1: Skip the current spell type
    const skip = i > 0 ? dp[i - 1] : 0;

    // Option 2: Take the current spell type
    // We need to find the best previous state that doesn't conflict.
    // The conflict range is [damage - 2, damage + 2].
    // So we look for a spell with value < damage - 2.

    let prevIndex = -1;

    // Binary search for the rightmost index 'j' such that uniqueDamages[j] < damage - 2
    let low = 0;
    let high = i - 1;

    while (low <= high) {
      const mid = (low + high) >>> 1;
      if (uniqueDamages[mid] < damage - 2) {
        prevIndex = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const take = currentTotalDamage + (prevIndex !== -1 ? dp[prevIndex] : 0);

    // Store the maximum of taking or skipping
    dp[i] = Math.max(skip, take);
  }

  return dp[n - 1];
};
console.log(maximumTotalDamage(power));
