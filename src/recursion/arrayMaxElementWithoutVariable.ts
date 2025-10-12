const elements = [1, 2, 9, 4, 5, 10];

const findMaxWithoutVariable = (arr: number[]): number => {
  // base case: if there is only one element, it is the max
  if (arr.length === 1) {
    return arr[0];
  }

  // recursion on the previous part excluding the last element
  const subMax = findMaxWithoutVariable(arr.slice(0, -1));

  // Compare with the last element and return the bigger one
  return arr[arr.length - 1] > subMax ? arr[arr.length - 1] : subMax;
};

console.log(findMaxWithoutVariable(elements));
