// [x] Array Destructuring
// [x] How to Assign a Default value to a Variable
// [x] How to Skip a value in an Array
// [x] Nested Array Destructuring
// [x] How to use the Rest Parameter
// [x] How to use the Spread Operator
// [x] Destructuring use case
// [x] How to Swap values with Destructuring
// [x] How to merge Array
// [x] The Length property

//  + "\n"

// // [x] Array Destructuring
// console.log("Array Destructuring");
// const [cherries, strawberry, apple, kiwi, blueberries] = [
//   "🍒",
//   "🍓",
//   "🍎",
//   "🥝",
//   "🫐",
// ];

// console.log(cherries, strawberry, apple, kiwi, blueberries);

// console.log("\n");

// // [x] How to Assign a Default value to a Variable
// console.log("Assign a Default value to a Variable");
// const [hamburger, tomato = "🍅"] = ["🍔"];

// console.log(hamburger, tomato);

// console.log("\n");

// // [x] How to Skip a value in an Array
// console.log("Skip a value in an Array");
// // const [coconut, olive, pineapple, banana, lime] = ["🥥","🫒","🍍","🍌","🍋‍🟩"];

// const [coconut, olive, pineapple, , lime] = ["🥥", "🫒", "🍍", "🍌", "🍋‍🟩"];

// console.log(coconut);
// console.log(olive);
// console.log(pineapple);
// console.log(lime);

// console.log("\n");

// [x] Nested Array Destructuring
// console.log("Nested Array Destructuring")
// const fruitThree = ["🥥", "🫒", "🍍", "🍋‍🟩", ["🍒", "🍓", "🍎", "🥝", "🫐"]];
// console.log(fruitThree[4][2]);
// const [
//   coconut,
//   olive,
//   pineapple,
//   lime,
//   [cherries, strawberry, apple, kiwi, blueberries],
// ] = ["🥥", "🫒", "🍍", "🍋‍🟩", ["🍒", "🍓", "🍎", "🥝", "🫐"]];

// console.log(coconut, olive, pineapple, lime);
// console.log(cherries, strawberry, apple, kiwi, blueberries);

// const [, , , , [cherries, strawberry, apple, kiwi, blueberries]] = [
//   "🥥",
//   "🫒",
//   "🍍",
//   "🍋‍🟩",
//   ["🍒", "🍓", "🍎", "🥝", "🫐"],
// ];

// console.log(coconut, olive, pineapple, lime);
// console.log(cherries, strawberry, apple, kiwi, blueberries);

// // [x] How to use the Rest Parameter
// console.log("Rest Parameter");
// const [cherries, strawberry, ...rest] = ["🍒", "🍓", "🍎", "🥝", "🫐"];
// console.log(cherries, strawberry);
// console.log(rest);

// [x] How to use the Spread Operator
// console.log("Spread Operator");
// const fruitsFour = ["🍒", "🍓", "🍎", "🥝", "🫐"];

// const fruitsFourCopy = [...fruitsFour];
// console.log(fruitsFourCopy);

// [] Destructuring use case

// [] How to Swap values with Destructuring
// console.log("Swap values with Destructuring");
// let sad = "🥲";
// let happy = "😀";

// console.log(sad, happy);

// [happy, sad] = [sad, happy];

// console.log(happy, sad);

// // [x] How to merge Array
// console.log("Merge Array");
// const emotion = ["🙂", "🙃", "😉", "😌"];
// const fruitsFive = ["🍒", "🍓", "🍎", "🥝", "🫐"];

// const emotionalFruitsFive = [...emotion, ...fruitsFive];
// console.log(emotionalFruitsFive);

// [x] The Length property
// "use strict";
// console.log("The Length property");
// const fruitsFive = ["🍒", "🍓", "🍎", "🥝", "🫐"];
// console.log(fruitsFive.length);

// const arr1 = [1, 2, 3];
// const arr2 = new Array(6);

// console.log(arr1.length);
// console.log(arr2.length);

// arr1.length = 7;
// console.log(arr1.length);

// const cash = [100, 200, 300, 400];
// Object.defineProperty(cash, "length", { writable: false });

// // only work when "use strict" mode one
// cash.length = 0; // [ERROR] 08:36:29 TypeError: Cannot assign to read only property 'length' of object '[object Array]'
