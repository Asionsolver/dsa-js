// 9. Palindrome Number

/**
Given an integer x, return true if x is a palindrome, and false otherwise.
*/

/**
Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
*/


/**
Constraints:

-231 <= x <= 231 - 1
 

Follow up: Could you solve it without converting the integer to a string?
*/
// Brute force approach: Convert the integer to a string and check if it reads the same forwards and backwards.
// function isPalindrome(x: number): boolean {
//     // Negative numbers are not palindromes.
//     if (x < 0) {
//         return false;
//     }

//     // Convert the integer into a string.
//     const str = x.toString();

//     let left = 0;
//     let right = str.length - 1;

//     // Compare characters from both ends towards the center.
//     while (left < right) {
//         if (str[left] !== str[right]) {
//             return false;
//         }
//         left++;
//         right--;
//     }

//     // If all corresponding characters match, it is a palindrome.
//     return true;
// };


// Optimized approach: Reverse half of the number and compare it with the other half.
function isPalindrome(x: number): boolean {
    // Negative numbers and numbers ending with 0 (except 0 itself) cannot be palindromes.

    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }

    let reversedHalf = 0;

    // Process digits until we have reversed the second half of the number.

    while (x > reversedHalf) {
        // Extract the last digit and append it to reversedHalf.

        reversedHalf = (reversedHalf * 10) + (x % 10);

        // Remove the last digit from x.

        x = Math.floor(x / 10);
    }

    // For even length numbers: x === reversedHalf
    // For odd length numbers: x === Math.floor(reversedHalf / 10) to discard the middle digit.
    return x === reversedHalf || x === Math.floor(reversedHalf / 10);
};

// Example usage:
console.log(isPalindrome(121)); // Output: true
console.log(isPalindrome(-121)); // Output: false
console.log(isPalindrome(10)); // Output: false