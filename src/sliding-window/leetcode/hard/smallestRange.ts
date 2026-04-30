// 632. Smallest Range Covering Elements from K Lists

/**
Example 1:

Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
Example 2:

Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]   
*/

function smallestRange(nums: number[][]): number[] {
  let totalElements = 0;
  for (let i = 0; i < nums.length; i++) {
    totalElements += nums[i].length;
  }

  // Using TypedArrays for maximum performance and memory efficiency
  const vals = new Int32Array(totalElements);
  const listIds = new Int16Array(totalElements);
  const indices = new Int32Array(totalElements);

  let idx = 0;
  for (let i = 0; i < nums.length; i++) {
    const list = nums[i];
    for (let j = 0; j < list.length; j++) {
      vals[idx] = list[j];
      listIds[idx] = i; // Store which group/list this number originated from
      indices[idx] = idx;
      idx++;
    }
  }

  // Sort the proxy indices array based on the actual values
  indices.sort((a, b) => vals[a] - vals[b]);

  // Sliding Window configuration
  let left = 0;
  const counts = new Int16Array(nums.length);
  let listsCovered = 0;

  // Setting up the best starting limits with out-of-bounds metrics to guarantee overrides
  let bestStart = -1000000;
  let bestEnd = 1000000;

  for (let right = 0; right < totalElements; right++) {
    const rightIdx = indices[right];
    const listId = listIds[rightIdx];
    const val = vals[rightIdx];

    // When a new list ID is encountered, step up the cover count
    if (counts[listId] === 0) {
      listsCovered++;
    }
    counts[listId]++;

    // While our window currently encompasses elements from ALL 'k' lists
    while (listsCovered === nums.length) {
      const leftIdx = indices[left];
      const currentStart = vals[leftIdx];
      const currentEnd = val;

      const currentDiff = currentEnd - currentStart;
      const bestDiff = bestEnd - bestStart;

      // Checking logic to see if we've found a strictly smaller range
      if (
        currentDiff < bestDiff ||
        (currentDiff === bestDiff && currentStart < bestStart)
      ) {
        bestStart = currentStart;
        bestEnd = currentEnd;
      }

      // Pull the leftmost element out of the window to try and find a smaller range
      const leftListId = listIds[leftIdx];
      counts[leftListId]--;
      if (counts[leftListId] === 0) {
        listsCovered--;
      }

      left++;
    }
  }

  return [bestStart, bestEnd];
}

// Example usage:
const nums = [
  [4, 10, 15, 24, 26],
  [0, 9, 12, 20],
  [5, 18, 22, 30],
];
console.log(smallestRange(nums)); // Output: [20, 24]

const nums2 = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];
console.log(smallestRange(nums2)); // Output: [1, 1]
