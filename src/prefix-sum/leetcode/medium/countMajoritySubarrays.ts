// 3737. Count Subarrays With Majority Element I

/**
Example 1:

Input: nums = [1,2,2,3], target = 2

Output: 5

Explanation:

Valid subarrays with target = 2 as the majority element:

nums[1..1] = [2]
nums[2..2] = [2]
nums[1..2] = [2,2]
nums[0..2] = [1,2,2]
nums[1..3] = [2,2,3]
So there are 5 such subarrays.

Example 2:

Input: nums = [1,1,1,1], target = 1

Output: 10

Explanation:

​​​​​​​All 10 subarrays have 1 as the majority element.

Example 3:

Input: nums = [1,2,3], target = 4

Output: 0

Explanation:

target = 4 does not appear in nums at all. Therefore, there cannot be any subarray where 4 is the majority element. Hence the answer is 0.
*/

class BinaryIndexedTree {
  private n: number;
  private c: number[];

  constructor(n: number) {
    this.n = n;
    this.c = Array(n + 1).fill(0);
  }

  // Add delta to index x
  update(x: number, delta: number): void {
    for (; x <= this.n; x += x & -x) {
      this.c[x] += delta;
    }
  }

  // Query sum of frequencies from index 1 to x
  query(x: number): number {
    let s = 0;
    for (; x > 0; x -= x & -x) {
      s += this.c[x];
    }
    return s;
  }
}

function countMajoritySubarrays(nums: number[], target: number): number {
  const n = nums.length;
  // Prefix sum can range from -n to n.
  // Shift by n + 1 so values map to [1, 2n + 1].
  const tree = new BinaryIndexedTree(2 * n + 1);

  let s = 0; // Current prefix sum
  // Insert the initial prefix sum P[0] = 0, which shifts to 0 + n + 1
  tree.update(s + n + 1, 1);

  let ans = 0;
  for (const x of nums) {
    if (x === target) {
      s++;
    } else {
      s--;
    }

    // Count previous prefix sums `prev_s` such that `prev_s < s`.
    // In shifted coordinates, this is `prev_shifted <= s + n`.
    ans += tree.query(s + n);

    // Insert the current shifted prefix sum `s + n + 1` into the tree
    tree.update(s + n + 1, 1);
  }

  return ans;
}

// Example usage:
const nums1 = [1, 2, 2, 3];
const target1 = 2;
console.log(countMajoritySubarrays(nums1, target1)); // Output: 5

const nums2 = [1, 1, 1, 1];
const target2 = 1;
console.log(countMajoritySubarrays(nums2, target2)); // Output: 10

const nums3 = [1, 2, 3];
const target3 = 4;
console.log(countMajoritySubarrays(nums3, target3)); // Output: 0
