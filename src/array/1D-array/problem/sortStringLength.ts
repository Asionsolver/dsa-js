/**
Question: Sort string array by length

Description:

Write a function that sorts an array of strings based on their length (shortest → longest).

Input: ["hi", "hello", "a", "world"]
Output: ["a", "hi", "hello", "world"]

*/

const stringArr = ["hi", "hello", "a", "world", "hallo"];

console.log(
  stringArr.toSorted((a, b) => {
    if (a.length !== b.length) {
      return a.length - b.length; // primary sort by length
    } else {
      return a.localeCompare(b); // secondary sort alphabetically
    }
  })
);
console.log(stringArr);
