// 2615. Sum of Distances

/**
Example 1:

Input: nums = [1,3,1,1,2]
Output: [5,0,3,4,0]
Explanation: 
When i = 0, nums[0] == nums[2] and nums[0] == nums[3]. Therefore, arr[0] = |0 - 2| + |0 - 3| = 5. 
When i = 1, arr[1] = 0 because there is no other index with value 3.
When i = 2, nums[2] == nums[0] and nums[2] == nums[3]. Therefore, arr[2] = |2 - 0| + |2 - 3| = 3. 
When i = 3, nums[3] == nums[0] and nums[3] == nums[2]. Therefore, arr[3] = |3 - 0| + |3 - 2| = 4. 
When i = 4, arr[4] = 0 because there is no other index with value 2. 

Example 2:

Input: nums = [0,5,3]
Output: [0,0,0]
Explanation: Since each element in nums is distinct, arr[i] = 0 for all i.
*/
const distanceNums = [1, 3, 1, 1, 2];

// basic Version -- Brute force
// const distance = function (nums: number[]) {
//   const n = nums.length;
//   const arr = new Array(n).fill(0);

//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < n; j++) {
//       if (i !== j && nums[i] === nums[j]) {
//         arr[i] += Math.abs(i - j);
//       }
//     }
//   }

//   return arr;
// };

// console.log(distance(distanceNums));
