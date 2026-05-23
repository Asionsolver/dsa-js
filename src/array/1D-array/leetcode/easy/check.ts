// 1752. Check if Array Is Sorted and Rotated

/**
Example 1:

Input: nums = [3,4,5,1,2]
Output: true
Explanation: [1,2,3,4,5] is the original sorted array.
You can rotate the array by x = 2 positions to begin on the element of value 3: [3,4,5,1,2].
Example 2:

Input: nums = [2,1,3,4]
Output: false
Explanation: There is no sorted array once rotated that can make nums.
Example 3:

Input: nums = [1,2,3]
Output: true
Explanation: [1,2,3] is the original sorted array.
You can rotate the array by x = 0 positions (i.e. no rotation) to make nums.
*/

function check(nums: number[]): boolean {
  let dropCount = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    // Check if the current element is greater than the next element.
    // We use modulo `n` to smoothly wrap around to compare the last element with the first.
    if (nums[i] > nums[(i + 1) % n]) {
      dropCount++;
    }

    // If there is more than 1 drop, it is impossible for the array to have been sorted.
    if (dropCount > 1) {
      return false;
    }
  }

  return true;
}

// Example usage:
console.log(check([3, 4, 5, 1, 2])); // Output: true
console.log(check([2, 1, 3, 4])); // Output: false
console.log(check([1, 2, 3])); // Output: true
