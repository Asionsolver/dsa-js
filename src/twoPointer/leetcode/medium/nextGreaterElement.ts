// 556. Next Greater Element III

/**
Example 1:

Input: n = 12
Output: 21
Example 2:

Input: n = 21
Output: -1
*/
const n = 12;
const nextGreaterElement = function (n: number): number {
  // Convert number to an array of single-digit strings for manipulation
  const digits: string[] = n.toString().split("");
  const len: number = digits.length;

  // Step 1: Find the first digit from the right that is smaller than the one to its right
  let i: number = len - 2;
  while (i >= 0 && digits[i] >= digits[i + 1]) {
    i--;
  }

  // If no such index is found, the digits are in descending order (e.g., 321),
  // meaning no greater permutation is possible.
  if (i < 0) {
    return -1;
  }

  // Step 2: Find the smallest digit to the right of 'i' that is greater than digits[i].
  // Since the sequence to the right of 'i' is descending, we search from the end.
  let j: number = len - 1;
  while (j >= 0 && digits[j] <= digits[i]) {
    j--;
  }

  // Step 3: Swap digits at i and j
  [digits[i], digits[j]] = [digits[j], digits[i]];

  // Step 4: Reverse the sub-array to the right of i
  let left: number = i + 1;
  let right: number = len - 1;

  while (left < right) {
    [digits[left], digits[right]] = [digits[right], digits[left]];
    left++;
    right--;
  }

  // Step 5: Convert back to integer and check 32-bit constraints
  const result: number = parseInt(digits.join(""), 10);

  // 2^31 - 1 = 2147483647
  if (result > 2147483647) {
    return -1;
  }

  return result;
};

console.log(nextGreaterElement(n));
