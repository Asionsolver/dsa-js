// 2121. Intervals Between Identical Elements

/**
Example 1:

Input: arr = [2,1,3,1,2,3,3]
Output: [4,2,7,2,4,4,5]
Explanation:
- Index 0: Another 2 is found at index 4. |0 - 4| = 4
- Index 1: Another 1 is found at index 3. |1 - 3| = 2
- Index 2: Two more 3s are found at indices 5 and 6. |2 - 5| + |2 - 6| = 7
- Index 3: Another 1 is found at index 1. |3 - 1| = 2
- Index 4: Another 2 is found at index 0. |4 - 0| = 4
- Index 5: Two more 3s are found at indices 2 and 6. |5 - 2| + |5 - 6| = 4
- Index 6: Two more 3s are found at indices 2 and 5. |6 - 2| + |6 - 5| = 5
Example 2:

Input: arr = [10,5,10,10]
Output: [5,0,3,4]
Explanation:
- Index 0: Two more 10s are found at indices 2 and 3. |0 - 2| + |0 - 3| = 5
- Index 1: There is only one 5 in the array, so its sum of intervals to identical elements is 0.
- Index 2: Two more 10s are found at indices 0 and 3. |2 - 0| + |2 - 3| = 3
- Index 3: Two more 10s are found at indices 0 and 2. |3 - 0| + |3 - 2| = 4
*/

const intervalArr = [2, 1, 3, 1, 2, 3, 3];
const getDistances = function (arr: number[]) {
  const map = new Map(); // value → [list of indices]
  const n = arr.length;
  const ans = new Array(n).fill(0);
  // Step 1: Group indices by value
  for (let i = 0; i < n; i++) {
    if (!map.has(arr[i])) map.set(arr[i], []);
    map.get(arr[i]).push(i);
  }
  // Step 2: For each group, calculate distances
  for (const [val, indices] of map.entries()) {
    const m = indices.length;
    if (m === 1) continue; // only one element → all 0
    // prefix sum
    const prefix = new Array(m).fill(0);
    prefix[0] = indices[0];
    for (let i = 1; i < m; i++) {
      prefix[i] = prefix[i - 1] + indices[i];
    }
    for (let i = 0; i < m; i++) {
      const idx = indices[i];
      const leftSum = i > 0 ? i * idx - prefix[i - 1] : 0;
      const rightSum = prefix[m - 1] - prefix[i] - (m - 1 - i) * idx;
      ans[idx] = leftSum + rightSum;
    }
  }
  return ans;
};

console.log(getDistances(intervalArr));
