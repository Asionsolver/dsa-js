// 303. Range Sum Query - Immutable

/**
Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
*/

class NumArray {
  private prefixSums: number[];

  constructor(nums: number[]) {
    // Create an array of size nums.length + 1 to handle left = 0 cleanly
    this.prefixSums = new Array(nums.length + 1).fill(0);

    // Calculate the prefix sums
    for (let i = 0; i < nums.length; i++) {
      this.prefixSums[i + 1] = this.prefixSums[i] + nums[i];
    }
  }

  sumRange(left: number, right: number): number {
    // Return the difference of prefix sums
    return this.prefixSums[right + 1] - this.prefixSums[left];
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */

// Example usage:
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2)); // Output: 1
console.log(numArray.sumRange(2, 5)); // Output: -1
console.log(numArray.sumRange(0, 5)); // Output: -3
