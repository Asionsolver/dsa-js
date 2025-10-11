// const number = Array.of(1, 3, 5, 7, 9);
// console.log(number);

const array_like = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
};

console.log(array_like);

console.log(Array.from(array_like).map((item) => item * 2));

const array_like_async = {
  0: Promise.resolve("Javascript"),
  1: Promise.resolve("Typescript"),
  2: Promise.resolve("React"),
  3: Promise.resolve("Vue"),
  length: 4,
};

console.log(array_like_async);

const store = Array.fromAsync(array_like_async);

console.log(store);

console.log(store.then((arr) => console.log(arr)));
