// 715. Range Module

/**
Example 1:

Input
["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
Output
[null, null, null, true, false, true]

Explanation
RangeModule rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
rangeModule.queryRange(10, 14); // return True,(Every number in [10, 14) is being tracked)
rangeModule.queryRange(13, 15); // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
rangeModule.queryRange(16, 17); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)
*/

class RangeModule {
  private ranges: number[][];

  constructor() {
    this.ranges = [];
  }

  addRange(left: number, right: number): void {
    let i = this.getFirstOverlap(left, false);
    let j = this.getLastOverlap(right, false);

    if (i <= j) {
      left = Math.min(left, this.ranges[i][0]);
      right = Math.max(right, this.ranges[j][1]);
      this.ranges.splice(i, j - i + 1, [left, right]);
    } else {
      this.ranges.splice(i, 0, [left, right]);
    }
  }

  queryRange(left: number, right: number): boolean {
    let l = 0,
      r = this.ranges.length - 1;
    while (l <= r) {
      let mid = (l + r) >> 1;
      let [s, e] = this.ranges[mid];

      if (s <= left && e >= right) return true;

      if (e <= left) {
        l = mid + 1;
      } else if (s > left) {
        r = mid - 1;
      } else {
        return false;
      }
    }
    return false;
  }

  removeRange(left: number, right: number): void {
    let i = this.getFirstOverlap(left, true);
    let j = this.getLastOverlap(right, true);

    if (i <= j) {
      let newIntervals: number[][] = [];

      if (this.ranges[i][0] < left) {
        newIntervals.push([this.ranges[i][0], left]);
      }
      if (this.ranges[j][1] > right) {
        newIntervals.push([right, this.ranges[j][1]]);
      }

      this.ranges.splice(i, j - i + 1, ...newIntervals);
    }
  }

  private getFirstOverlap(val: number, strict: boolean): number {
    let l = 0,
      r = this.ranges.length - 1;
    let res = this.ranges.length;
    while (l <= r) {
      let mid = (l + r) >> 1;
      if (strict ? this.ranges[mid][1] > val : this.ranges[mid][1] >= val) {
        res = mid;
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    return res;
  }

  private getLastOverlap(val: number, strict: boolean): number {
    let l = 0,
      r = this.ranges.length - 1;
    let res = -1;
    while (l <= r) {
      let mid = (l + r) >> 1;
      if (strict ? this.ranges[mid][0] < val : this.ranges[mid][0] <= val) {
        res = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return res;
  }
}

// ==========================================
// DRIVER CODE TO SHOW OUTPUT IN TERMINAL
// ==========================================

console.log("Executing LeetCode Example 1...");
const output: (boolean | null)[] = [];

// 1. "RangeModule"
const rangeModule = new RangeModule();
output.push(null);

// 2. "addRange", [10, 20]
rangeModule.addRange(10, 20);
output.push(null);
console.log("Added [10, 20)");

// 3. "removeRange", [14, 16]
rangeModule.removeRange(14, 16);
output.push(null);
console.log("Removed [14, 16)");

// 4. "queryRange", [10, 14]
const q1 = rangeModule.queryRange(10, 14);
output.push(q1);
console.log(`Query [10, 14): ${q1}`);

// 5. "queryRange", [13, 15]
const q2 = rangeModule.queryRange(13, 15);
output.push(q2);
console.log(`Query [13, 15): ${q2}`);

// 6. "queryRange", [16, 17]
const q3 = rangeModule.queryRange(16, 17);
output.push(q3);
console.log(`Query [16, 17): ${q3}`);

console.log("\nFinal Array Output (matches LeetCode format):");
console.log(output);
