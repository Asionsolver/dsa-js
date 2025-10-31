class Queue {
  queueArray: number[] = [];
  constructor() {
    this.queueArray = [];
  }
  // push
  push(value: number) {
    this.queueArray.unshift(value);
    return this.queueArray;
  }

  // pop
  pop() {
    this.queueArray.pop();
    return this.queueArray;
  }

  // peek
  peek() {
    return this.queueArray[this.queueArray.length - 1];
  }
}

let queue = new Queue();
console.log("PUSH METHOD PERFORM");
console.log(queue.push(10));
console.log(queue.push(15));
console.log(queue.push(20));

console.log("POP METHOD PERFORM");
console.log(queue.pop());

console.log("PEEK METHOD PERFORM");
console.log(queue.peek());
