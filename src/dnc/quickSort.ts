let element = [5, 6, 1, 7, 2, 8, 9, 3, 4];
let start = 0;
let end = element.length - 1;
// for (const element of element) {
//   console.log(element);
// }

// console.log("ashis");
function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const partition = function (element: number[], start: number, end: number) {
  // step1:choose pivot element
  let pivotIdx = start;
  let pivotElement = element[start];

  // step2: Find right position for pivot element and place it there
  let count = 0;
  for (let i = start + 1; i <= end; i++) {
    if (element[i] <= pivotElement) {
      count++;
    }
  }

  // once the main loop finishes, the pivot's correct position index is ready
  let rightIdx = start + count;
  swap(element, pivotIdx, rightIdx);
  pivotIdx = rightIdx;

  // step3: left side small element and right side big element
  let i = start;
  let j = end;
  while (i < pivotIdx && j > pivotIdx) {
    while (element[i] <= pivotElement) {
      i++;
    }
    while (pivotElement < element[j]) {
      j--;
    }
    if (i < pivotIdx && j > pivotIdx) {
      swap(element, i, j);
    }
  }

  return pivotIdx;
};
const quickSort = function (element: number[], start: number, end: number) {
  // base case
  if (start >= end) {
    return;
  }

  // partition logic
  let pivotIdx = partition(element, start, end);

  // recursive call
  //left pivot
  quickSort(element, start, pivotIdx - 1);

  //right pivot
  quickSort(element, pivotIdx + 1, end);
};

quickSort(element, start, end);
for (const e of element) {
  console.log(e);
}

// T.C-->  n2(worst case) n log n(average)
// S.C-->
