// 1356. Sort Integers by The Number of 1 Bits

/**
Example 1:

Input: arr = [0,1,2,3,4,5,6,7,8]
Output: [0,1,2,4,8,3,5,6,7]
Explantion: [0] is the only integer with 0 bits.
[1,2,4,8] all have 1 bit.
[3,5,6] have 2 bits.
[7] has 3 bits.
The sorted array by bits is [0,1,2,4,8,3,5,6,7]
Example 2:

Input: arr = [1024,512,256,128,64,32,16,8,4,2,1]
Output: [1,2,4,8,16,32,64,128,256,512,1024]
Explantion: All integers have 1 bit in the binary representation, you should just sort them in ascending order.

*/

const arr = [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
const sortByBits = function (arr: number[]): number[] {
  // Helper function to count the number of 1s (Hamming Weight)
  const countSetBits = (n: number): number => {
    let count = 0;
    while (n > 0) {
      // Brian Kernighan's algorithm:
      // n & (n - 1) clears the rightmost set bit in each iteration.
      n = n & (n - 1);
      count++;
    }
    return count;
  };

  // Native sort with a custom comparator
  return arr.sort((a, b) => {
    const bitsA = countSetBits(a);
    const bitsB = countSetBits(b);

    // Primary criterion: Sort by number of 1 bits
    if (bitsA !== bitsB) {
      return bitsA - bitsB;
    }

    // Secondary criterion: Sort by integer value ascending
    return a - b;
  });
};

console.log(sortByBits(arr));
