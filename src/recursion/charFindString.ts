const strOne = "ashis l Kumar Paul";
const key = "a";
const indexOne = 0;

// without passing extra space
const charFind = (strOne: string, key: string, index: number): number[] => {
  // base case
  if (index >= strOne.length) {
    return [];
  }

  // current result
  const current = strOne[index] === key ? [index + 1] : [];

  // recursive call and combine
  return current.concat(charFind(strOne, key, index + 1));
};

const resultArr = charFind(strOne, key, indexOne);

if (resultArr.length === 0) {
  console.log("Char not found");
} else {
  for (const element of resultArr) {
    console.log("Char found at this", element);
  }
}

// const strOne = "ashis l Kumar Paul";
// const key = "a0";
// const indexOne = 0;
// const resultArr: number[] = [];
// with passing extra space
// const charFind = (
//   strOne: string,
//   key: string,
//   index: number,
//   resultArr: number[]
// ): number[] => {
//   // base case
//   if (strOne.length < index) {
//     return resultArr;
//   }

//   // processing
//   if (strOne[index] === key) {
//     resultArr.push(index + 1);
//   }

//   // recursive call
//   return charFind(strOne, key, index + 1, resultArr);
// };
// charFind(strOne, key, indexOne, resultArr);
// if (resultArr.length == 0) {
//   console.log("Char not found");
// } else {
//   for (const element of resultArr) {
//     console.log("Char fount at this", element);
//   }
// }
