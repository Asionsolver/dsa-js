// Product array puzzle(gfg)
/**

Given an array, arr[] construct a product array, res[] where each element in res[i] is the product of all elements in arr[] except arr[i]. Return this resultant array, res[].
Note: Each element is res[] lies inside the 32-bit integer range.

Examples:

Input: arr[] = [10, 3, 5, 6, 2]
Output: [180, 600, 360, 300, 900]
Explanation: For i=0, res[i] = 3 * 5 * 6 * 2 is 180.
For i = 1, res[i] = 10 * 5 * 6 * 2 is 600.
For i = 2, res[i] = 10 * 3 * 6 * 2 is 360.
For i = 3, res[i] = 10 * 3 * 5 * 2 is 300.
For i = 4, res[i] = 10 * 3 * 5 * 6 is 900.
Input: arr[] = [12, 0]
Output: [0, 12]
Explanation: For i = 0, res[i] is 0.
For i = 1, res[i] is 12.


Constraints:
2 <= arr.size() <= 105
-100 <= arr[i] <= 100
*/

// const arr = [10, 3, 5, 6, 2];
const arr = [-1, 1, 0, -3, 3];
const productExceptSelf = function (arr: number[]) {
  let prefix = [];
  let suffix = [];

  // calculate prefix array
  prefix[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] * arr[i];
  }

  // calculate suffix array
  suffix[arr.length - 1] = arr[arr.length - 1];
  for (let i = arr.length - 2; i >= 0; i--) {
    suffix[i] = arr[i] * suffix[i + 1];
  }

  // console.log(prefix);
  // console.log(suffix);

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      arr[i] = suffix[i + 1];
    } else if (i === arr.length - 1) {
      arr[i] = prefix[i - 1];
    } else {
      arr[i] = prefix[i - 1] * suffix[i + 1];
    }
  }
  return arr;
};

console.log(productExceptSelf(arr));
