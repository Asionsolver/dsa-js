// 43. Multiply Strings

/**
Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
*/
const num1 = "2",
  num2 = "3";
const multiply = function (num1: string, num2: string) {
  // Edge case: if either number is "0", the product is "0".
  if (num1 === "0" || num2 === "0") {
    return "0";
  }

  const m = num1.length;
  const n = num2.length;
  // The maximum length of the product is m + n.
  const pos: number[] = new Array(m + n).fill(0);

  // Iterate from the last digit to the first digit of both numbers
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      // Multiply the current digits
      const mul = Number(num1[i]) * Number(num2[j]);

      // Define positions in the result array
      // p1 is the position for the carry, p2 is the position for the current digit
      const p1 = i + j;
      const p2 = i + j + 1;

      // Add the product to the existing value at p2 (which might contain carry from the right)
      const sum = mul + pos[p2];

      // Update p2 with the last digit of sum
      pos[p2] = sum % 10;

      // Add the carry to p1
      pos[p1] += Math.floor(sum / 10);
    }
  }

  // Convert the array to a string
  // The array might have a leading zero (e.g., 2 * 3 = 6 -> [0, 6])
  let result = "";

  // We can simply join the array and verify leading zeros,
  // or iterate to skip them.
  for (let p of pos) {
    // Skip leading zeros
    if (!(result.length === 0 && p === 0)) {
      result += p;
    }
  }

  // If result string is empty after loop (shouldn't happen due to initial "0" check,
  // but good for safety), return "0"
  return result.length === 0 ? "0" : result;
};
console.log(multiply(num1, num2));
