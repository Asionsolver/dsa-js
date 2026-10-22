// 3942. Minimum Operations to Sort a Permutation

/**
You are given an integer array nums of length n, where nums is a permutation of the integers from 0 to n - 1.

You may perform only the following operations:

Reverse the entire array.
Rotate Left by One: Move the first element to the end of the array, and rest elements to left by one position.
Return an integer denoting the minimum number of operations required to sort the array in increasing order. If it is not possible to sort the array using only the given operations, return -1.
*/

/**
Example 1:

Input: nums = [0,2,1]

Output: 2

Explanation:

Rotate Left by one: [2, 1, 0]
Reverse the array: [0, 1, 2]
The array becomes sorted in 2 operations, which is minimal

Example 2:

Input: nums = [1,0,2]

Output: 2

Explanation:

Reverse the array: [2, 0, 1]
Rotate Left by one: [0, 1, 2]
The array becomes sorted in 2 operations, which is minimal.

Example 3:

Input: nums = [2,0,1,3]

Output: -1

Explanation:

It is impossible to reach [2, 0, 1, 3]. Thus, the answer is -1.

*/

/**
Constraints:

1 <= n == nums.length <= 105
0 <= nums[i] <= n - 1
nums is a permutation of integers from 0 to n - 1.
*/

// Brute Force Approach: TLE
// function minOperations(nums: number[]): number {
//   const n = nums.length;

//   // Check if the array is already sorted.
//   const isSorted = (arr: number[]): boolean => {
//     for (let i = 0; i < n; i++) {
//       if (arr[i] !== i) return false;
//     }
//     return true;
//   };

//   if (isSorted(nums)) return 0;

//   // Queue for BFS storing [arrayState, steps].
//   const queue: [number[], number][] = [[nums, 0]];
//   const visited = new Set<string>();
//   visited.add(nums.join(","));

//   while (queue.length > 0) {
//     const [current, steps] = queue.shift()!;

//     // 1. Try Reverse operation.
//     const reversed = [...current].reverse();
//     if (isSorted(reversed)) return steps + 1;
//     const revKey = reversed.join(",");
//     if (!visited.has(revKey)) {
//       visited.add(revKey);
//       queue.push([reversed, steps + 1]);
//     }

//     // 2. Try Rotate Left by one operation.
//     const rotated = [...current.slice(1), current[0]];
//     if (isSorted(rotated)) return steps + 1;
//     const rotKey = rotated.join(",");
//     if (!visited.has(rotKey)) {
//       visited.add(rotKey);
//       queue.push([rotated, steps + 1]);
//     }
//   }

//   return -1;
// }

// Optimized Approach
function minOperations(nums: number[]): number {
  const n = nums.length;

  // Find the index of 0 in the permutation.
  let zeroIndex = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      zeroIndex = i;
      break;
    }
  }

  // Check if the array is cyclically increasing.
  let isIncreasing = true;
  for (let i = 0; i < n; i++) {
    if (nums[(zeroIndex + i) % n] !== i) {
      isIncreasing = false;
      break;
    }
  }

  // Check if the array is cyclically decreasing.
  let isDecreasing = true;
  for (let i = 0; i < n; i++) {
    if (nums[(zeroIndex - i + n) % n] !== i) {
      isDecreasing = false;
      break;
    }
  }

  let minOps = Infinity;

  // If cyclically increasing, calculate minimal operations.
  if (isIncreasing) {
    if (zeroIndex === 0) {
      // Already sorted.
      minOps = Math.min(minOps, 0);
    } else {
      // Option 1: Left rotate `zeroIndex` times.
      // Option 2: Reverse, left rotate (n - zeroIndex) times, reverse.
      const costOnlyLeft = zeroIndex;
      const costRightWithReverse = n - zeroIndex + 2;
      minOps = Math.min(minOps, Math.min(costOnlyLeft, costRightWithReverse));
    }
  }

  // If cyclically decreasing, calculate minimal operations.
  if (isDecreasing) {
    // Option 1: Rotate left then Reverse.
    // Option 2: Reverse then Rotate left.
    const costRotateThenRev = ((zeroIndex + 1) % n) + 1;
    const costRevThenRotate = n - zeroIndex;
    minOps = Math.min(minOps, Math.min(costRotateThenRev, costRevThenRotate));
  }

  // If neither condition is satisfied, it is impossible to sort.
  return minOps === Infinity ? -1 : minOps;
}
// Example usage:
console.log(minOperations([0, 2, 1])); // Output: 2
console.log(minOperations([1, 0, 2])); // Output: 2
console.log(minOperations([2, 0, 1, 3])); // Output: -1
