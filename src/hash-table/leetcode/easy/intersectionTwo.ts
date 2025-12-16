// 350. Intersection of Two Arrays II
// const nums3 = [1, 2, 2, 1];
// const nums4 = [2, 2];
//  && !ans.includes(nums2[i])
const nums3 = [4, 9, 5];
const nums4 = [9, 4, 9, 8, 4];
const intersection = function (nums1: number[], nums2: number[]) {
  let freqMap = new Map();
  for (const num of nums1) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }
  let ans: number[] = [];
  for (const num of nums2) {
    if (freqMap.has(num) && freqMap.get(num)! > 0) {
      ans.push(num);
      freqMap.set(num, freqMap.get(num)! - 1);
    }
  }
  return ans;
};
console.log(intersection(nums3, nums4));
