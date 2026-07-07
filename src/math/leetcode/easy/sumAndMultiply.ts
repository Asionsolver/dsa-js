// 3754. Concatenate Non-Zero Digits and Multiply by Sum I

/**
Example 1:

Input: n = 10203004

Output: 12340

Explanation:

The non-zero digits are 1, 2, 3, and 4. Thus, x = 1234.
The sum of digits is sum = 1 + 2 + 3 + 4 = 10.
Therefore, the answer is x * sum = 1234 * 10 = 12340.
Example 2:

Input: n = 1000

Output: 1

Explanation:

The non-zero digit is 1, so x = 1 and sum = 1.
Therefore, the answer is x * sum = 1 * 1 = 1.
*/

function sumAndMultiply(n: number): number {
  const s = n.toString();
  let xStr = "";
  let sum = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char !== "0") {
      xStr += char;
      sum += Number(char);
    }
  }

  const x = xStr === "" ? 0 : Number(xStr);
  return x * sum;
}

// Example usage:
console.log(sumAndMultiply(10203004)); // Output: 12340
console.log(sumAndMultiply(1000)); // Output: 1
