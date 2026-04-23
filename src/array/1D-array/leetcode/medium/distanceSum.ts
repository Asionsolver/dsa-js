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

// Optimized Version -- Hash Map + Prefix Sum
// const distance = function (nums: number[]) {
//   const map = new Map(); // value → [list of indices]
//   const n = nums.length;
//   const ans = new Array(n).fill(0);
//   // Step 1: Group indices by value
//   for (let i = 0; i < n; i++) {
//     if (!map.has(nums[i])) map.set(nums[i], []);
//     map.get(nums[i]).push(i);
//   }
//   // Step 2: For each group, calculate distances
//   for (const [val, indices] of map.entries()) {
//     const m = indices.length;
//     if (m === 1) continue; // only one element → all 0
//     // prefix sum
//     const prefix = new Array(m).fill(0);
//     prefix[0] = indices[0];
//     for (let i = 1; i < m; i++) {
//       prefix[i] = prefix[i - 1] + indices[i];
//     }
//     for (let i = 0; i < m; i++) {
//       const idx = indices[i];
//       const leftSum = i > 0 ? i * idx - prefix[i - 1] : 0;
//       const rightSum = prefix[m - 1] - prefix[i] - (m - 1 - i) * idx;
//       ans[idx] = leftSum + rightSum;
//     }
//   }
//   return ans;
// };

// Optimized Version -- Hash Map + Prefix Sum (without extra prefix array)
function distance(nums: number[]): number[] {
  const n = nums.length;
  const ans = new Array(n).fill(0);

  // Map to group indices by their corresponding values in nums
  const groups = new Map<number, number[]>();

  // Populate the hash map
  for (let i = 0; i < n; i++) {
    const val = nums[i];
    let list = groups.get(val);
    if (list === undefined) {
      list = [];
      groups.set(val, list);
    }
    list.push(i);
  }

  // Process each group of identical numbers
  for (const indices of groups.values()) {
    const k = indices.length;
    // If a number appears only once, its distance sum is naturally 0
    if (k === 1) continue;

    // Calculate the total sum of all indices in this group
    let totalSum = 0;
    for (let i = 0; i < k; i++) {
      totalSum += indices[i];
    }

    let leftSum = 0;
    for (let m = 0; m < k; m++) {
      const currIdx = indices[m];

      // rightSum is the sum of indices strictly to the right of currIdx
      const rightSum = totalSum - leftSum - currIdx;

      // Distance to all matching numbers on the left
      const leftDist = m * currIdx - leftSum;

      // Distance to all matching numbers on the right
      const rightDist = rightSum - (k - 1 - m) * currIdx;

      // Set the absolute distance answer for the current index
      ans[currIdx] = leftDist + rightDist;

      // Update leftSum for the next iteration
      leftSum += currIdx;
    }
  }

  return ans;
}

console.log(distance(distanceNums));
