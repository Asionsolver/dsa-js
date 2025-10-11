const letterArray = ["a", "b", "c", "d", "e"];
console.log(letterArray.copyWithin(1, 3));

const letterArrayTwo = ["a", "b", "c", "d", "e"];
console.log(letterArrayTwo.copyWithin(0, 3, 4));

// negative index
console.log([1, 2, 3, 4, 5].copyWithin(-2, -3, -1));

// Copying the entire array and shifting to the right
console.log([1, 2, 3, 4, 5].copyWithin(2, 0));

// Sparse array
console.log([1, , 3].copyWithin(2, 1, 2));

const nestedObj = [{ x: 1 }, { x: 2 }, { x: 3 }];
nestedObj.copyWithin(0, 1, 2);
console.log(nestedObj);

const arrTwo = [1, 2, 3, 4];
const result = arrTwo.copyWithin(1, 2);
console.log(result === arrTwo); // true
