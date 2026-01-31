// 744. Find Smallest Letter Greater Than Target

/**
Example 1:

Input: letters = ["c","f","j"], target = "a"
Output: "c"
Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.
Example 2:

Input: letters = ["c","f","j"], target = "c"
Output: "f"
Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.
Example 3:

Input: letters = ["x","x","y","y"], target = "z"
Output: "x"
Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].
*/

const letters = ["c", "f", "j"],
  target = "a";

const nextGreatestLetter = function (
  letters: string[],
  target: string,
): string {
  let left: number = 0;
  let right: number = letters.length - 1;

  while (left <= right) {
    const mid: number = Math.floor(left + (right - left) / 2);

    if (letters[mid] > target) {
      // If mid is greater, we search the left half to see if
      // there is an even smaller character that is still greater than target.
      right = mid - 1;
    } else {
      // If mid is less than or equal to target, we must search the right half.
      left = mid + 1;
    }
  }

  // The 'left' pointer represents the index of the smallest character greater than target.
  // If 'left' equals letters.length (target is larger than everything),
  // the modulo operator % wraps it back to index 0.
  return letters[left % letters.length];
};

console.log(nextGreatestLetter(letters, target));
