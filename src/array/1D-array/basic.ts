//  "🥝",  "🍅",  "🫒",  "🥥",

// // Initialize an array
// const fruits: string[] = ["🍇", "🍉", "🍊", "🍍", "🥭"];
// // before push
// console.log("Before push fruits length: ", fruits.length + "\n");
// for (let index = 0; index < fruits.length; index++) {
//   console.log(`Element at the index ${index} is ${fruits[index]}`);
// }

// console.log("\n");

// // after push
// fruits.push("🍏");

// console.log("After push fruits length: ", fruits.length + "\n");
// for (let index = 0; index < fruits.length; index++) {
//   console.log(`Element at the index ${index} is ${fruits[index]}`);
// }

// // before unshift
// console.log("Before unshift fruits length: ", fruits.length + "\n");
// for (let index = 0; index < fruits.length; index++) {
//   console.log(`Element at the index ${index} is ${fruits[index]}`);
// }

// console.log("\n");

// // after unshift
// fruits.unshift("🍋");

// // After unshift
// console.log("After unshift fruits length: ", fruits.length + "\n");
// for (let index = 0; index < fruits.length; index++) {
//   console.log(`Element at the index ${index} is ${fruits[index]}`);
// }

// // before pop
// console.log("Before pop fruits length: ", fruits.length + "\n");
// for (let index = 0; index < fruits.length; index++) {
//   console.log(`Element at the index ${index} is ${fruits[index]}`);
// }

// console.log("\n");

// // after pop
// fruits.pop();

// // After pop
// console.log("After unshift fruits length: ", fruits.length + "\n");
// for (let index = 0; index < fruits.length; index++) {
//   console.log(`Element at the index ${index} is ${fruits[index]}`);
// }

// // before shift
// console.log("Before shift fruits length: ", fruits.length + "\n");
// for (let index = 0; index < fruits.length; index++) {
//   console.log(`Element at the index ${index} is ${fruits[index]}`);
// }

// console.log("\n");

// // after pop
// fruits.shift();

// // After shift
// console.log("After shift fruits length: ", fruits.length + "\n");
// for (let index = 0; index < fruits.length; index++) {
//   console.log(`Element at the index ${index} is ${fruits[index]}`);
// }

/*******************************************************************************/

const fruits: string[] = ["🍒", "🍓", "🍎", "🥝", "🍓"];

const fruitsCopy = fruits.slice();
console.log("Slice using fruitsCopy length: ", fruitsCopy.length + "\n");
for (let index = 0; index < fruitsCopy.length; index++) {
  console.log(`Element at the index ${index} is ${fruitsCopy[index]}`);
}

console.log(Array.isArray(fruits));
console.log(Array.isArray(1));
// Initialize an array using constructor method
// let saladTwo: string[] = new Array(3);
let saladTwo: string[] = new Array("tomato", "carrot");

// size of array
// console.log(saladTwo.length);
// console.log(saladTwo);
// console.log(salad === saladTwo);
