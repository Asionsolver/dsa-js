// [x] Create, Update, Remove, Access
// const concatOne = [1, 2, 3];
// console.log(concatOne);
// const concatTwo = [4, 5, 6];
// console.log(concatTwo);
// const concatMerge = concatOne.concat(concatTwo);
// console.log(concatMerge);

// const concatThree = [7, 8, 9];
// const concatMergeTwo = concatMerge.concat(concatThree);
// console.log(concatMergeTwo);

// const join = ["🙂", "🙃", "😉", "😌"];
// console.log(join);
// console.log(join.join("-"));
// console.log([].join()); // ''
// console.log([].join("-")); // ''

// fill syntax = fill(replace, source, target)
// const colors = ["🔴", "🟡", "🟢", "🔵", "🟣"];
// console.log(colors);
// console.log(colors.fill("🟠"));
// console.log(colors.fill("🟠", 1, 3));
// console.log(colors);

// const names = ["tom", "alex", "bob", "jon", "alex", "mon"];
// console.log(names.includes("tom"));
// console.log(names.includes("jerry"));
// console.log(names.indexOf("alex"));
// console.log(names.indexOf("alex"));
// console.log(names.lastIndexOf("alex"));
// console.log(names.reverse());

// const artists = [
//   "John White Abbott",
//   "Leonardo da Vinchi",
//   "Charles Aubry",
//   "Anna Atkins",
//   "Barrent Avercamp",
// ];

// const ascSort = artists.sort();

// let desSort = artists.sort(function (a, b) {
//   return a === b ? 0 : a > b ? -1 : 1;
// });
// console.log(desSort);
// console.log(artists === desSort);

// const number = [2, 1000, 10, 3, 26, 23, 12, 30, 21];
// const numberCopy = [...number];

// console.log(
//   numberCopy.sort(function (a, b) {
//     return a === b ? 0 : a < b ? -1 : 1;
//   })
// );

// console.log(
//   numberCopy.sort(function (a, b) {
//     return a - b;
//   })
// );
// console.log(
//   numberCopy.sort(function (a, b) {
//     return b - a;
//   })
// );

// splice

// const names = ["tom", "alex", "bob", "jon", "alex", "mon"];
// const namesTwo = ["dan", "pan", "bob", "jan", "alex", "mon"];

// console.log(names.splice(1, 0, "asion"));
// console.log(names);

// console.log(namesTwo.splice(1, 1, "asion"));
// console.log(namesTwo);

// ? Task: const names = ["tom", "alex", "bob", "jon", "alex", "mon"]. Can possible empty array using splice method

// let names = ["tom", "alex", "bob", "jon", "alex", "mon"];

// console.log(names.splice(0, names.length));
// console.log(names);

// console.log(names.at(5));
// console.log(names.at(0));
// console.log(names.at(-1));
// console.log(names.at(-2));
// console.log(names.at(-6));

// const names = [
//   "tom",
//   ["alex", ["bob", ["Hello", "his", ["she", "he"], "bye"], "jon"], "alex"],
//   "mon",
// ];
// console.log(names.flat(2));
// console.log(names.flat(Infinity));
// console.log(names.flat());
// const namesFat = names.flat();
// console.log(namesFat.flat());
// console.log(names);

// let names = [
//   "tom",
//   "alex",
//   "bob",
//   "jon",
//   "alex",
//   "mon",
//   "she",
//   "he",
//   "Hello",
//   "his",
// ];
// console.log(names.length);
// console.log(names.copyWithin(0, 3, 6));

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(items.with(2, 6));
console.log(items);
console.log(items.with(-2, 5));
