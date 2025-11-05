import { it } from "node:test";
// 349. Intersection of two array

const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2];
const intersection = function (nums1: number[], nums2: number[]) {
  let interSet = new Set(nums1);
  let ans: number[] = [];
  for (let i = 0; i < nums2.length; i++) {
    if (interSet.has(nums2[i]) && !ans.includes(nums2[i])) {
      ans.push(nums2[i]);
    }
  }
  return ans;
};
console.log(intersection(nums1, nums2));
