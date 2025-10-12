/**
Problem 8: Remove Duplicates
Description:
Remove all duplicate values from an array.
Input: [1, 2, 2, 3, 4, 3, 5]
Output: [1, 2, 3, 4, 5]
*/

const duplicates = [1, 2, 2, 3, 4, 3, 5, 9, 10, 9];

const nonDuplicateArray = duplicates.filter((item, index, array) => {
  const logic = array.indexOf(item) === index;

  return logic;
});
console.log(nonDuplicateArray);

const duplicateItem = duplicates.filter((item, index, array) => {
  const logic = array.indexOf(item) !== index;

  return logic;
});
console.log(duplicateItem);
