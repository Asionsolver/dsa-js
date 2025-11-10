const str = "abc";
const start = 0;
const arr = str.split(""); // string → array

function swap(arr: string[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const printPermutation = (arr: string[], start: number) => {
  if (start >= arr.length) {
    console.log(arr.join("")); // array → string
    return;
  }

  for (let j = start; j < arr.length; j++) {
    swap(arr, start, j);
    printPermutation(arr, start + 1);
    swap(arr, start, j); // backtrack
  }
};

printPermutation(arr, start);
