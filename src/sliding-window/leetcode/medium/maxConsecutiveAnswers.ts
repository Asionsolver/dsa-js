// 2024. Maximize the Confusion of an Exam

/**
Example 1:

Input: answerKey = "TTFF", k = 2
Output: 4
Explanation: We can replace both the 'F's with 'T's to make answerKey = "TTTT".
There are four consecutive 'T's.
Example 2:

Input: answerKey = "TFFT", k = 1
Output: 3
Explanation: We can replace the first 'T' with an 'F' to make answerKey = "FFFT".
Alternatively, we can replace the second 'T' with an 'F' to make answerKey = "TFFF".
In both cases, there are three consecutive 'F's.
Example 3:

Input: answerKey = "TTFTTFTT", k = 1
Output: 5
Explanation: We can replace the first 'F' to make answerKey = "TTTTTFTT"
Alternatively, we can replace the second 'F' to make answerKey = "TTFTTTTT". 
In both cases, there are five consecutive 'T's.
*/

function maxConsecutiveAnswers(answerKey: string, k: number): number {
  let maxLen = 0;
  let countT = 0;
  let countF = 0;
  let left = 0;

  for (let right = 0; right < answerKey.length; right++) {
    // Expand the window by including the character at the `right` pointer
    if (answerKey[right] === "T") {
      countT++;
    } else {
      countF++;
    }

    // If the minority character count exceeds k, the window is invalid.
    // Shrink the window from the left until it becomes valid again.
    while (Math.min(countT, countF) > k) {
      if (answerKey[left] === "T") {
        countT--;
      } else {
        countF--;
      }
      left++;
    }

    // Calculate the maximum valid window size
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// Test cases
console.log(maxConsecutiveAnswers("TTFF", 2)); // Output: 4
console.log(maxConsecutiveAnswers("TFFT", 1)); // Output: 3
console.log(maxConsecutiveAnswers("TTFTTFTT", 1)); // Output: 5
