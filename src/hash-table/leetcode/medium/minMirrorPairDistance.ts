// 3761. Minimum Absolute Distance Between Mirror Pairs

/**
Example 1:

Input: nums = [12,21,45,33,54]

Output: 1

Explanation:

The mirror pairs are:

(0, 1) since reverse(nums[0]) = reverse(12) = 21 = nums[1], giving an absolute distance abs(0 - 1) = 1.
(2, 4) since reverse(nums[2]) = reverse(45) = 54 = nums[4], giving an absolute distance abs(2 - 4) = 2.
The minimum absolute distance among all pairs is 1.

Example 2:

Input: nums = [120,21]

Output: 1

Explanation:

There is only one mirror pair (0, 1) since reverse(nums[0]) = reverse(120) = 21 = nums[1].

The minimum absolute distance is 1.

Example 3:

Input: nums = [21,120]

Output: -1

Explanation:

There are no mirror pairs in the array.
*/

const nums = [12, 21, 45, 33, 54];

const minAbsoluteDistance = (nums: number[]): number => {
  // Stores `reverse(nums[i])` -> `i` (the most recent index)
  const map = new Map<number, number>();
  let minDistance = Infinity;

  for (let j = 0; j < nums.length; j++) {
    const current = nums[j];

    // If the current number matches a previously seen reversed number
    if (map.has(current)) {
      const i = map.get(current)!;
      const dist = j - i;
      if (dist < minDistance) {
        minDistance = dist;
      }
    }

    // Compute the reverse of the current number mathematically
    let x = current;
    let rev = 0;
    while (x > 0) {
      rev = rev * 10 + (x % 10);
      x = Math.floor(x / 10);
    }

    // Save the reversed number and its index in the map
    map.set(rev, j);
  }

  // Return -1 if no mirror pair exists, otherwise return the minimum distance found
  return minDistance === Infinity ? -1 : minDistance;
};

console.log(minAbsoluteDistance(nums));
