// 1968. Array With Elements Not Equal to Average of Neighbors

/**
Example 1:

Input: nums = [1,2,3,4,5]
Output: [1,2,4,5,3]
Explanation:
When i=1, nums[i] = 2, and the average of its neighbors is (1+4) / 2 = 2.5.
When i=2, nums[i] = 4, and the average of its neighbors is (2+5) / 2 = 3.5.
When i=3, nums[i] = 5, and the average of its neighbors is (4+3) / 2 = 3.5.
Example 2:

Input: nums = [6,2,0,9,7]
Output: [9,7,6,2,0]
Explanation:
When i=1, nums[i] = 7, and the average of its neighbors is (9+6) / 2 = 7.5.
When i=2, nums[i] = 6, and the average of its neighbors is (7+2) / 2 = 4.5.
When i=3, nums[i] = 2, and the average of its neighbors is (6+0) / 2 = 3.
Note that the original array [6,2,0,9,7] also satisfies the conditions.
*/

const nums = [1, 2, 3, 4, 5];

// good version
/**
const rearrangeArray = function (nums: number[]): number[] {
  // Step 1: Sort the array in ascending order
  nums.sort((a, b) => a - b);

  const result: number[] = [];
  let left = 0;
  let right = nums.length - 1;

  // Step 2: Interleave elements from the start (small) and end (large)
  // to create a "Small, Large, Small, Large..." pattern (Zigzag).
  while (result.length < nums.length) {
    // Append from the smaller end
    result.push(nums[left]);
    left++;

    // If there are elements left, append from the larger end
    if (left <= right) {
      result.push(nums[right]);
      right--;
    }
  }

  return result;
};
*/

// better version

/**
 function rearrangeArray(nums: number[]): number[] {
    const n = nums.length;
    
    // Iterate over odd indices (1, 3, 5...)
    // We want nums[i] to be a "Peak" (larger than both neighbors)
    for (let i = 1; i < n; i += 2) {
        
        // 1. Compare with left neighbor
        // If current is smaller than left, swap to make current larger
        if (nums[i] < nums[i - 1]) {
            const temp = nums[i];
            nums[i] = nums[i - 1];
            nums[i - 1] = temp;
        }

        // 2. Compare with right neighbor (if it exists)
        // If current is smaller than right, swap to make current larger
        if (i + 1 < n && nums[i] < nums[i + 1]) {
            const temp = nums[i];
            nums[i] = nums[i + 1];
            nums[i + 1] = temp;
        }
    }
    
    return nums;
}
*/

// optimize version

function rearrangeArray(nums: number[]): number[] {
  for (let i = 1; i < nums.length; i++) {
    // Logic:
    // 1. If i is odd, we want a Peak (nums[i] > nums[i-1]).
    //    If nums[i] < nums[i-1], the pattern is wrong -> Swap.
    // 2. If i is even, we want a Valley (nums[i] < nums[i-1]).
    //    If nums[i] > nums[i-1], the pattern is wrong -> Swap.

    if (
      (i % 2 === 1 && nums[i] < nums[i - 1]) ||
      (i % 2 === 0 && nums[i] > nums[i - 1])
    ) {
      // Swap in-place using a temporary variable (faster than destructuring)
      const temp = nums[i];
      nums[i] = nums[i - 1];
      nums[i - 1] = temp;
    }
  }
  return nums;
}

console.log(rearrangeArray(nums));
