// 3572. Maximize Y‑Sum by Picking a Triplet of Distinct X‑Values

/**
Example 1:

Input: x = [1,2,1,3,2], y = [5,3,4,6,2]

Output: 14

Explanation:

Choose i = 0 (x[i] = 1, y[i] = 5), j = 1 (x[j] = 2, y[j] = 3), k = 3 (x[k] = 3, y[k] = 6).
All three values chosen from x are distinct. 5 + 3 + 6 = 14 is the maximum we can obtain. Hence, the output is 14.
Example 2:

Input: x = [1,2,1,2], y = [4,5,6,7]

Output: -1

Explanation:

There are only two distinct values in x. Hence, the output is -1.
*/

const x = [1, 2, 1, 3, 2],
  y = [5, 3, 4, 6, 2];

const maxSumDistinctTriplet = function (x: number[], y: number[]) {
  // Map to store the maximum y value for each distinct x value.
  // Key: x value, Value: maximum y associated with that x.
  const maxYForX = new Map<number, number>();
  const n = x.length;

  // Iterate through the arrays to find the best y for each unique x
  for (let i = 0; i < n; i++) {
    const cx = x[i];
    const cy = y[i];

    // If we haven't seen this x, or if the current y is bigger than the previous max for this x
    const existingY = maxYForX.get(cx);
    if (existingY === undefined || cy > existingY) {
      maxYForX.set(cx, cy);
    }
  }

  // If we have fewer than 3 distinct x values, we cannot satisfy the condition
  if (maxYForX.size < 3) {
    return -1;
  }

  // Extract all the candidate y values
  const candidates = Array.from(maxYForX.values());

  // Sort descending to find the largest 3 values
  // Since we only kept the max y for each unique x, picking any 3 here
  // guarantees distinct x values.
  candidates.sort((a, b) => b - a);

  // Sum the top 3
  return candidates[0] + candidates[1] + candidates[2];
};
console.log(maxSumDistinctTriplet(x, y));
