// 3315. Construct the Minimum Bitwise Array II

/**
Example 1:

Input: nums = [2,3,5,7]

Output: [-1,1,4,3]

Explanation:

For i = 0, as there is no value for ans[0] that satisfies ans[0] OR (ans[0] + 1) = 2, so ans[0] = -1.
For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 3 is 1, because 1 OR (1 + 1) = 3.
For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 5 is 4, because 4 OR (4 + 1) = 5.
For i = 3, the smallest ans[3] that satisfies ans[3] OR (ans[3] + 1) = 7 is 3, because 3 OR (3 + 1) = 7.
Example 2:

Input: nums = [11,13,31]

Output: [9,12,15]

Explanation:

For i = 0, the smallest ans[0] that satisfies ans[0] OR (ans[0] + 1) = 11 is 9, because 9 OR (9 + 1) = 11.
For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 13 is 12, because 12 OR (12 + 1) = 13.
For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 31 is 15, because 15 OR (15 + 1) = 31.

*/

const nums = [2, 3, 5, 7];

/** good solution
function constructMinimumBitwiseArrayII(nums: number[]): number[] {
    const ans: number[] = [];
    
    for (const num of nums) {
        if (num === 2) {
            // 2 is even, and x | (x + 1) is always odd.
            ans.push(-1);
        } else {
            // num is an odd prime.
            // We find the lowest set bit of num + 1, which corresponds to 
            // the bit just above the trailing ones of num.
            // value = 2^m where m is the number of trailing ones in num.
            const nextNum = num + 1;
            const lsb = nextNum & -nextNum;
            
            // We want to flip the (m-1)-th bit of num to 0.
            // This is equivalent to subtracting 2^(m-1).
            // 2^(m-1) is lsb >> 1.
            ans.push(num - (lsb >>> 1));
        }
    }
    
    return ans;
}
 */
const minBitwiseArray = function (nums: number[]): number[] {
  return nums.map((n) => {
    // Since x | (x + 1) is always odd, no solution exists for the even prime 2.
    if (n === 2) {
      return -1;
    }

    // Count the length of the trailing block of 1s in the binary representation of n.
    let k = 0;
    while ((n & (1 << k)) !== 0) {
      k++;
    }

    // Flip the most significant bit of the trailing 1s block.
    // This corresponds to subtracting 2^(k-1) from n.
    return n - (1 << (k - 1));
  });
};

console.log(minBitwiseArray(nums));
