const elementsOne = [1, 9, 5, 6, 3, 10];

// Math.max() + Spread Operator
// const maxElementOne = Math.max(...elementsOne);
// console.log(maxElementOne);

// using reduce
// const maxElementTwo = elementsOne.reduce((prev, curr) =>
//   prev > curr ? prev : curr
// );
// console.log(maxElementTwo);

// using sort()
// const maxElementThree = elementsOne.sort((a, b) => b - a);
// console.log(maxElementThree[0]);

// using for...of loop
// let maxValue = elementsOne[0];
// for (const element of elementsOne) {
//   if (maxValue < element) maxValue = element;
// }

// console.log(maxValue);

// using sort() + at()
// const maxElementFour = [...elementsOne].sort((a, b) => a - b).at(-1);
// console.log(maxElementFour);

// Math.max + apply()
// const maxElementFive = Math.max.apply(null, elementsOne);
// console.log(maxElementFive);

// Math.max + call()
// const maxElementSix = Math.max.call(null, ...elementsOne);
// console.log(maxElementSix);

// using sort() + pop()

// let maxElementSeven = [...elementsOne].sort((a, b) => a - b).pop();
// console.log(maxElementSeven);

// using map()
// let maxValue = -Infinity;

// elementsOne.map((num) => {
//   if (num > maxValue) maxValue = num;
// });
// console.log(maxValue);

// using every()
// let maxValue = elementsOne[0];

// elementsOne.every((num) => {
//   if (num > maxValue) maxValue = num;
//   return true;
// });

// console.log(maxValue);

// Destructuring + Spread
const [maxValue] = [...elementsOne].sort((a, b) => b - a);

console.log(maxValue);
