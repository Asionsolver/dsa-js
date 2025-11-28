import { it } from "node:test";
// Subarrays with equal 1s and 0s

/**
Given an array arr[] containing 0s and 1s. Count the number of subarrays having equal number of 0s and 1s. 

Examples:

Input: arr[] = [1, 0, 0, 1, 0, 1, 1]
Output: 8
Explanation: The index range for the 8 sub-arrays are: (0, 1), (2, 3), (0, 3), (3, 4), (4, 5) ,(2, 5), (0, 5), (1, 6)
Input: arr[] = [1, 1, 1, 1, 0]
Output: 1
Explanation: The index range for the subarray is (3,4).
Constraints:
1 ≤ arr.size() ≤ 105
0 ≤ arr[i] ≤ 1
*/

const arr = [1, 1, 1, 1, 0];
const countSubArrWithEqualZeroAndOne = function (arr: number[]) {
  const sumMap = new Map<number, number>();

  let sum = 0;
  let ans = 0;
  sumMap.set(0, 1);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      sum -= 1;
    } else {
      sum += 1;
    }

    if (sumMap.has(sum)) {
      ans += sumMap.get(sum)!;
      sumMap.set(sum, sumMap.get(sum)! + 1);
    } else {
      sumMap.set(sum, 1);
    }
  }
  return ans;
};

console.log(countSubArrWithEqualZeroAndOne(arr));
