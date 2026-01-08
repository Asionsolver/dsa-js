// 307. Range Sum Query - Mutable

/**
Example 1:

Input
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output
[null, 9, null, 8]

Explanation
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
*/

// ---------------------------------------------------------
// THE SOLUTION CLASS
// ---------------------------------------------------------
class NumArray {
  private tree: number[];
  private nums: number[];
  private n: number;

  constructor(nums: number[]) {
    this.nums = nums;
    this.n = nums.length;
    this.tree = new Array(this.n + 1).fill(0);

    for (let i = 0; i < this.n; i++) {
      this.add(i + 1, nums[i]);
    }
  }

  private add(index: number, val: number): void {
    while (index <= this.n) {
      this.tree[index] += val;
      index += index & -index;
    }
  }

  private query(index: number): number {
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  }

  update(index: number, val: number): void {
    const delta = val - this.nums[index];
    this.nums[index] = val;
    this.add(index + 1, delta);
  }

  sumRange(left: number, right: number): number {
    return this.query(right + 1) - this.query(left);
  }
}

// ---------------------------------------------------------
// DRIVER CODE (To show output locally)
// ---------------------------------------------------------

// Example 1 Input:
// ["NumArray", "sumRange", "update", "sumRange"]
// [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]

console.log("--- Starting Test ---");

// 1. Initialize NumArray with [1, 3, 5]
const nums = [1, 3, 5];
const obj = new NumArray(nums);
console.log(`Initialized with: [${nums}]`);

// 2. Calculate sumRange(0, 2) -> Should be 1 + 3 + 5 = 9
const sum1 = obj.sumRange(0, 2);
console.log(`sumRange(0, 2): ${sum1}`); // Expected: 9

// 3. Update index 1 to value 2 -> Array becomes [1, 2, 5]
obj.update(1, 2);
console.log(`Updated index 1 to 2. New logical array: [1, 2, 5]`);

// 4. Calculate sumRange(0, 2) -> Should be 1 + 2 + 5 = 8
const sum2 = obj.sumRange(0, 2);
console.log(`sumRange(0, 2): ${sum2}`); // Expected: 8

console.log("--- End Test ---");
