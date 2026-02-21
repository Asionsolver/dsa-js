// 762. Prime Number of Set Bits in Binary Representation

/**
Example 1:

Input: left = 6, right = 10
Output: 4
Explanation:
6  -> 110 (2 set bits, 2 is prime)
7  -> 111 (3 set bits, 3 is prime)
8  -> 1000 (1 set bit, 1 is not prime)
9  -> 1001 (2 set bits, 2 is prime)
10 -> 1010 (2 set bits, 2 is prime)
4 numbers have a prime number of set bits.
Example 2:

Input: left = 10, right = 15
Output: 5
Explanation:
10 -> 1010 (2 set bits, 2 is prime)
11 -> 1011 (3 set bits, 3 is prime)
12 -> 1100 (2 set bits, 2 is prime)
13 -> 1101 (3 set bits, 3 is prime)
14 -> 1110 (3 set bits, 3 is prime)
15 -> 1111 (4 set bits, 4 is not prime)
5 numbers have a prime number of set bits.
*/

const left = 6,
  right = 10;

const countPrimeSetBits = function (left: number, right: number): number {
  let count = 0;

  // A bitmask representing prime numbers up to 20.
  // The k-th bit is set to 1 if k is a prime number.
  // Indices: 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 0
  // Values :  1  0  1  0  0  0  1  0  1  0 0 0 1 0 1 0 1 1 0 0
  // Binary: 101000101000101010101100 = 665772 (decimal)
  const primeMask = 665772;

  for (let i = left; i <= right; i++) {
    let n = i;
    let setBits = 0;

    // Brian Kernighan's Algorithm
    // Counts only the set bits (faster than looping all 32 bits)
    while (n > 0) {
      n &= n - 1;
      setBits++;
    }

    // Check if the 'setBits'-th bit is set in our primeMask
    if ((primeMask >> setBits) & 1) {
      count++;
    }
  }

  return count;
};

console.log(countPrimeSetBits(left, right));
