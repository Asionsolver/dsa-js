// 1385. Find the Distance Value Between Two Arrays

/**
Given two integer arrays arr1 and arr2, and the integer d, return the distance value between the two arrays.

The distance value is defined as the number of elements arr1[i] such that there is not any element arr2[j] where |arr1[i]-arr2[j]| <= d.
*/

/**
Example 1:

Input: arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
Output: 2
Explanation: 
For arr1[0]=4 we have: 
|4-10|=6 > d=2 
|4-9|=5 > d=2 
|4-1|=3 > d=2 
|4-8|=4 > d=2 
For arr1[1]=5 we have: 
|5-10|=5 > d=2 
|5-9|=4 > d=2 
|5-1|=4 > d=2 
|5-8|=3 > d=2
For arr1[2]=8 we have:
|8-10|=2 <= d=2
|8-9|=1 <= d=2
|8-1|=7 > d=2
|8-8|=0 <= d=2
Example 2:

Input: arr1 = [1,4,2,3], arr2 = [-4,-3,6,10,20,30], d = 3
Output: 2
Example 3:

Input: arr1 = [2,1,100,3], arr2 = [-5,-2,10,-3,7], d = 6
Output: 1
*/

/**
Constraints:

1 <= arr1.length, arr2.length <= 500
-1000 <= arr1[i], arr2[j] <= 1000
0 <= d <= 100
*/
// Brute Force Approach
// function findTheDistanceValue(
//   arr1: number[],
//   arr2: number[],
//   d: number,
// ): number {
//   let distanceValue = 0;

//   // Iterate through each element in arr1.
//   for (let i = 0; i < arr1.length; i++) {
//     let hasCloseElement = false;

//     // Compare arr1[i] with every element in arr2.
//     for (let j = 0; j < arr2.length; j++) {
//       // Check if the absolute difference is within threshold d.
//       if (Math.abs(arr1[i] - arr2[j]) <= d) {
//         hasCloseElement = true;
//         break; // Stop early because condition is violated.
//       }
//     }

//     // If no close element was found, arr1[i] is valid.
//     if (!hasCloseElement) {
//       distanceValue++;
//     }
//   }

//   return distanceValue;
// }

// Optimize Approach: Binary Search (Lower Bound Pattern)
function findTheDistanceValue(
  arr1: number[],
  arr2: number[],
  d: number,
): number {
  // Sort arr2 in ascending order to enable binary search.
  arr2.sort((a, b) => a - b);

  let distanceValue = 0;

  // Helper function: Binary search to check if any element exists in [target - d, target + d].
  const hasElementInRange = (target: number): boolean => {
    let left = 0;
    let right = arr2.length - 1;
    const lowBound = target - d;
    const highBound = target + d;

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2);

      // If the element is within [target - d, target + d], violation found.
      if (arr2[mid] >= lowBound && arr2[mid] <= highBound) {
        return true;
      }

      // If arr2[mid] is smaller than the range, search in the right half.
      if (arr2[mid] < lowBound) {
        left = mid + 1;
      } else {
        // If arr2[mid] is larger than the range, search in the left half.
        right = mid - 1;
      }
    }

    // No element found in the given range.
    return false;
  };

  // Check each element in arr1.
  for (const num of arr1) {
    // If no element in arr2 falls within the invalid range, count this element.
    if (!hasElementInRange(num)) {
      distanceValue++;
    }
  }

  return distanceValue;
}
// Example Uses
console.log(findTheDistanceValue([4, 5, 8], [10, 9, 1, 8], 2)); // Output: 2
console.log(findTheDistanceValue([1, 4, 2, 3], [-4, -3, 6, 10, 20, 30], 3)); // Output: 2
console.log(findTheDistanceValue([2, 1, 100, 3], [-5, -2, 10, -3, 7], 6)); // Output: 1
