// 1927. Sum Game

/**
Alice and Bob take turns playing a game, with Alice starting first.

You are given a string num of even length consisting of digits and '?' characters. On each turn, a player will do the following if there is still at least one '?' in num:

Choose an index i where num[i] == '?'.
Replace num[i] with any digit between '0' and '9'.
The game ends when there are no more '?' characters in num.

For Bob to win, the sum of the digits in the first half of num must be equal to the sum of the digits in the second half. For Alice to win, the sums must not be equal.

For example, if the game ended with num = "243801", then Bob wins because 2+4+3 = 8+0+1. If the game ended with num = "243803", then Alice wins because 2+4+3 != 8+0+3.
Assuming Alice and Bob play optimally, return true if Alice will win and false if Bob will win.
*/

/**
Example 1:

Input: num = "5023"
Output: false
Explanation: There are no moves to be made.
The sum of the first half is equal to the sum of the second half: 5 + 0 = 2 + 3.
Example 2:

Input: num = "25??"
Output: true
Explanation: Alice can replace one of the '?'s with '9' and it will be impossible for Bob to make the sums equal.
Example 3:

Input: num = "?3295???"
Output: false
Explanation: It can be proven that Bob will always win. One possible outcome is:
- Alice replaces the first '?' with '9'. num = "93295???".
- Bob replaces one of the '?' in the right half with '9'. num = "932959??".
- Alice replaces one of the '?' in the right half with '2'. num = "9329592?".
- Bob replaces the last '?' in the right half with '7'. num = "93295927".
Bob wins because 9 + 3 + 2 + 9 = 5 + 9 + 2 + 7.
*/

/**
Constraints:

2 <= num.length <= 105
num.length is even.
num consists of only digits and '?'.
 */

function sumGame(num: string): boolean {
  const n = num.length;
  let sumL = 0,
    qL = 0;
  let sumR = 0,
    qR = 0;

  // Iterate through the first half.

  for (let i = 0; i < n / 2; i++) {
    if (num[i] === "?") {
      qL++;
    } else {
      sumL += parseInt(num[i]);
    }
  }

  // Iterate through the second half.

  for (let i = n / 2; i < n; i++) {
    if (num[i] === "?") {
      qR++;
    } else {
      sumR += parseInt(num[i]);
    }
  }

  // Bob wins only if the sum difference is exactly balanced by the '?' difference.
  // Each pair of extra '?' on one side can be forced by Bob to contribute exactly 9.
  // So, every single '?' must effectively contribute 4.5.

  return sumL - sumR !== (qR - qL) * 4.5;
}

// Example usage:
console.log(sumGame("5023")); // Output: false
console.log(sumGame("25??")); // Output: true
console.log(sumGame("?3295???")); // Output: false
