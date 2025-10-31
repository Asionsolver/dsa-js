class Stack {
  stackArray: number[] = [];
  constructor() {
    this.stackArray = [];
  }

  push(value: number) {
    this.stackArray.push(value);
    return this.stackArray;
  }

  pop() {
    return this.stackArray.pop();
  }

  lookUp() {
    return this.stackArray[this.stackArray.length - 1];
  }
}

let stack = new Stack();

console.log("PUSH METHOD PERFORM");
[1, 2, 3, 4, 5, 6, 7].forEach((value) => stack.push(value));
console.log(stack.stackArray);
// console.log(stack);

console.log("POP METHOD PERFORM");
console.log(stack.pop());
console.log(stack.stackArray);

console.log("LOOKUP METHOD PERFORM");
console.log(stack.lookUp());
