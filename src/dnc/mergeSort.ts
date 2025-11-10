const nonSortedArray = [5, 6, 3, 9, 8, 4, 2, 1, 7]; // 9
const sIdx = 0;
const eIdx = nonSortedArray.length - 1;

const mergeArray = function (nums: number[], start: number, end: number) {
  let mid = Math.floor((start + end) / 2);

  let leftArraySize = mid - start + 1;
  let rightArraySize = end - mid;
  let leftArray = new Array(leftArraySize);
  let rightArray = new Array(rightArraySize);

  // copy element

  // left
  let startIdx = start;
  for (let i = 0; i < leftArraySize; i++) {
    leftArray[i] = nums[startIdx++];
  }
  startIdx = mid + 1;
  for (let i = 0; i < rightArraySize; i++) {
    rightArray[i] = nums[startIdx++];
  }

  // merger two array

  let leftIdx = 0;
  let rightIdx = 0;
  let mergeIdx = start;

  while (leftIdx < leftArraySize && rightIdx < rightArraySize) {
    if (leftArray[leftIdx] < rightArray[rightIdx]) {
      nums[mergeIdx++] = leftArray[leftIdx++];
    } else {
      nums[mergeIdx++] = rightArray[rightIdx++];
    }
  }

  // when left array size greater than right size
  while (leftIdx < leftArraySize) {
    nums[mergeIdx++] = leftArray[leftIdx++];
  }
  // when right array size greater than left size
  while (rightIdx < rightArraySize) {
    nums[mergeIdx++] = rightArray[rightIdx++];
  }
};

const mergeSort = function (nums: number[], start: number, end: number) {
  //base case
  if (start >= end) {
    return;
  }

  let mid = Math.floor((start + end) / 2);
  mergeSort(nums, start, mid);

  mergeSort(nums, mid + 1, end);

  mergeArray(nums, start, end);
};

mergeSort(nonSortedArray, sIdx, eIdx);
for (const element of nonSortedArray) {
  console.log(element);
}

// T.C --> O(n log n)
// S.C --> O(n)
