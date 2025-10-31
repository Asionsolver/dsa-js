class StackObj {
  database: Record<number, number> = {};
  count = 0;
  constructor() {
    this.database = {};
    this.count = 0;
  }

  push(value: number) {
    this.count++;
    this.database[this.count] = value;
    return this.database;
  }

  pop() {
    if (this.count === 0) {
      return undefined; // stack empty
    }

    let deleteItem = this.database[this.count];
    delete this.database[this.count];
    this.count--;
    return deleteItem;
  }

  peek() {
    return this.database[this.count];
  }
}

let stackObj = new StackObj();
console.log("PUSH METHOD PERFORM");
console.log(stackObj.push(1));
console.log(stackObj.push(2));
console.log(stackObj.push(3));
console.log(stackObj.push(4));

console.log("POP METHOD PERFORM");
console.log(stackObj.pop());

console.log("PEEK METHOD PERFORM");
console.log(stackObj.peek());
