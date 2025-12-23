// 954. Array of Doubled Pairs

/**
Example 1:

Input: arr = [3,1,3,6]
Output: false
Example 2:

Input: arr = [2,1,2,6]
Output: false
Example 3:

Input: arr = [4,-2,2,-4]
Output: true
Explanation: We can take two groups, [-2,-4] and [2,4] to form [-2,-4,2,4] or [2,4,-2,-4].
*/
const arr = [3, 1, 3, 6];
const canReorderDoubled = function (arr: number[]): boolean {
  const counts = new Map<number, number>();

  // 1. Build frequency map
  for (const num of arr) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  // 2. Sort unique keys by their absolute values
  const uniqueKeys = Array.from(counts.keys()).sort(
    (a, b) => Math.abs(a) - Math.abs(b)
  );

  // 3. Process each number
  for (const x of uniqueKeys) {
    const countX = counts.get(x)!;

    // If this number was already used up as a partner for a previous smaller number
    if (countX === 0) continue;

    const target = x * 2;
    const countTarget = counts.get(target) || 0;

    // Special case for zero: must have an even count because 2 * 0 = 0
    if (x === 0) {
      if (countX % 2 !== 0) return false;
      counts.set(x, 0);
      continue;
    }

    // If we don't have enough '2x' to satisfy all 'x'
    if (countX > countTarget) {
      return false;
    }

    // Use up the partners
    counts.set(target, countTarget - countX);
  }

  return true;
};

console.log(canReorderDoubled(arr));
