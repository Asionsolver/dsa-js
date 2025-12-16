// 347. Top K Frequent Elements

/**
Input: nums = [1,1,1,2,2,3], k = 2

Output: [1,2]

Input: nums = [1], k = 1

Output: [1]

Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2

Output: [1,2]
*/

const numsArr = [1, 2, 1, 2, 1, 2, 3, 1, 3, 2];
const topK = 2;
const topKFrequent = function (nums: number[], k: number) {
  let map = new Map();

  for (const number of nums) {
    if (map.has(number)) {
      map.set(number, map.get(number) + 1);
    } else {
      map.set(number, 1);
    }
  }

  //   // Create top max  based on frequency
  //   const topMax = Array.from(map.entries());
  //   topMax.sort((a, b) => b[1] - a[1]);

  //   // Return top k elements
  //   return topMax.slice(0, k).map(([num]) => num);

  const res = [...map.keys()].sort((a, b) => map.get(b) - map.get(a));

  return res.slice(0, k);
};
console.log(topKFrequent(numsArr, topK));
