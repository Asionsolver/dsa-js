// 496. Next Greater Element I

/**
Example 1:

Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
Example 2:

Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.
*/

const nums1 = [4, 1, 2],
  nums2 = [1, 3, 4, 2];

const nextGreaterElement = function (
  nums1: number[],
  nums2: number[],
): number[] {
  // Map to store the next greater element for every number in nums2
  // Key: the number itself, Value: its next greater number
  const nextGreaterMap = new Map<number, number>();

  // Monotonic stack to keep track of elements descending
  const stack: number[] = [];

  // Iterate through nums2 to populate the map
  for (const currentNum of nums2) {
    // While stack is not empty AND current number is greater than stack top
    while (stack.length > 0 && currentNum > stack[stack.length - 1]) {
      const smallerNum = stack.pop()!; // Pop the smaller number
      nextGreaterMap.set(smallerNum, currentNum); // Map it to the current (greater) number
    }
    stack.push(currentNum);
  }

  // Map over nums1 to create the result array
  return nums1.map((num) => nextGreaterMap.get(num) ?? -1);
};

console.log(nextGreaterElement(nums1, nums2));
