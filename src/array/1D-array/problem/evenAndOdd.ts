/*
Problem : Even and Odd Number Extractor
Description:
Write a function that takes an array of numbers and returns a new array containing only the even and odd numbers.

Input: [1, 2, 3, 4, 5, 6]

Output:
Even: [2, 4, 6]
Odd: [1, 3, 5]

*/
const evenOrOdd = [1, 2, 3, 4, 5, 6];
let even: number[] = [];
let odd: number[] = [];

evenOrOdd.filter((item) => {
  if (item % 2 === 0) {
    even.push(item);
  } else {
    odd.push(item);
  }
});

console.log(even);
console.log(odd);
