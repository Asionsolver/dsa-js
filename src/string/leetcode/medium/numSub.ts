// 1513. Number of Substrings With Only 1s

/**
Example 1:

Input: s = "0110111"
Output: 9
Explanation: There are 9 substring in total with only 1's characters.
"1" -> 5 times.
"11" -> 3 times.
"111" -> 1 time.
Example 2:

Input: s = "101"
Output: 2
Explanation: Substring "1" is shown 2 times in s.
Example 3:

Input: s = "111111"
Output: 21
Explanation: Each substring contains only 1's characters.
*/

const s = "0110111";

const numSub = function (s: string) {
  const MOD = 1_000_000_007;
  let total = 0;
  let currentRun = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      // Increment the current count of consecutive 1s
      currentRun++;
      // Add the current run to total (represents all new substrings ending at i)
      total = (total + currentRun) % MOD;
    } else {
      // Reset the counter when a '0' is encountered
      currentRun = 0;
    }
  }

  return total;
};

console.log(numSub(s));
