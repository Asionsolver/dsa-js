// 3867. Sum of GCD of Formed Pairs

/**
Example 1:

Input: nums = [2,6,4]

Output: 2

Explanation:

Construct prefixGcd:

i	nums[i]	mxi	prefixGcd[i]
0	2	2	2
1	6	6	6
2	4	6	2
prefixGcd = [2, 6, 2]. After sorting, it forms [2, 2, 6].

Pair the smallest and largest elements: gcd(2, 6) = 2. The remaining middle element 2 is ignored. Thus, the sum is 2.

Example 2:

Input: nums = [3,6,2,8]

Output: 5

Explanation:

Construct prefixGcd:

i	nums[i]	mxi	prefixGcd[i]
0	3	3	3
1	6	6	6
2	2	6	2
3	8	8	8
prefixGcd = [3, 6, 2, 8]. After sorting, it forms [2, 3, 6, 8].

Form pairs: gcd(2, 8) = 2 and gcd(3, 6) = 3. Thus, the sum is 2 + 3 = 5.
*/

function gcdSum(nums: number[]): number {
  const n = nums.length;
  const prefixGcd: number[] = new Array(n);
  let mx = 0;

  // Helper function to calculate the Greatest Common Divisor (GCD) using Euclidean Algorithm
  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Step 1: Construct prefixGcd
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    if (x > mx) {
      mx = x;
    }
    prefixGcd[i] = gcd(x, mx);
  }

  // Step 2: Sort prefixGcd in non-decreasing order
  prefixGcd.sort((a, b) => a - b);

  // Step 3 & 4: Form pairs and sum their GCDs
  let ans = 0;
  const limit = n >> 1; // n / 2 using bitwise right-shift for integer division
  for (let i = 0; i < limit; i++) {
    ans += gcd(prefixGcd[i], prefixGcd[n - 1 - i]);
  }

  return ans;
}

// Example usage:
console.log(gcdSum([2, 6, 4])); // Output: 2
console.log(gcdSum([3, 6, 2, 8])); // Output: 5
