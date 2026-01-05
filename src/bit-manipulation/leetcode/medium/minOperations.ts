// 2571. Minimum Operations to Reduce an Integer to 0

/**
Example 1:

Input: n = 39
Output: 3
Explanation: We can do the following operations:
- Add 20 = 1 to n, so now n = 40.
- Subtract 23 = 8 from n, so now n = 32.
- Subtract 25 = 32 from n, so now n = 0.
It can be shown that 3 is the minimum number of operations we need to make n equal to 0.
Example 2:

Input: n = 54
Output: 3
Explanation: We can do the following operations:
- Add 21 = 2 to n, so now n = 56.
- Add 23 = 8 to n, so now n = 64.
- Subtract 26 = 64 from n, so now n = 0.
So the minimum number of operations is 3.
*/
const n = 39;
const minOperations = function (n: number) {
  let operations = 0;

  // We process the number bit by bit.
  while (n > 0) {
    // If the least significant bit (LSB) is 0, we just shift right
    // because no operation is needed for a 0 bit.
    if ((n & 1) === 0) {
      n >>= 1;
    } else {
      // If the LSB is 1, we must perform an operation (+ or -).
      // We check the next bit to decide which is better.

      // If the next bit is also 1 (pattern ...11), it indicates a sequence of 1s.
      // Adding 1 is generally better here because it creates a carry
      // that clears the sequence.
      // Example: ...0111 + 1 = ...1000 (Turns three 1s into a single 1)
      if ((n & 2) === 2) {
        // Exception case: if n is exactly 3 (binary 11),
        // adding 1 -> 4 (requires 1 more op to clear), total 2.
        // subtracting 1 -> 2 (requires 1 more op to clear), total 2.
        // The greedy logic "add on 11" works fine, but standard bitwise
        // logic suggests adding creates a cleaner high bit.
        // Note: If we have 111 (7), add->8 (1 bit), sub->6 (2 bits). Add is strictly better.
        n++;
      } else {
        // If the next bit is 0 (pattern ...01), subtracting is better.
        // This clears the current bit without affecting higher bits significantly.
        // Conceptual: n--; but since we shift right immediately after,
        // we don't strictly need to modify n here, just count the op.
      }

      // We performed an operation (either add or subtract)
      operations++;

      // After the operation, the LSB is effectively handled (becomes 0),
      // so we shift right to process the next bit.
      n >>= 1;
    }
  }

  return operations;
};
console.log(minOperations(n));
