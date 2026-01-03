// 2048. Next Greater Numerically Balanced Number

/**
Example 1:

Input: n = 1
Output: 22
Explanation: 
22 is numerically balanced since:
- The digit 2 occurs 2 times. 
It is also the smallest numerically balanced number strictly greater than 1.
Example 2:

Input: n = 1000
Output: 1333
Explanation: 
1333 is numerically balanced since:
- The digit 1 occurs 1 time.
- The digit 3 occurs 3 times. 
It is also the smallest numerically balanced number strictly greater than 1000.
Note that 1022 cannot be the answer because 0 appeared more than 0 times.
Example 3:

Input: n = 3000
Output: 3133
Explanation: 
3133 is numerically balanced since:
- The digit 1 occurs 1 time.
- The digit 3 occurs 3 times.
It is also the smallest numerically balanced number strictly greater than 3000.
*/

const n = 1;
const nextBeautifulNumber = function (n: number): number {
  let curr = n + 1;

  while (true) {
    if (isBalanced(curr)) {
      return curr;
    }
    curr++;
  }
};

function isBalanced(num: number): boolean {
  if (num === 0) return false;

  const counts = new Array(10).fill(0);
  let temp = num;

  while (temp > 0) {
    const digit = temp % 10;

    // A numerically balanced number cannot contain 0
    // because 0 would need to appear 0 times, but here it appears at least once.
    if (digit === 0) return false;

    counts[digit]++;

    // Optimization: If the count of a digit exceeds the digit's value,
    // it cannot be numerically balanced.
    if (counts[digit] > digit) return false;

    temp = Math.floor(temp / 10);
  }

  // Verify that every digit present has a count equal to its value
  for (let i = 1; i < 10; i++) {
    if (counts[i] > 0 && counts[i] !== i) {
      return false;
    }
  }

  return true;
}

console.log(nextBeautifulNumber(n));
