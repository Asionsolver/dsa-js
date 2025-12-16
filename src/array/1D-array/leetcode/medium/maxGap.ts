// 164. Maximum Gap
/**
Example 1:

Input: nums = [3,6,9,1]
Output: 3
Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.
Example 2:

Input: nums = [10]
Output: 0
Explanation: The array contains less than 2 elements, therefore return 0.

*/
const numsMax = [3, 6, 9, 1];

const maximumGap = function (nums: number[]) {
  const n = nums.length;

  // Constraint check: Less than 2 elements means no gap.
  if (n < 2) return 0;

  // Step 1: Find global min and max
  let minVal = Infinity;
  let maxVal = -Infinity;

  for (const num of nums) {
    if (num < minVal) minVal = num;
    if (num > maxVal) maxVal = num;
  }

  // Edge case: All elements are the same
  if (minVal === maxVal) return 0;

  // Step 2: Calculate bucket size and number of buckets needed
  // The smallest possible max gap is (max - min) / (n - 1).
  // Any gap within a bucket of this size is guaranteed to be smaller than the max gap found between buckets.
  const bucketSize = Math.max(1, Math.floor((maxVal - minVal) / (n - 1)));
  const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1;

  // Step 3: Initialize buckets
  // We only need to keep track of the min and max value within each bucket
  const bucketsMin = new Array(bucketCount).fill(Infinity);
  const bucketsMax = new Array(bucketCount).fill(-Infinity);

  // Step 4: Place numbers into buckets
  for (const num of nums) {
    const idx = Math.floor((num - minVal) / bucketSize);
    bucketsMin[idx] = Math.min(bucketsMin[idx], num);
    bucketsMax[idx] = Math.max(bucketsMax[idx], num);
  }

  // Step 5: Iterate through buckets to find the max gap
  let maxGap = 0;
  let previousMax = minVal; // Initialize with the global min (effectively the max of the "virtual" previous bucket)

  for (let i = 0; i < bucketCount; i++) {
    // Skip empty buckets
    if (bucketsMin[i] === Infinity) continue;

    // The gap is the difference between the current bucket's minimum
    // and the previous non-empty bucket's maximum.
    maxGap = Math.max(maxGap, bucketsMin[i] - previousMax);

    // Update previousMax to the current bucket's maximum
    previousMax = bucketsMax[i];
  }

  return maxGap;
};

console.log(maximumGap(numsMax));
