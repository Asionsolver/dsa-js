// 1846. Maximum Element After Decreasing and Rearranging

/**
Example 1:

Input: arr = [2,2,1,2,1]
Output: 2
Explanation: 
We can satisfy the conditions by rearranging arr so it becomes [1,2,2,2,1].
The largest element in arr is 2.
Example 2:

Input: arr = [100,1,1000]
Output: 3
Explanation: 
One possible way to satisfy the conditions is by doing the following:
1. Rearrange arr so it becomes [1,100,1000].
2. Decrease the value of the second element to 2.
3. Decrease the value of the third element to 3.
Now arr = [1,2,3], which satisfies the conditions.
The largest element in arr is 3.
Example 3:

Input: arr = [1,2,3,4,5]
Output: 5
Explanation: The array already satisfies the conditions, and the largest element is 5.
 
*/

function maximumElementAfterDecrementingAndRearranging(arr: number[]): number {
  // Sort the array in ascending order
  arr.sort((a, b) => a - b);

  // The first element must be 1
  arr[0] = 1;

  // Adjust each subsequent element based on the previous one
  for (let i = 1; i < arr.length; i++) {
    arr[i] = Math.min(arr[i], arr[i - 1] + 1);
  }

  // The last element will be the maximum possible value
  return arr[arr.length - 1];
}

// Example usage:
console.log(maximumElementAfterDecrementingAndRearranging([2, 2, 1, 2, 1])); // Output: 2
console.log(maximumElementAfterDecrementingAndRearranging([100, 1, 1000])); // Output: 3
console.log(maximumElementAfterDecrementingAndRearranging([1, 2, 3, 4, 5])); // Output: 5
