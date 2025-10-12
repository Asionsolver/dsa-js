const arrLoopTwo = [1, 2, 3, 4, 5];
const index = 0;
const arrayPrints = (arr: number[], i: number): void => {
  // base case
  if (arr.length - 1 < i) {
    return;
  }

  arrayPrints(arr, i + 1);
  // this line print reverse
  console.log(arr[i]);
};

arrayPrints(arrLoopTwo, index);
