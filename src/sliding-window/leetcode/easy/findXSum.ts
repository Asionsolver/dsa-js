// 3318. Find X-Sum of All K-Long Subarrays I

/**
Example 1:

Input: nums = [1,1,2,2,3,4,2,3], k = 6, x = 2

Output: [6,10,12]

Explanation:

For subarray [1, 1, 2, 2, 3, 4], only elements 1 and 2 will be kept in the resulting array. Hence, answer[0] = 1 + 1 + 2 + 2.
For subarray [1, 2, 2, 3, 4, 2], only elements 2 and 4 will be kept in the resulting array. Hence, answer[1] = 2 + 2 + 2 + 4. Note that 4 is kept in the array since it is bigger than 3 and 1 which occur the same number of times.
For subarray [2, 2, 3, 4, 2, 3], only elements 2 and 3 are kept in the resulting array. Hence, answer[2] = 2 + 2 + 2 + 3 + 3.
Example 2:

Input: nums = [3,8,7,8,7,5], k = 2, x = 2

Output: [11,15,15,15,12]

Explanation:

Since k == x, answer[i] is equal to the sum of the subarray nums[i..i + k - 1].


*/
const nums = [1, 1, 2, 2, 3, 4, 2, 3],
  k = 6,
  x = 2;
const findXSum = function (nums: number[], k: number, x: number) {
  const n = nums.length;
  const answer: number[] = [];

  // Iterate through all possible starting positions of the sliding window
  for (let i = 0; i <= n - k; i++) {
    // Create a map to store the frequency of each number in the current window
    const freqMap = new Map<number, number>();

    // Populate the frequency map for the current window nums[i...i+k-1]
    for (let j = i; j < i + k; j++) {
      const num = nums[j];
      freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Convert the map entries to an array of objects/tuples for sorting
    // Structure: [number, frequency]
    const distinctElements: { val: number; freq: number }[] = [];
    for (const [val, freq] of freqMap.entries()) {
      distinctElements.push({ val, freq });
    }

    // Sort the distinct elements based on the problem rules:
    // 1. Higher frequency comes first.
    // 2. If frequencies are equal, bigger value comes first.
    distinctElements.sort((a, b) => {
      if (b.freq !== a.freq) {
        return b.freq - a.freq; // Descending order of frequency
      }
      return b.val - a.val; // Descending order of value
    });

    // Calculate the sum of the top x elements
    let currentXSum = 0;
    // We take the minimum of x or the total number of distinct elements found
    const countToConsider = Math.min(x, distinctElements.length);

    for (let m = 0; m < countToConsider; m++) {
      currentXSum += distinctElements[m].val * distinctElements[m].freq;
    }

    answer.push(currentXSum);
  }

  return answer;
};

console.log(findXSum(nums, k, x));
