// 239. Sliding Window Maximum

/**
Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]
*/

function maxSlidingWindow(nums: number[], k: number): number[] {
  const n = nums.length;
  // The result array will have exactly n - k + 1 elements
  const result: number[] = new Array(n - k + 1);

  // We simulate a deque using a TypedArray for maximum performance.
  // It stores the indices of nums.
  const deque = new Int32Array(n);
  let head = 0;
  let tail = 0;

  for (let i = 0; i < n; i++) {
    // 1. Remove the index at the front if it's no longer in the window
    if (head < tail && deque[head] <= i - k) {
      head++;
    }

    // 2. Remove from the back indices of elements smaller than the current element
    //    because they will never be the maximum in this or any future window.
    while (head < tail && nums[deque[tail - 1]] <= nums[i]) {
      tail--;
    }

    // 3. Add the current element's index to the back of the deque
    deque[tail++] = i;

    // 4. Once we have processed at least 'k' elements, start recording the maximums
    //    The maximum is always the element at the index stored at the front of the deque
    if (i >= k - 1) {
      result[i - k + 1] = nums[deque[head]];
    }
  }

  return result;
}

// Example usage:
const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log(maxSlidingWindow(nums, k)); // Output: [3, 3, 5, 5, 6, 7]

const nums2 = [1];
const k2 = 1;
console.log(maxSlidingWindow(nums2, k2)); // Output: [1]
