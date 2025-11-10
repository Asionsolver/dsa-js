// Maximum number of not adjacent element

const adjacentElements = [2, 1, 4, 9];
const sum = 0;
const maxi = -Infinity;
const arrIdx = 0;
const nonAdjacentElement = function (
  nums: number[],
  sum: number,
  maxi: number,
  index: number
): number {
  //base case
  if (index >= nums.length) {
    return Math.max(sum, maxi);
  }
  // include
  const include = nonAdjacentElement(nums, sum + nums[index], maxi, index + 2);
  // exclude
  const exclude = nonAdjacentElement(nums, sum, maxi, index + 1);

  return Math.max(include, exclude);
};

console.log(nonAdjacentElement(adjacentElements, sum, maxi, arrIdx));
