/**
Question: Create an array of lengths from an array of strings

Description:
You will be given an array of strings — your task is to find the length of each string and create a new array containing those lengths.

Input: ["hi", "hello", "world"]
Output: [2, 5, 5]

*/

const stringArray = ["hi", "hello", "world"];

console.log(
  stringArray.map((item) => {
    return item.length;
  })
);
