const element = [1, 2, 9, 4, 5, 10];
const idx = 0;
const maxElement = element[idx];

const findMax = (arr: number[], idx: number, maxElement: number): number => {
  // base case: if index equals array length, return max
  if (arr.length === idx) {
    return maxElement;
  }

  // update if current element is bigger
  if (arr[idx] > maxElement) {
    maxElement = arr[idx];
  }
  // recursive call for next index
  return findMax(arr, idx + 1, maxElement);
};

console.log(findMax(element, idx, maxElement));
