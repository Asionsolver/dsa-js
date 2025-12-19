// 1437. Check If All 1's Are at Least Length K Places Away

/**
Example 1:


Input: nums = [1,0,0,0,1,0,0,1], k = 2
Output: true
Explanation: Each of the 1s are at least 2 places away from each other.
Example 2:


Input: nums = [1,0,0,1,0,1], k = 2
Output: false
Explanation: The second 1 and third 1 are only one apart from each other.
*/

const nums = [1, 0, 0, 0, 1, 0, 0, 1],
  k = 2;
const kLengthApart = function (nums: number[], k: number) {
  // Stores the index of the last 1 encountered
  let lastOneIndex: number = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      // If we have seen a 1 before, check the distance
      if (lastOneIndex !== -1) {
        // The distance is the number of zeros between two indices
        if (i - lastOneIndex - 1 < k) {
          return false;
        }
      }
      // Update the index of the most recent 1
      lastOneIndex = i;
    }
  }

  return true;
};

console.log(kLengthApart(nums, k));
