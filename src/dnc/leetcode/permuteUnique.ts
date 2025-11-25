// 47. Permutations II

/**
Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
*/

const nums = [1, 1, 2];

const permuteUnique = function (nums: number[]): number[][] {
  nums.sort((a, b) => a - b); // sort to detect duplicates

  const res: number[][] = [];
  const path: number[] = [];
  const used: boolean[] = new Array(nums.length).fill(false);

  function backtrack() {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      // skip duplicates
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      path.push(nums[i]);

      backtrack();

      used[i] = false;
      path.pop();
    }
  }

  backtrack();
  return res;
};

console.log(permuteUnique(nums));
