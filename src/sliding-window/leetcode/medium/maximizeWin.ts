// 2555. Maximize Win From Two Segments

/**
Example 1:

Input: prizePositions = [1,1,2,2,3,3,5], k = 2
Output: 7
Explanation: In this example, you can win all 7 prizes by selecting two segments [1, 3] and [3, 5].
Example 2:

Input: prizePositions = [1,2,3,4], k = 0
Output: 2
Explanation: For this example, one choice for the segments is [3, 3] and [4, 4], and you will be able to get 2 prizes. 
*/

const prizePositions = [1, 1, 2, 2, 3, 3, 5],
  k = 2;
const maximizeWin = function (prizePositions: number[], k: number) {
  const n = prizePositions.length;
  // dp[i] will store the maximum number of prizes we can collect
  // using exactly ONE segment considering prizes only from index 0 to i.
  const dp: number[] = new Array(n).fill(0);

  let ans = 0;
  let left = 0;

  for (let right = 0; right < n; right++) {
    // Expand the window with 'right'.
    // Contract from 'left' if the segment length exceeds k.
    // We compare the physical positions.
    while (prizePositions[right] - prizePositions[left] > k) {
      left++;
    }

    // Count of prizes in the current valid window [left, right]
    const currentSegmentCount = right - left + 1;

    // Calculate total prizes assuming the current window is the second segment.
    // We add the max prizes from a first segment that ends strictly before 'left'.
    // If left is 0, there is no room for a previous segment.
    const prevSegmentMax = left > 0 ? dp[left - 1] : 0;
    ans = Math.max(ans, currentSegmentCount + prevSegmentMax);

    // Update dp[right] for future iterations.
    // dp[right] is the max of:
    // 1. The best single segment ending at or before 'right - 1' (carry forward max)
    // 2. The single segment ending specifically at 'right' (currentSegmentCount)
    const prevDp = right > 0 ? dp[right - 1] : 0;
    dp[right] = Math.max(prevDp, currentSegmentCount);
  }

  return ans;
};

console.log(maximizeWin(prizePositions, k));
