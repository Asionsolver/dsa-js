// 125. Valid Palindrome

/**
Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
*/

function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    const leftCode = s.charCodeAt(left);
    const rightCode = s.charCodeAt(right);

    // If the left character is not alphanumeric, skip it
    if (!isAlphanumeric(leftCode)) {
      left++;
      continue;
    }

    // If the right character is not alphanumeric, skip it
    if (!isAlphanumeric(rightCode)) {
      right--;
      continue;
    }

    // Compare characters in lowercase
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

// Helper function to check if a character code represents an alphanumeric character
function isAlphanumeric(code: number): boolean {
  return (
    (code >= 48 && code <= 57) || // Numbers '0' - '9'
    (code >= 65 && code <= 90) || // Uppercase 'A' - 'Z'
    (code >= 97 && code <= 122) // Lowercase 'a' - 'z'
  );
}

// Example usage:
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Output: true
console.log(isPalindrome("race a car")); // Output: false
console.log(isPalindrome(" ")); // Output: true
