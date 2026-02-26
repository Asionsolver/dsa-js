// 1404. Number of Steps to Reduce a Number in Binary Representation to One

/**
Example 1:

Input: s = "1101"
Output: 6
Explanation: "1101" corressponds to number 13 in their decimal representation.
Step 1) 13 is odd, add 1 and obtain 14. 
Step 2) 14 is even, divide by 2 and obtain 7.
Step 3) 7 is odd, add 1 and obtain 8.
Step 4) 8 is even, divide by 2 and obtain 4.  
Step 5) 4 is even, divide by 2 and obtain 2. 
Step 6) 2 is even, divide by 2 and obtain 1.  
Example 2:

Input: s = "10"
Output: 1
Explanation: "10" corresponds to number 2 in their decimal representation.
Step 1) 2 is even, divide by 2 and obtain 1.  
Example 3:

Input: s = "1"
Output: 0
*/
const s = "1";
const numSteps = function (s: string): number {
  let steps = 0;
  let carry = 0;

  // Iterate backwards from the last bit to the second bit (index 1).
  // We stop at index 1 because index 0 is the Most Significant Bit (MSB).
  for (let i = s.length - 1; i > 0; i--) {
    const bit = Number(s[i]);

    // Check the value of the current bit plus any carry from previous operations
    if (bit + carry === 1) {
      // Case: (0 + 1) or (1 + 0) -> Odd number
      // Operation 1: Add 1 (result becomes even, next bit gets carry)
      // Operation 2: Divide by 2 (shift right)
      carry = 1;
      steps += 2;
    } else {
      // Case: (0 + 0) -> Even (0)
      // Case: (1 + 1) -> Even (2, which is '10' in binary, carries 1 to next)
      // Operation: Divide by 2 (shift right)
      // Note: If sum was 2, carry remains 1. If sum was 0, carry remains 0.
      steps += 1;
    }
  }

  // After the loop, we are at the MSB (index 0), which is always '1'.
  // If there is a carry, we have 1 + 1 = 10 (binary) -> need 1 more division step.
  // If there is no carry, we have 1 -> we are done.
  if (carry === 1) {
    steps++;
  }

  return steps;
};

console.log(numSteps(s));
