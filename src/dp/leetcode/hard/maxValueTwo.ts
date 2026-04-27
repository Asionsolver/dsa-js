// 3287. Find the Maximum Sequence Value of Array

/**
Example 1:

Input: nums = [2,6,7], k = 1

Output: 5

Explanation:

The subsequence [2, 7] has the maximum value of 2 XOR 7 = 5.

Example 2:

Input: nums = [4,2,5,6,7], k = 2

Output: 2

Explanation:

The subsequence [4, 5, 6, 7] has the maximum value of (4 OR 5) XOR (6 OR 7) = 2.
*/

function maxValue(nums: number[], k: number): number {
  const n = nums.length;

  // ansL[i][x] maps to i * 128 + x
  const ansL = new Uint8Array(n * 128);
  const ansR = new Uint8Array(n * 128);

  // dpL[j][x] maps to j * 128 + x
  const dpL = new Uint8Array((k + 1) * 128);
  dpL[0] = 1; // base case: picking 0 elements gives an OR sum of 0

  // Compute prefix valid OR sums
  for (let i = 0; i < n; i++) {
    const v = nums[i];
    const maxJ = Math.min(i, k - 1);
    for (let j = maxJ; j >= 0; j--) {
      const offsetJ = j * 128;
      const offsetJ1 = (j + 1) * 128;
      for (let x = 0; x < 128; x++) {
        if (dpL[offsetJ + x] === 1) {
          dpL[offsetJ1 + (x | v)] = 1;
        }
      }
    }

    // Take a snapshot of picking exactly k elements up to index i
    const offsetK = k * 128;
    const offsetAns = i * 128;
    for (let x = 0; x < 128; x++) {
      ansL[offsetAns + x] = dpL[offsetK + x];
    }
  }

  const dpR = new Uint8Array((k + 1) * 128);
  dpR[0] = 1;

  // Compute suffix valid OR sums
  for (let i = n - 1; i >= 0; i--) {
    const v = nums[i];
    const maxJ = Math.min(n - 1 - i, k - 1);
    for (let j = maxJ; j >= 0; j--) {
      const offsetJ = j * 128;
      const offsetJ1 = (j + 1) * 128;
      for (let y = 0; y < 128; y++) {
        if (dpR[offsetJ + y] === 1) {
          dpR[offsetJ1 + (y | v)] = 1;
        }
      }
    }

    // Take a snapshot of picking exactly k elements from index i onwards
    const offsetK = k * 128;
    const offsetAns = i * 128;
    for (let y = 0; y < 128; y++) {
      ansR[offsetAns + y] = dpR[offsetK + y];
    }
  }

  let maxVal = 0;

  // We need partition point i such that the left side has elements 0..i, and the right side has elements i+1..n-1
  // Left side must contain at least k elements -> i >= k - 1
  // Right side must contain at least k elements -> n - 1 - i >= k  (or i <= n - k - 1)
  for (let i = k - 1; i <= n - k - 1; i++) {
    const offsetL = i * 128;
    const offsetR = (i + 1) * 128;

    // Gathering efficiently achievable OR sums for this split point bounds iteration constants
    const activeX: number[] = [];
    for (let x = 0; x < 128; x++) {
      if (ansL[offsetL + x] === 1) activeX.push(x);
    }

    const activeY: number[] = [];
    for (let y = 0; y < 128; y++) {
      if (ansR[offsetR + y] === 1) activeY.push(y);
    }

    // Find maximum crossing XORs combination
    for (let idxX = 0; idxX < activeX.length; idxX++) {
      const x = activeX[idxX];
      for (let idxY = 0; idxY < activeY.length; idxY++) {
        const val = x ^ activeY[idxY];
        if (val > maxVal) {
          maxVal = val;
        }
      }
    }
  }

  return maxVal;
}

// Example usage:
const nums1 = [2, 6, 7];
const k1 = 1;
console.log(maxValue(nums1, k1)); // Output: 5

const nums2 = [4, 2, 5, 6, 7];
const k2 = 2;
console.log(maxValue(nums2, k2)); // Output: 2
