/*
In JavaScript, vectors are typically represented as one-dimensional arrays. You can create a vector (an array) using the following methods:
! 1. Using Array Literals
You can directly define an array using square brackets []:
let vector = [1, 2, 3, 4, 5];


! 2. Using the Array Constructor
You can create an empty array or an array of a specific size using the Array constructor:
* Creating an empty array
let vector = new Array();

* Creating an array with 5 elements, all initialized to `undefined`
let vector = new Array(5);

* Creating an array with specific elements
let vector = new Array(1, 2, 3, 4, 5);


! 3. Using fill() Method
You can create a vector of a specific size and fill it with a default value:
* Creating an array of size 5, filled with the value 0
let vector = new Array(5).fill(0);


! 4. Using Array.from()
You can create an array from an iterable or generate it based on a function:
* Creating an array from an iterable (e.g., string)
let vector = Array.from("12345"); // ['1', '2', '3', '4', '5']

* Creating an array with a function
let vector = Array.from({ length: 5 }, (v, i) => i + 1); // [1, 2, 3, 4, 5]

5. Using Spread Syntax
You can create a new array by copying elements from an existing array or combining multiple arrays:
let vector1 = [1, 2, 3];
let vector2 = [4, 5, 6];
let vector = [...vector1, ...vector2]; // [1, 2, 3, 4, 5, 6]

*/