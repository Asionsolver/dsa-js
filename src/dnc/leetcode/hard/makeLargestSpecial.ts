// 761. Special Binary String

/**
Example 1:

Input: s = "11011000"
Output: "11100100"
Explanation: The strings "10" [occuring at s[1]] and "1100" [at s[3]] are swapped.
This is the lexicographically largest string possible after some number of swaps.
Example 2:

Input: s = "10"
Output: "10"

*/

const s = "10";
const makeLargestSpecial = function (s: string): string {
  const substrings: string[] = [];
  let count = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    // '1' is equivalent to '(' and '0' to ')'
    if (s[i] === "1") {
      count++;
    } else {
      count--;
    }

    // When count is 0, we have found a primitive special substring
    if (count === 0) {
      // Extract the inner part (excluding the outer '1' and '0')
      // s.substring(start + 1, i) gets characters from index start+1 up to i-1
      const inner = s.substring(start + 1, i);

      // Recursively optimize the inner part, then wrap it back with '1' and '0'
      substrings.push("1" + makeLargestSpecial(inner) + "0");

      // Move the start pointer to the beginning of the next chunk
      start = i + 1;
    }
  }

  // Sort the processed substrings in descending order to make the result lexicographically largest
  substrings.sort((a, b) => b.localeCompare(a));

  // Join the sorted substrings
  return substrings.join("");
};

console.log(makeLargestSpecial(s));
