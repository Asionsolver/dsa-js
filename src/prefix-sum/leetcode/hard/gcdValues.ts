// 3312. Sorted GCD Pair Queries

/**
Example 1:

Input: nums = [2,3,4], queries = [0,2,2]

Output: [1,2,2]

Explanation:

gcdPairs = [gcd(nums[0], nums[1]), gcd(nums[0], nums[2]), gcd(nums[1], nums[2])] = [1, 2, 1].

After sorting in ascending order, gcdPairs = [1, 1, 2].

So, the answer is [gcdPairs[queries[0]], gcdPairs[queries[1]], gcdPairs[queries[2]]] = [1, 2, 2].

Example 2:

Input: nums = [4,4,2,1], queries = [5,3,1,0]

Output: [4,2,1,1]

Explanation:

gcdPairs sorted in ascending order is [1, 1, 1, 2, 2, 4].

Example 3:

Input: nums = [2,2], queries = [0,0]

Output: [2,2]

Explanation:

gcdPairs = [2].

*/

function gcdValues(nums: number[], queries: number[]): number[] {
  let maxVal = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxVal) {
      maxVal = nums[i];
    }
  }
  const M = maxVal;

  // freq[x] stores the count of x in nums
  const freq = new Int32Array(M + 1);
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]]++;
  }

  // C[d] stores the number of elements in nums that are multiples of d
  const C = new Float64Array(M + 1);
  for (let d = 1; d <= M; d++) {
    let count = 0;
    for (let k = d; k <= M; k += d) {
      count += freq[k];
    }
    C[d] = count;
  }

  // countGCD[d] stores the number of pairs with GCD exactly d
  const countGCD = new Float64Array(M + 1);
  for (let d = M; d >= 1; d--) {
    const totalPairs = (C[d] * (C[d] - 1)) / 2;
    let subtract = 0;
    for (let k = 2 * d; k <= M; k += d) {
      subtract += countGCD[k];
    }
    countGCD[d] = totalPairs - subtract;
  }

  // prefix[d] stores the number of pairs with GCD <= d
  const prefix = new Float64Array(M + 1);
  for (let d = 1; d <= M; d++) {
    prefix[d] = prefix[d - 1] + countGCD[d];
  }

  // Answer each query using binary search
  const ans: number[] = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    let low = 1;
    let high = M;
    let res = M;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (prefix[mid] > q) {
        res = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    ans[i] = res;
  }

  return ans;
}

// Example usage:
const nums = [2, 3, 4];
const queries = [0, 2, 2];
console.log(gcdValues(nums, queries)); // Output: [1, 2, 2]

const nums2 = [4, 4, 2, 1];
const queries2 = [5, 3, 1, 0];
console.log(gcdValues(nums2, queries2)); // Output: [4, 2, 1, 1]

const nums3 = [2, 2];
const queries3 = [0, 0];
console.log(gcdValues(nums3, queries3)); // Output: [2, 2]
