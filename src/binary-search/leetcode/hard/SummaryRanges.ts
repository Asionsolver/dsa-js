// 352. Data Stream as Disjoint Intervals

/**
Example 1:

Input
["SummaryRanges", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals"]
[[], [1], [], [3], [], [7], [], [2], [], [6], []]
Output
[null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]

Explanation
SummaryRanges summaryRanges = new SummaryRanges();
summaryRanges.addNum(1);      // arr = [1]
summaryRanges.getIntervals(); // return [[1, 1]]
summaryRanges.addNum(3);      // arr = [1, 3]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3]]
summaryRanges.addNum(7);      // arr = [1, 3, 7]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3], [7, 7]]
summaryRanges.addNum(2);      // arr = [1, 2, 3, 7]
summaryRanges.getIntervals(); // return [[1, 3], [7, 7]]
summaryRanges.addNum(6);      // arr = [1, 2, 3, 6, 7]
summaryRanges.getIntervals(); // return [[1, 3], [6, 7]]

*/

class SummaryRanges {
  private intervals: number[][];

  constructor() {
    this.intervals = [];
  }

  addNum(value: number): void {
    let left = 0,
      right = this.intervals.length - 1;
    let mid = 0;

    // Binary search to find the insert position
    while (left <= right) {
      mid = (left + right) >>> 1;
      if (this.intervals[mid][0] === value) return; // Value already exists as the start of an interval

      if (this.intervals[mid][0] < value) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    const prev = left - 1;
    const next = left;

    // Check if value is already fully engulfed inside the previous interval
    if (prev >= 0 && this.intervals[prev][1] >= value) {
      return;
    }

    const mergedPrev = prev >= 0 && this.intervals[prev][1] === value - 1;
    const mergedNext =
      next < this.intervals.length && this.intervals[next][0] === value + 1;

    if (mergedPrev && mergedNext) {
      // Value perfectly bridges the prev and next intervals
      this.intervals[prev][1] = this.intervals[next][1];
      this.intervals.splice(next, 1);
    } else if (mergedPrev) {
      // Value extends the prev interval
      this.intervals[prev][1] = value;
    } else if (mergedNext) {
      // Value prepends to the next interval
      this.intervals[next][0] = value;
    } else {
      // Value stands alone as a new interval
      this.intervals.splice(left, 0, [value, value]);
    }
  }

  getIntervals(): number[][] {
    return this.intervals;
  }
}

// Example usage:
const summaryRanges = new SummaryRanges();
summaryRanges.addNum(1);
console.log(summaryRanges.getIntervals()); // [[1, 1]]
summaryRanges.addNum(3);
console.log(summaryRanges.getIntervals()); // [[1, 1], [3, 3]]
summaryRanges.addNum(7);
console.log(summaryRanges.getIntervals()); // [[1, 1], [3, 3], [7, 7]]
summaryRanges.addNum(2);
console.log(summaryRanges.getIntervals()); // [[1, 3], [7, 7]]
summaryRanges.addNum(6);
console.log(summaryRanges.getIntervals()); // [[1, 3], [6, 7]]
