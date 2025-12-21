// 2154. Keep Multiplying Found Values by Two

/**
Example 1:

Input: nums = [5,3,6,1,12], original = 3
Output: 24
Explanation: 
- 3 is found in nums. 3 is multiplied by 2 to obtain 6.
- 6 is found in nums. 6 is multiplied by 2 to obtain 12.
- 12 is found in nums. 12 is multiplied by 2 to obtain 24.
- 24 is not found in nums. Thus, 24 is returned.
Example 2:

Input: nums = [2,7,9], original = 4
Output: 4
Explanation:
- 4 is not found in nums. Thus, 4 is returned.
*/
const nums = [5, 3, 6, 1, 12],
  original = 3;
const findFinalValue = function (nums: number[], original: number) {
  // 1. Create a Set from the array for O(1) lookups
  const numSet = new Set(nums);

  // 2. Keep doubling 'original' as long as it exists in the set
  while (numSet.has(original)) {
    original *= 2;
  }

  // 3. Return the final value
  return original;
};
console.log(findFinalValue(nums, original));
