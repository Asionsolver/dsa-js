// 898. Bitwise ORs of Subarrays

/**

Example 1:

Input: arr = [0]
Output: 1
Explanation: There is only one possible result: 0.
Example 2:

Input: arr = [1,1,2]
Output: 3
Explanation: The possible subarrays are [1], [1], [2], [1, 1], [1, 2], [1, 1, 2].
These yield the results 1, 1, 2, 1, 3, 3.
There are 3 unique values, so the answer is 3.
Example 3:

Input: arr = [1,2,4]
Output: 6
Explanation: The possible results are 1, 2, 3, 4, 6, and 7.
*/

function subarrayBitwiseORs(arr: number[]): number {
  const res = new Set<number>();
  let cur: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    // nextCur will store the distinct bitwise ORs of subarrays ending at the current index 'i'
    const nextCur: number[] = [num];
    res.add(num);

    // Loop through the previously maintained ORs and expand them with the current number
    for (let j = 0; j < cur.length; j++) {
      const newVal = cur[j] | num;

      // Since the number of set bits strictly increases, any identical bitwise ORs
      // will be computed consecutively. We just check the last element to prevent dupes.
      if (newVal !== nextCur[nextCur.length - 1]) {
        nextCur.push(newVal);
        res.add(newVal);
      }
    }

    // Move to the next sequence state
    cur = nextCur;
  }

  return res.size;
}

// example cases
console.log(subarrayBitwiseORs([0])); // 1
console.log(subarrayBitwiseORs([1, 1, 2])); // 3
console.log(subarrayBitwiseORs([1, 2, 4])); // 6
