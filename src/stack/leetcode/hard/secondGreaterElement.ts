// 2454. Next Greater Element IV

/**
Example 1:

Input: nums = [2,4,0,9,6]
Output: [9,6,6,-1,-1]
Explanation:
0th index: 4 is the first integer greater than 2, and 9 is the second integer greater than 2, to the right of 2.
1st index: 9 is the first, and 6 is the second integer greater than 4, to the right of 4.
2nd index: 9 is the first, and 6 is the second integer greater than 0, to the right of 0.
3rd index: There is no integer greater than 9 to its right, so the second greater integer is considered to be -1.
4th index: There is no integer greater than 6 to its right, so the second greater integer is considered to be -1.
Thus, we return [9,6,6,-1,-1].
Example 2:

Input: nums = [3,3]
Output: [-1,-1]
Explanation:
We return [-1,-1] since neither integer has any integer greater than it.
*/
const nums = [2, 4, 0, 9, 6];
const secondGreaterElement = function (nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(-1);

  // s1 stores indices j where we haven't found the 1st greater element yet.
  // Monotonic decreasing stack.
  const s1: number[] = [];

  // s2 stores indices j where we found the 1st greater, waiting for the 2nd.
  // Effectively monotonic decreasing.
  const s2: number[] = [];

  for (let i = 0; i < n; i++) {
    const currentVal = nums[i];

    // 1. Check s2: Determine if currentVal is the 2nd greater element
    // Since s2 is monotonic decreasing, we can just pop from the top.
    while (s2.length > 0 && nums[s2[s2.length - 1]] < currentVal) {
      const idx = s2.pop()!;
      result[idx] = currentVal;
    }

    // 2. Check s1: Determine if currentVal is the 1st greater element
    // Elements popped here need to be moved to s2.
    const temp: number[] = [];
    while (s1.length > 0 && nums[s1[s1.length - 1]] < currentVal) {
      temp.push(s1.pop()!);
    }

    // 3. Move elements from temp to s2
    // s1 pops the smallest elements first. temp has them in order [small, medium, large...].
    // To maintain s2 as monotonic decreasing (top is smallest), we push from temp in reverse.
    // Note: Existing elements in s2 are >= currentVal (from step 1),
    // and elements in temp are < currentVal, so concatenation preserves order.
    for (let j = temp.length - 1; j >= 0; j--) {
      s2.push(temp[j]);
    }

    // 4. Push current index to s1 to find its first greater element later
    s1.push(i);
  }

  return result;
};

console.log(secondGreaterElement(nums));
