// 1871. Jump Game VII

/**
Example 1:

Input: s = "011010", minJump = 2, maxJump = 3
Output: true
Explanation:
In the first step, move from index 0 to index 3. 
In the second step, move from index 3 to index 5.
Example 2:

Input: s = "01101110", minJump = 2, maxJump = 3
Output: false
*/

// function canReach(s: string, minJump: number, maxJump: number): boolean {
//   const n = s.length;

//   // Quick early-exit: If the last character is '1', it can never be reached.
//   if (s[n - 1] === "1") {
//     return false;
//   }

//   // Using Uint8Array is highly memory efficient and slightly faster than standard arrays for boolean 1/0 tracking.
//   const dp = new Uint8Array(n);
//   dp[0] = 1; // Base case: Starting position is always reachable.

//   let activeJumps = 0;

//   for (let i = 1; i < n; i++) {
//     // Add the jump origin that just entered our[i - maxJump, i - minJump] window boundary
//     if (i >= minJump) {
//       activeJumps += dp[i - minJump];
//     }

//     // Remove the jump origin that just exited our[i - maxJump, i - minJump] window boundary
//     if (i > maxJump) {
//       activeJumps -= dp[i - maxJump - 1];
//     }

//     // If current spot is '0' and we have at least one valid previous step to jump from
//     if (s[i] === "0" && activeJumps > 0) {
//       dp[i] = 1;
//     }
//   }

//   return dp[n - 1] === 1;
// }

function canReach(s: string, minJump: number, maxJump: number): boolean {
  const n = s.length;

  // 49 is the ASCII code for '1'. It is never possible to reach if the last character is '1'.
  if (s.charCodeAt(n - 1) === 49) {
    return false;
  }

  // Bitset usage: Uint32Array to reduce memory by 8 times
  // For size n, (n / 32) slots will be required.
  const dp = new Uint32Array((n + 31) >> 5);

  // Base case: We are at the first index (setting the 0th bit to 1)
  dp[0] = 1;

  let reachableCount = 0;

  for (let i = 1; i < n; i++) {
    // Entering new index into window
    if (i >= minJump) {
      const prev = i - minJump;
      // Checking bit: whether bit 1 is present in prev position in dp array or not
      if (((dp[prev >> 5] >>> (prev & 31)) & 1) === 1) {
        reachableCount++;
      }
    }

    // Index is being removed from the window
    if (i > maxJump) {
      const prev = i - maxJump - 1;
      if (((dp[prev >> 5] >>> (prev & 31)) & 1) === 1) {
        reachableCount--;
      }
    }

    // 48 is the ASCII code for '0'.
    if (s.charCodeAt(i) === 48 && reachableCount > 0) {
      // If it is possible to reach the i-th index, we set the bit at that position to 1
      dp[i >> 5] |= 1 << (i & 31);
    }
  }

  // Returning whether the last index bit is 1 or not
  return ((dp[(n - 1) >> 5] >>> ((n - 1) & 31)) & 1) === 1;
}

// Test cases
console.log(canReach("011010", 2, 3)); // Output: true
console.log(canReach("01101110", 2, 3)); // Output: false
