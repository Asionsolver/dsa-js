// 179. Largest Number
/**
Example 1:

Input: nums = [10,2]
Output: "210"
Example 2:

Input: nums = [3,30,34,5,9]
Output: "9534330"
*/

// const nums = [30, 3];
// const nums = [0];
const nums = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const largestNumber = function (nums: number[]) {
  const arr = nums.map(String);

  arr.sort((a, b) => {
    const t1 = a + b;
    const t2 = b + a;
    return t2.localeCompare(t1); // descending
  });

  // Edge-case: if all numbers are 0, the result should be "0"
  if (arr[0] === "0") return "0";
  return arr.join("");
};
console.log(largestNumber(nums));
