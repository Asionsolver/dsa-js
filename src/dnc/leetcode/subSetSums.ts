// 1982. Find Array Given Subset Sums

/**
Example 1:

Input: n = 3, sums = [-3,-2,-1,0,0,1,2,3]
Output: [1,2,-3]
Explanation: [1,2,-3] is able to achieve the given subset sums:
- []: sum is 0
- [1]: sum is 1
- [2]: sum is 2
- [1,2]: sum is 3
- [-3]: sum is -3
- [1,-3]: sum is -2
- [2,-3]: sum is -1
- [1,2,-3]: sum is 0
Note that any permutation of [1,2,-3] and also any permutation of [-1,-2,3] will also be accepted.
Example 2:

Input: n = 2, sums = [0,0,0,0]
Output: [0,0]
Explanation: The only correct answer is [0,0].
Example 3:

Input: n = 4, sums = [0,0,5,5,4,-1,4,9,9,-1,4,3,4,8,3,8]
Output: [0,-1,4,5]
Explanation: [0,-1,4,5] is able to achieve the given subset sums.

 */

const n = 4,
  sums = [0, 0, 5, 5, 4, -1, 4, 9, 9, -1, 4, 3, 4, 8, 3, 8];

function recoverArray(n: number, sums: number[]): number[] {
  // Sort the sums in ascending order
  sums.sort((a, b) => a - b);
  const result: number[] = [];

  // Iterate n times to find n elements
  for (let i = 0; i < n; i++) {
    const m = sums.length;

    // The difference between the two smallest subset sums represents
    // the absolute value of one of the original numbers.
    // Since sums is sorted, sums[0] is the smallest and sums[1] is the second smallest.
    const d = sums[1] - sums[0];

    const left: number[] = [];
    const right: number[] = [];
    const used: boolean[] = new Array(m).fill(false);
    let zeroInLeft = false;

    let k = 0; // Pointer for finding the pair (x + d)

    // Split the current sums into two partitions:
    // 'left' containing x, and 'right' containing x + d
    for (let j = 0; j < m; j++) {
      // If this index is already used as a pair for a previous element, skip it
      if (used[j]) continue;

      // Calculate target value to pair with sums[j]
      const target = sums[j] + d;

      // Advance pointer k to find the target
      if (k <= j) k = j + 1;
      while (k < m && (used[k] || sums[k] < target)) {
        k++;
      }

      // If pair is found
      if (k < m && sums[k] === target) {
        used[k] = true;
        left.push(sums[j]);
        right.push(sums[k]);

        // Check if 0 exists in the 'left' partition
        if (sums[j] === 0) {
          zeroInLeft = true;
        }
      }
    }

    // Determine the sign of the recovered number.
    // A valid set of subset sums must always contain 0 (for the empty set).
    if (zeroInLeft) {
      // If 0 is in 'left', it means 'left' is the valid subset sums array
      // for the remaining numbers. Therefore, we added +d to get 'right'.
      result.push(d);
      sums = left;
    } else {
      // If 0 is not in 'left', then 'right' must contain 0.
      // 'right' is the valid subset sums array.
      // To get 'left', we essentially added -d (subtracted d) to 'right'.
      result.push(-d);
      sums = right;
    }
  }

  return result;
}

console.log(recoverArray(n, sums));
