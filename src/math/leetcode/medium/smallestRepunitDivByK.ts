// 1015. Smallest Integer Divisible by K

/**

Example 1:

Input: k = 1
Output: 1
Explanation: The smallest answer is n = 1, which has length 1.
Example 2:

Input: k = 2
Output: -1
Explanation: There is no such positive integer n divisible by 2.
Example 3:

Input: k = 3
Output: 3
Explanation: The smallest answer is n = 111, which has length 3.
*/
const k = 1;
const smallestRepunitDivByK = function (k: number) {
  // Edge case: Integers ending in 1 are odd and don't end in 0 or 5.
  // If k is divisible by 2 or 5, no number consisting of only 1s is divisible by k.
  if (k % 2 === 0 || k % 5 === 0) {
    return -1;
  }

  let remainder = 0;

  // According to the Pigeonhole Principle, if a solution exists,
  // it must be found within k iterations.
  for (let length = 1; length <= k; length++) {
    // Calculate the next number in the sequence (1, 11, 111...) mod k
    // Formula: current_num = previous_num * 10 + 1
    remainder = (remainder * 10 + 1) % k;

    if (remainder === 0) {
      return length;
    }
  }

  return -1;
};

console.log(smallestRepunitDivByK(k));
