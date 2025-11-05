// 238. Product of Array Except Self
/**
Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
*/

const numProduct = [-1, 1, 0, -3, 3];
function productExceptSelf(nums: number[]) {
  const length = nums.length;
  let answer = new Array(length).fill(1);
  let left = 1;
  let right = 1;

  for (let i = 0; i < length; i++) {
    answer[i] = left;
    left *= nums[i];
  }

  for (let i = length - 1; i >= 0; i--) {
    answer[i] *= right;
    right *= nums[i];
  }
  return answer;
}

console.log(productExceptSelf(numProduct));
