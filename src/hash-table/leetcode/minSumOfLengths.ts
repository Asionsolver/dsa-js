// 1477. Find Two Non-overlapping Sub-arrays Each With Target Sum

/**
Example 1:

Input: arr = [3,2,2,4,3], target = 3
Output: 2
Explanation: Only two sub-arrays have sum = 3 ([3] and [3]). The sum of their lengths is 2.
Example 2:

Input: arr = [7,3,4,7], target = 7
Output: 2
Explanation: Although we have three non-overlapping sub-arrays of sum = 7 ([7], [3,4] and [7]), but we will choose the first and third sub-arrays as the sum of their lengths is 2.
Example 3:

Input: arr = [4,3,2,6,2,3,4], target = 6
Output: -1
Explanation: We have only one sub-array of sum = 6.

*/

const arr = [3, 2, 2, 4, 3];
const target = 3;

const minSumOfLengths = function (arr: number[], target: number) {
  const n = arr.length;

  // Step 1: Find sub-arrays with sum == target
  const bestLeft = Array(n).fill(Infinity);

  let left = 0,
    sum = 0,
    best = Infinity;

  // Left → Right
  for (let right = 0; right < n; right++) {
    sum += arr[right];

    while (sum > target) {
      sum -= arr[left];
      left++;
    }

    if (sum === target) {
      best = Math.min(best, right - left + 1);
      bestLeft[right] = best;
    } else if (right > 0) {
      bestLeft[right] = bestLeft[right - 1];
    }
  }

  // Step 2: Right → Left (same logic)
  const bestRight = Array(n).fill(Infinity);
  let right = n - 1;
  sum = 0;
  best = Infinity;

  for (let left2 = n - 1; left2 >= 0; left2--) {
    sum += arr[left2];

    while (sum > target) {
      sum -= arr[right];
      right--;
    }

    if (sum === target) {
      best = Math.min(best, right - left2 + 1);
      bestRight[left2] = best;
    } else if (left2 < n - 1) {
      bestRight[left2] = bestRight[left2 + 1];
    }
  }

  // Step 3: Combine left + right non-overlapping windows
  let ans = Infinity;
  for (let i = 0; i < n - 1; i++) {
    if (bestLeft[i] < Infinity && bestRight[i + 1] < Infinity) {
      ans = Math.min(ans, bestLeft[i] + bestRight[i + 1]);
    }
  }

  return ans === Infinity ? -1 : ans;
};

console.log(minSumOfLengths(arr, target));
