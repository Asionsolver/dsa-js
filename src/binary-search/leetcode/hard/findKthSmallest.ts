// 3116. Kth Smallest Amount With Single Denomination Combination

/**
You are given an integer array coins representing coins of different denominations and an integer k.

You have an infinite number of coins of each denomination. However, you are not allowed to combine coins of different denominations.

Return the kth smallest amount that can be made using these coins.
*/

/**
Example 1:

Input: coins = [3,6,9], k = 3

Output: 9

Explanation: The given coins can make the following amounts:
Coin 3 produces multiples of 3: 3, 6, 9, 12, 15, etc.
Coin 6 produces multiples of 6: 6, 12, 18, 24, etc.
Coin 9 produces multiples of 9: 9, 18, 27, 36, etc.
All of the coins combined produce: 3, 6, 9, 12, 15, etc.

Example 2:

Input: coins = [5,2], k = 7

Output: 12

Explanation: The given coins can make the following amounts:
Coin 5 produces multiples of 5: 5, 10, 15, 20, etc.
Coin 2 produces multiples of 2: 2, 4, 6, 8, 10, 12, etc.
All of the coins combined produce: 2, 4, 5, 6, 8, 10, 12, 14, 15, etc.


*/

/**
Constraints:

1 <= coins.length <= 15
1 <= coins[i] <= 25
1 <= k <= 2 * 109
coins contains pairwise distinct integers.
*/

// Helper function to find GCD of two numbers.

function gcd(a: bigint, b: bigint): bigint {
  while (b > 0n) {
    a %= b;
    [a, b] = [b, a];
  }
  return a;
}

// Helper function to find LCM of two numbers.

function lcm(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n;
  return (a * b) / gcd(a, b);
}

function findKthSmallest(coins: number[], k: number): number {
  const n = coins.length;
  const kBig = BigInt(k);
  const coinsBig = coins.map((c) => BigInt(c));

  // Pre-calculate LCMs and signs for all non-empty subsets to speed up countUnique.
  const subsetInfo: { lcmVal: bigint; sign: number }[] = [];

  // Iterate through all 2^n - 1 subsets.

  for (let i = 1; i < 1 << n; i++) {
    let currentLcm = 1n;
    let setSize = 0;
    for (let j = 0; j < n; j++) {
      if ((i >> j) & 1) {
        currentLcm = lcm(currentLcm, coinsBig[j]);
        setSize++;
      }
    }
    // If set size is odd, sign is +1, if even, sign is -1.

    subsetInfo.push({
      lcmVal: currentLcm,
      sign: setSize % 2 === 1 ? 1 : -1,
    });
  }

  // Function to count unique multiples up to value X.

  function countUnique(X: bigint): bigint {
    let total = 0n;
    for (const { lcmVal, sign } of subsetInfo) {
      total += (X / lcmVal) * BigInt(sign);
    }
    return total;
  }

  // Binary Search on the answer.

  let low = 1n;
  let high = BigInt(Math.min(...coins)) * kBig;
  let ans = high;

  while (low <= high) {
    let mid = low + (high - low) / 2n;
    if (countUnique(mid) >= kBig) {
      ans = mid;
      high = mid - 1n;
    } else {
      low = mid + 1n;
    }
  }

  return Number(ans);
}

// Example usage:
console.log(findKthSmallest([3, 6, 9], 3)); // Output: 9
console.log(findKthSmallest([5, 2], 7)); // Output: 12
