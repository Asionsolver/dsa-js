/**
Merge and Modify

Description:
Merge [1, 2, 3] and [4, 5] into one array,
then remove the middle element.

Example:

Input: [1, 2, 3], [4, 5]
Step 1 Output: [1, 2, 3, 4, 5]
Final Output: [1, 2, 4, 5]
*/

const arrayOne = [1, 2, 3];
const arrayTwo = [4, 5];

// mutate array
// const resultArray = [...arrayOne, ...arrayTwo];
// const middleIndex = Math.floor(resultArray.length / 2);
// resultArray.splice(middleIndex, 1);
const removeMiddleElement = (arrOne: number[], arrTwo: number[]) => {
  const merge = [...arrOne, ...arrTwo];
  const middleIndex = Math.floor(merge.length / 2);
  console.log(merge.length);
  return [...merge.slice(0, middleIndex), ...merge.slice(middleIndex + 1)];
};
console.log(removeMiddleElement(arrayOne, arrayTwo));
