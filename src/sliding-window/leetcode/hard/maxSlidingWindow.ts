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
    const result: number[] = new Array(n - k + 1);
    const deque = new Int32Array(n);
    let head = 0;
    let tail = 0;

    for (let i = 0; i < n; i++) {
        if (head < tail && deque[head] <= i - k) {
            head++;
        }

        while (head < tail && nums[deque[tail - 1]] <= nums[i]) {
            tail--;
        }

        deque[tail++] = i;

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
