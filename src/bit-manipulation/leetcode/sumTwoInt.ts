// 371. Sum of Two Integers
// Given two integers a and b, return the sum of the two integers without using the operators + and -.

/**
Example 1:

Input: a = 1, b = 2
Output: 3
Example 2:

Input: a = 2, b = 3
Output: 5
 */
const a = 1,
  b = 2;
const getSum = function (a: number, b: number) {
  let carry = a & b;
  let sumWithoutCarry = a ^ b;
  let actualCarry = carry << 1;

  while (carry !== 0) {
    carry = sumWithoutCarry & actualCarry;
    sumWithoutCarry = sumWithoutCarry ^ actualCarry;
    actualCarry = carry << 1;
  }

  return sumWithoutCarry;
};

console.log(getSum(a, b));
