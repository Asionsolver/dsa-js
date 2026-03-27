// 2276. Count Integers in Intervals

/**
Example 1:

Input
["CountIntervals", "add", "add", "count", "add", "count"]
[[], [2, 3], [7, 10], [], [5, 8], []]
Output
[null, null, null, 6, null, 8]

Explanation
CountIntervals countIntervals = new CountIntervals(); // initialize the object with an empty set of intervals. 
countIntervals.add(2, 3);  // add [2, 3] to the set of intervals.
countIntervals.add(7, 10); // add [7, 10] to the set of intervals.
countIntervals.count();    // return 6
                           // the integers 2 and 3 are present in the interval [2, 3].
                           // the integers 7, 8, 9, and 10 are present in the interval [7, 10].
countIntervals.add(5, 8);  // add [5, 8] to the set of intervals.
countIntervals.count();    // return 8
                           // the integers 2 and 3 are present in the interval [2, 3].
                           // the integers 5 and 6 are present in the interval [5, 8].
                           // the integers 7 and 8 are present in the intervals [5, 8] and [7, 10].
                           // the integers 9 and 10 are present in the interval [7, 10].
*/

class CountIntervals {
  private left: Int32Array;
  private right: Int32Array;
  private val: Int32Array;
  private cnt: number;

  constructor() {
    // We start with a conservative initial capacity to save memory on smaller test cases.
    // The tree capacity dynamically doubles when needed, running extremely fast due to TypedArray .set()
    const INITIAL_SIZE = 250000;
    this.left = new Int32Array(INITIAL_SIZE);
    this.right = new Int32Array(INITIAL_SIZE);
    this.val = new Int32Array(INITIAL_SIZE);

    // Node `0` conceptually represents the empty/null node.
    // Node `1` represents our root node spanning [1, 10^9].
    this.cnt = 1;
  }

  private ensureCapacity(): void {
    // If we're reaching the max allocation bounds of our current arrays, we resize (double).
    if (this.cnt >= this.left.length - 1) {
      const newSize = this.left.length * 2;

      const newLeft = new Int32Array(newSize);
      newLeft.set(this.left);
      this.left = newLeft;

      const newRight = new Int32Array(newSize);
      newRight.set(this.right);
      this.right = newRight;

      const newVal = new Int32Array(newSize);
      newVal.set(this.val);
      this.val = newVal;
    }
  }

  add(left: number, right: number): void {
    // The constraints state intervals can reach 10^9
    this.update(1, 1, 1_000_000_000, left, right);
  }

  private update(
    node: number,
    L: number,
    R: number,
    l: number,
    r: number,
  ): void {
    // Subtree bounding Box `L` to `R` is already fully covered. Returning saves unneeded iterations.
    if (this.val[node] === R - L + 1) return;

    // Added interval completely encompasses the current subtree's bounding box.
    if (L >= l && R <= r) {
      this.val[node] = R - L + 1;
      return;
    }

    // Get the midpoint to see where the incoming interval bridges
    const mid = L + Math.floor((R - L) / 2);

    // Subdivide into the left and right children mapping segments
    if (l <= mid) {
      if (this.left[node] === 0) {
        this.ensureCapacity();
        this.cnt++;
        this.left[node] = this.cnt;
      }
      this.update(this.left[node], L, mid, l, r);
    }

    if (r > mid) {
      if (this.right[node] === 0) {
        this.ensureCapacity();
        this.cnt++;
        this.right[node] = this.cnt;
      }
      this.update(this.right[node], mid + 1, R, l, r);
    }

    // Retract logic back upwards: The total value for the bounding box is its left and right segments combined.
    // Unallocated children naturally point to the 0th index which accurately falls back to `this.val[0] = 0`.
    this.val[node] = this.val[this.left[node]] + this.val[this.right[node]];
  }

  count(): number {
    // Yield the tracked values accumulated within the core root
    return this.val[1];
  }
}

// --- DRIVER CODE TO TEST LOCALLY ---

console.log("Initializing CountIntervals...");
const countIntervals = new CountIntervals();

console.log("Adding [2, 3]");
countIntervals.add(2, 3);

console.log("Adding [7, 10]");
countIntervals.add(7, 10);

let currentCount = countIntervals.count();
console.log(`Current Count: ${currentCount} (Expected: 6)`);

console.log("Adding [5, 8]");
countIntervals.add(5, 8);

currentCount = countIntervals.count();
console.log(`Current Count: ${currentCount} (Expected: 8)`);
