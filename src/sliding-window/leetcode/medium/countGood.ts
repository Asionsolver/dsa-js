// 2537. Count the Number of Good Subarrays

/**
Example 1:

Input: nums = [1,1,1,1,1], k = 10
Output: 1
Explanation: The only good subarray is the array nums itself.
Example 2:

Input: nums = [3,1,4,3,2,2,4], k = 2
Output: 4
Explanation: There are 4 different good subarrays:
- [3,1,4,3,2,2] that has 2 pairs.
- [3,1,4,3,2,2,4] that has 3 pairs.
- [1,4,3,2,2,4] that has 2 pairs.
- [4,3,2,2,4] that has 2 pairs. 
*/

const countGood = (nums: number[], k: number): number => {
  let ans = 0;
  let pairs = 0;
  let L = 0;
  const freq = new Map<number, number>();

  for (let R = 0; R < nums.length; R++) {
    const num = nums[R];
    // Retrieve the current frequency of nums[R] in our window
    const count = freq.get(num) ?? 0;

    // Adding nums[R] creates `count` new pairs
    pairs += count;
    freq.set(num, count + 1);

    // Shrink the window while we still have at least k pairs
    while (pairs >= k) {
      const leftNum = nums[L];
      const leftCount = freq.get(leftNum)!;

      // Removing nums[L] destroys `leftCount - 1` pairs
      pairs -= leftCount - 1;

      // Update the map cleanly
      if (leftCount === 1) {
        freq.delete(leftNum);
      } else {
        freq.set(leftNum, leftCount - 1);
      }

      L++;
    }

    // Add the number of valid starting positions to our answer
    ans += L;
  }

  return ans;
};

// example use
console.log(countGood([1, 1, 1, 1, 1], 10)); // Output: 1
console.log(countGood([3, 1, 4, 3, 2, 2, 4], 2)); // Output: 4
