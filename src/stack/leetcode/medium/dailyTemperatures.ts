// 739. Daily Temperatures

/**
Example 1:

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Example 2:

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
Example 3:

Input: temperatures = [30,60,90]
Output: [1,1,0]

*/

const temperatures = [30, 40, 50, 60];
const dailyTemperatures = function (temperatures: number[]): number[] {
  const n = temperatures.length;
  // Initialize the result array with 0s.
  // If we never find a warmer day, the value remains 0.
  const answer: number[] = new Array(n).fill(0);

  // Stack stores the *indices* of the days.
  // It will be a monotonically decreasing stack based on temperature values.
  const stack: number[] = [];

  for (let i = 0; i < n; i++) {
    const currentTemp = temperatures[i];

    // While the stack is not empty AND the current temperature is warmer
    // than the temperature at the index stored at the top of the stack:
    while (
      stack.length > 0 &&
      currentTemp > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop()!;

      // The wait time is the difference between the current index
      // and the previous index.
      answer[prevIndex] = i - prevIndex;
    }

    // Push the current index onto the stack to wait for a warmer day
    stack.push(i);
  }

  return answer;
};

console.log(dailyTemperatures(temperatures));
