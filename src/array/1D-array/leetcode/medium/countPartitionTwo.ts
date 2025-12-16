// 3578. Count Partitions With Max-Min Difference at Most K

/**
Example 1:

Input: nums = [9,4,1,3,7], k = 4

Output: 6

Explanation:

There are 6 valid partitions where the difference between the maximum and minimum elements in each segment is at most k = 4:

[[9], [4], [1], [3], [7]]
[[9], [4], [1], [3, 7]]
[[9], [4], [1, 3], [7]]
[[9], [4, 1], [3], [7]]
[[9], [4, 1], [3, 7]]
[[9], [4, 1, 3], [7]]
Example 2:

Input: nums = [3,3,4], k = 0

Output: 2

Explanation:

There are 2 valid partitions that satisfy the given conditions:

[[3], [3], [4]]
[[3, 3], [4]]


*/

const nums = [9, 4, 1, 3, 7],
  k = 4;

function countPartitions(nums: number[], k: number): number {
  const MOD = 1_000_000_007;
  const n = nums.length;

  // prefixSum[i] stores sum(dp[0]...dp[i-1]) % MOD
  // Effectively, dp[i] is derived from the range sum, and we update prefixSum directly
  // to save space and steps.
  // prefixSum array size is n + 2 to accommodate indices up to n+1 safely.
  const prefixSum = new Int32Array(n + 2);

  // Base case: dp[0] = 1, so prefixSum[1] = 0 + 1 = 1
  prefixSum[1] = 1;

  // Monotonic Queues to store indices
  // maxQ stores indices such that nums[index] are in decreasing order
  const maxQ = new Int32Array(n);
  let maxH = 0,
    maxT = 0; // Head and Tail pointers for maxQ

  // minQ stores indices such that nums[index] are in increasing order
  const minQ = new Int32Array(n);
  let minH = 0,
    minT = 0; // Head and Tail pointers for minQ

  let left = 0;

  for (let i = 0; i < n; i++) {
    // 1. Update Max Deque
    // Remove elements from the back that are <= current element
    while (maxH < maxT && nums[maxQ[maxT - 1]] <= nums[i]) {
      maxT--;
    }
    maxQ[maxT++] = i;

    // 2. Update Min Deque
    // Remove elements from the back that are >= current element
    while (minH < minT && nums[minQ[minT - 1]] >= nums[i]) {
      minT--;
    }
    minQ[minT++] = i;

    // 3. Shrink window from the left if condition is violated
    while (nums[maxQ[maxH]] - nums[minQ[minH]] > k) {
      left++;
      // Remove indices that fall out of the sliding window
      if (maxQ[maxH] < left) maxH++;
      if (minQ[minH] < left) minH++;
    }

    // 4. Calculate dp[i+1]
    // The valid segments ending at i start at index 'j' where left <= j <= i.
    // The number of ways to reach the start of such a segment is dp[j].
    // We need sum(dp[j]) for j in [left, i].
    // Using prefixSum array: sum is prefixSum[i+1] - prefixSum[left].

    let count = prefixSum[i + 1] - prefixSum[left];
    if (count < 0) count += MOD;

    // Update prefixSum for the next iteration:
    // prefixSum[i+2] = prefixSum[i+1] + dp[i+1]
    prefixSum[i + 2] = (prefixSum[i + 1] + count) % MOD;
  }

  // The answer is dp[n].
  // dp[n] was the 'count' calculated in the last iteration (when i = n-1).
  // It is stored in the difference between the last two prefix sums.
  let ans = prefixSum[n + 1] - prefixSum[n];
  if (ans < 0) ans += MOD;

  return ans;
}

console.log(countPartitions(nums, k));
