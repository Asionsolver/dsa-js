const arrLoop = [1, 2, 3, 4, 5];
const i = 0;
const arrayPrint = (arr: number[], i: number): void => {
  // base case
  if (arr.length - 1 < i) {
    return;
  }

  console.log(arr[i]);
  arrayPrint(arr, i + 1);
};

arrayPrint(arrLoop, i);
