// 2654. Minimum Number of Operations to Make All Array Elements Equal to 1

/**
Example 1:

Input: nums = [2,6,3,4]
Output: 4
Explanation: We can do the following operations:
- Choose index i = 2 and replace nums[2] with gcd(3,4) = 1. Now we have nums = [2,6,1,4].
- Choose index i = 1 and replace nums[1] with gcd(6,1) = 1. Now we have nums = [2,1,1,4].
- Choose index i = 0 and replace nums[0] with gcd(2,1) = 1. Now we have nums = [1,1,1,4].
- Choose index i = 2 and replace nums[3] with gcd(1,4) = 1. Now we have nums = [1,1,1,1].
Example 2:

Input: nums = [2,10,6,14]
Output: -1
Explanation: It can be shown that it is impossible to make all the elements equal to 1.

*/

const nums = [2, 6, 3, 4];

const minOperations = function (nums: number[]): number {
  const n = nums.length;

  // Helper function to compute GCD
  const gcd = (a: number, b: number): number => {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Step 1: Count existing 1s
  let onesCount = 0;
  for (const num of nums) {
    if (num === 1) {
      onesCount++;
    }
  }

  // If 1s exist, we just need to convert the non-1s.
  if (onesCount > 0) {
    return n - onesCount;
  }

  // Step 2: Find the shortest subarray with GCD 1
  let minOpsToMakeOne = Infinity;

  for (let i = 0; i < n; i++) {
    let currentGcd = nums[i];
    for (let j = i + 1; j < n; j++) {
      currentGcd = gcd(currentGcd, nums[j]);

      // If the subarray nums[i...j] has GCD 1
      if (currentGcd === 1) {
        // The cost to reduce this subarray to a single 1 is (j - i)
        minOpsToMakeOne = Math.min(minOpsToMakeOne, j - i);

        // Since we want the shortest subarray starting at i,
        // we break here as extending j will only increase the cost.
        break;
      }
    }
  }

  // Step 3: Return result or -1 if impossible
  if (minOpsToMakeOne === Infinity) {
    return -1;
  }

  // Total cost = Cost to make the first 1 + Cost to spread it to the other (n-1) elements
  return minOpsToMakeOne + (n - 1);
};

console.log(minOperations(nums));
