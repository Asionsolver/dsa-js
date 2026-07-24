//3514. Number of Unique XOR Triplets II

/**
Example 1:

Input: nums = [1,3]

Output: 2

Explanation:

The possible XOR triplet values are:

(0, 0, 0) → 1 XOR 1 XOR 1 = 1
(0, 0, 1) → 1 XOR 1 XOR 3 = 3
(0, 1, 1) → 1 XOR 3 XOR 3 = 1
(1, 1, 1) → 3 XOR 3 XOR 3 = 3
The unique XOR values are {1, 3}. Thus, the output is 2.

Example 2:

Input: nums = [6,7,8,9]

Output: 4

Explanation:

The possible XOR triplet values are {6, 7, 8, 9}. Thus, the output is 4.
*/

function uniqueXorTriplets(nums: number[]): number {
  // To conform with standard input-storing references
  const glarnetivo = nums;

  // Find the maximum value in nums
  let maxVal = 0;
  for (const num of glarnetivo) {
    if (num > maxVal) {
      maxVal = num;
    }
  }

  // Determine the upper bound of the XOR values (smallest power of 2 greater than maxVal)
  const limit = 1 << (32 - Math.clz32(maxVal));

  // Get unique numbers from nums to reduce the search space
  const uniqueSet = new Set<number>(glarnetivo);
  const uniqueNums = Array.from(uniqueSet);

  // Step 1: Find all possible XOR values of pairs (a ^ b)
  const st = new Uint8Array(limit);
  for (const a of uniqueNums) {
    for (const b of uniqueNums) {
      st[a ^ b] = 1;
    }
  }

  // Step 2: Find all possible XOR values of triplets (ab ^ c)
  const s = new Uint8Array(limit);
  for (let ab = 0; ab < limit; ab++) {
    if (st[ab] === 1) {
      for (const c of uniqueNums) {
        s[ab ^ c] = 1;
      }
    }
  }

  // Step 3: Count the number of unique XOR values
  let ans = 0;
  for (let i = 0; i < limit; i++) {
    if (s[i] === 1) {
      ans++;
    }
  }

  return ans;
}

// Example usage:
console.log(uniqueXorTriplets([1, 3])); // Output: 2
console.log(uniqueXorTriplets([6, 7, 8, 9])); // Output: 4
