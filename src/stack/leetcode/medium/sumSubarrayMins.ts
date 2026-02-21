// 907. Sum of Subarray Minimums

/**
Example 1:

Input: arr = [3,1,2,4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.
Example 2:

Input: arr = [11,81,94,43,3]
Output: 444


*/

const arr = [11, 81, 94, 43, 3];

const sumSubarrayMins = function (arr: number[]): number {
  const MOD = 1e9 + 7;
  const n = arr.length;

  // Arrays to store the index of the Previous Less Element and Next Less Element
  // We use Int32Array for better memory performance, though standard arrays work too.
  const left = new Int32Array(n);
  const right = new Int32Array(n);
  const stack: number[] = [];

  // 1. Find Previous Less Element (Left)
  // We look for the index of the first element to the left that is strictly smaller.
  for (let i = 0; i < n; i++) {
    // While stack is not empty and top element is >= current, pop it.
    // This maintains the stack with increasing values (or indices of increasing values).
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    // If stack is not empty, the top is the PLE. Otherwise, -1 (boundary).
    left[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
    stack.push(i);
  }

  // Clear stack for the next pass
  stack.length = 0;

  // 2. Find Next Less Element (Right)
  // We look for the index of the first element to the right that is smaller or equal.
  // Using 'smaller or equal' (>) for popping here vs 'strictly smaller' (>=) in the left pass
  // ensures we handle duplicates correctly without double counting.
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
      stack.pop();
    }
    // If stack is not empty, top is NLE. Otherwise, n (boundary).
    right[i] = stack.length > 0 ? stack[stack.length - 1] : n;
    stack.push(i);
  }

  // 3. Calculate Total Sum
  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    // Distance to the left boundary
    const countLeft = i - left[i];
    // Distance to the right boundary
    const countRight = right[i] - i;

    // Total subarrays where arr[i] is minimum = countLeft * countRight
    // Contribution = value * count
    // Note: JS numbers (doubles) can safely hold integer values up to 9e15.
    // Max intermediate value here is approx 30000^3 ~ 2.7e13, so no overflow before modulo.
    const contribution = (countLeft * countRight * arr[i]) % MOD;
    totalSum = (totalSum + contribution) % MOD;
  }

  return totalSum;
};

console.log(sumSubarrayMins(arr));
