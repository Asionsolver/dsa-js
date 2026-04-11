// 3347. Maximum Frequency of an Element After Performing Operations II

/**
Example 1:

Input: nums = [1,4,5], k = 1, numOperations = 2

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1], after which nums becomes [1, 4, 5].
Adding -1 to nums[2], after which nums becomes [1, 4, 4].
Example 2:

Input: nums = [5,11,20,20], k = 5, numOperations = 1

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1].

*/

const nums = [1, 4, 5];
const k = 1;
const numOperations = 2;

const maxFrequency = function (
  nums: number[],
  k: number,
  numOperations: number,
): number {
  const n = nums.length;
  // We store 3 events per number.
  const events = new Float64Array(n * 3);

  // An OFFSET is applied to guarantee strictly positive packed numbers
  // minimizing the risks of precision errors or negative modulo results.
  const OFFSET = 2000000000;

  for (let i = 0; i < n; i++) {
    const x = nums[i];

    // Pack coordinates and event types into the Float64Array
    // Math representation: (Coordinate + OFFSET) * 4 + type
    events[i * 3] = (x - k + OFFSET) * 4 + 1; // Type 1: START event
    events[i * 3 + 1] = (x + k + 1 + OFFSET) * 4 + 2; // Type 2: END event
    events[i * 3 + 2] = (x + OFFSET) * 4 + 0; // Type 0: NUM event
  }

  // Sort array in ascending order numerically (built-in fast TypedArray sort)
  events.sort();

  let max_freq = 0;
  let C = 0; // Count of overlapping intervals capable of reaching the current coordinate
  let i = 0;
  const len = events.length;

  while (i < len) {
    const val = events[i];
    const currentGroup = Math.floor(val / 4);

    let starts = 0;
    let ends = 0;
    let E = 0;

    // Aggregate all events that occur at the identical coordinate
    while (i < len) {
      const nextVal = events[i];
      const group = Math.floor(nextVal / 4);
      if (group !== currentGroup) break;

      const type = nextVal % 4;
      if (type === 1) starts++;
      else if (type === 2) ends++;
      else if (type === 0) E++; // Exact target value frequency count natively

      i++;
    }

    // Include freshly started intervals matching scope
    C += starts;
    // Subtract elapsed/concluded intervals
    C -= ends;

    // For the present coordinate scope `currentGroup`, resolve its viability
    const current_freq = Math.min(C, E + numOperations);
    if (current_freq > max_freq) {
      max_freq = current_freq;
    }
  }

  return max_freq;
};

console.log(maxFrequency(nums, k, numOperations));
