// 1458. Max Dot Product of Two Subsequences

/**
Example 1:

Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
Output: 18
Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
Their dot product is (2*3 + (-2)*(-6)) = 18.
Example 2:

Input: nums1 = [3,-2], nums2 = [2,-6,7]
Output: 21
Explanation: Take subsequence [3] from nums1 and subsequence [7] from nums2.
Their dot product is (3*7) = 21.
Example 3:

Input: nums1 = [-1,-1], nums2 = [1,1]
Output: -1
Explanation: Take subsequence [-1] from nums1 and subsequence [1] from nums2.
Their dot product is -1.
*/
const nums1 = [2, 1, -2, 5],
  nums2 = [3, 0, -6];

const maxDotProduct = function (nums1: number[], nums2: number[]): number {
  const n = nums1.length;
  const m = nums2.length;

  // Initialize DP table with -Infinity because dot products can be negative.
  // dp[i][j] will store the max dot product for nums1[0...i] and nums2[0...j].
  const dp: number[][] = new Array(n)
    .fill(0)
    .map(() => new Array(m).fill(-Infinity));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const product = nums1[i] * nums2[j];

      // Option 1: Start a new subsequence with just the current pair.
      dp[i][j] = product;

      // Option 2: Append current pair to the max subsequence ending before i and j.
      if (i > 0 && j > 0) {
        // We add product to the previous best diagonal.
        // Note: max(product, prev + product) logic is implicitly handled.
        // If prev + product < product, it means prev was negative,
        // and we are better off starting fresh (which we set in Option 1).
        // Here we just ensure we take the larger of the two.
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + product);
      }

      // Option 3: Ignore the current element of nums1 (inherit from top).
      if (i > 0) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j]);
      }

      // Option 4: Ignore the current element of nums2 (inherit from left).
      if (j > 0) {
        dp[i][j] = Math.max(dp[i][j], dp[i][j - 1]);
      }
    }
  }

  // The bottom-right cell contains the result for the full arrays.
  return dp[n - 1][m - 1];
};

console.log(maxDotProduct(nums1, nums2));
