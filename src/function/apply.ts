// Syntax
// apply(thisArg)
// apply(thisArg, argsArray)

// function greet(this: { name: string }, city: string, country: string) {
//   console.log(`Hello, I am ${this.name} from ${city}, ${country}`);
// }

// const person = { name: "Asion" };

// greet.apply(person, ["Dhaka", "Bangladesh"]);

// function showThis(this: unknown) {
//   console.log(this);
// }

// // object
// showThis.apply({ name: "Asion" }); // { name: "Asion" }

// // null  (non-strict mode )
// showThis.apply(null); // window (browser এ)

// // primitive
// showThis.apply(42); // Number {42}

function introduce(
  this: { name: string },
  city: string,
  country: string,
  age: number
) {
  console.log(`Hi, I'm ${this.name}, from ${city}, ${country}, age ${age}`);
  return this.name.length + age;
}

const person = { name: "Asion" };
const info = introduce.apply(person, ["Dhaka", "Bangladesh", 25]);

console.log("Return value:", info);
