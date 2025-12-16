// 923. 3Sum With Multiplicity

/**
Example 1:

Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
Output: 20
Explanation: 
Enumerating by the values (arr[i], arr[j], arr[k]):
(1, 2, 5) occurs 8 times;
(1, 3, 4) occurs 8 times;
(2, 2, 4) occurs 2 times;
(2, 3, 3) occurs 2 times.
Example 2:

Input: arr = [1,1,2,2,2,2], target = 5
Output: 12
Explanation: 
arr[i] = 1, arr[j] = arr[k] = 2 occurs 12 times:
We choose one 1 from [1,1] in 2 ways,
and two 2s from [2,2,2,2] in 6 ways.
Example 3:

Input: arr = [2,1,3], target = 6
Output: 1
Explanation: (1, 2, 3) occured one time in the array so we return 1.
*/
const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
  target = 8;

const threeSumMulti = function (arr: number[], target: number) {
  const MOD = 1_000_000_007;

  // frequency count
  const count = new Array(101).fill(0);
  for (let x of arr) count[x]++;

  let ans = 0;

  for (let i = 0; i <= 100; i++) {
    if (count[i] === 0) continue;

    for (let j = i; j <= 100; j++) {
      if (count[j] === 0) continue;

      let k = target - i - j;
      if (k < j || k > 100) continue;
      if (count[k] === 0) continue;

      // i < j < k (all distinct)
      if (i < j && j < k) {
        ans += count[i] * count[j] * count[k];
      }
      // i == j == k (all same)
      else if (i === j && j === k) {
        ans += (count[i] * (count[i] - 1) * (count[i] - 2)) / 6;
      }
      // i == j < k
      else if (i === j && j < k) {
        ans += ((count[i] * (count[i] - 1)) / 2) * count[k];
      }
      // i < j == k
      else if (i < j && j === k) {
        ans += count[i] * ((count[j] * (count[j] - 1)) / 2);
      }

      ans %= MOD;
    }
  }

  return ans;
};

console.log(threeSumMulti(arr, target));
