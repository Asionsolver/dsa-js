// 2975. Maximum Square Area by Removing Fences From a Field

/**
Example 1:



Input: m = 4, n = 3, hFences = [2,3], vFences = [2]
Output: 4
Explanation: Removing the horizontal fence at 2 and the vertical fence at 2 will give a square field of area 4.
Example 2:



Input: m = 6, n = 7, hFences = [2], vFences = [4]
Output: -1
Explanation: It can be proved that there is no way to create a square field by removing fences.
*/

const m = 4,
  n = 3,
  hFences = [2, 3],
  vFences = [2];

function maximizeSquareArea(
  m: number,
  n: number,
  hFences: number[],
  vFences: number[]
): number {
  // Add the boundary fences
  hFences.push(1, m);
  vFences.push(1, n);

  // Sort the arrays to easily find distances between any two fences
  hFences.sort((a, b) => a - b);
  vFences.sort((a, b) => a - b);

  // Store all possible distances between horizontal fences in a Set
  const hGaps = new Set<number>();
  for (let i = 0; i < hFences.length; i++) {
    for (let j = i + 1; j < hFences.length; j++) {
      hGaps.add(hFences[j] - hFences[i]);
    }
  }

  let maxSide = -1;

  // Iterate through all possible distances between vertical fences
  for (let i = 0; i < vFences.length; i++) {
    for (let j = i + 1; j < vFences.length; j++) {
      const currentGap = vFences[j] - vFences[i];

      // If this vertical gap exists as a horizontal gap, we can form a square
      if (hGaps.has(currentGap)) {
        if (currentGap > maxSide) {
          maxSide = currentGap;
        }
      }
    }
  }

  if (maxSide === -1) {
    return -1;
  }

  // Calculate area modulo 10^9 + 7
  // We use BigInt because (10^9)^2 exceeds Number.MAX_SAFE_INTEGER
  const MOD = 1_000_000_007n;
  const result = (BigInt(maxSide) * BigInt(maxSide)) % MOD;

  return Number(result);
}

console.log(maximizeSquareArea(m, n, hFences, vFences));
