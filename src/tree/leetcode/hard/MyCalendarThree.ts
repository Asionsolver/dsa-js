// 732. My Calendar III

/**
Example 1:

Input
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, 1, 1, 2, 3, 3, 3]

Explanation
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // return 1
myCalendarThree.book(50, 60); // return 1
myCalendarThree.book(10, 40); // return 2
myCalendarThree.book(5, 15); // return 3
myCalendarThree.book(5, 10); // return 3
myCalendarThree.book(25, 55); // return 3

*/

class MyCalendarThree {
  private timeline: Map<number, number>;

  constructor() {
    this.timeline = new Map<number, number>();
  }

  book(startTime: number, endTime: number): number {
    this.timeline.set(startTime, (this.timeline.get(startTime) || 0) + 1);
    this.timeline.set(endTime, (this.timeline.get(endTime) || 0) - 1);

    let maxK = 0;
    let currentK = 0;

    const times = Array.from(this.timeline.keys()).sort((a, b) => a - b);

    for (const time of times) {
      currentK += this.timeline.get(time)!;

      if (currentK > maxK) {
        maxK = currentK;
      }
    }

    return maxK;
  }
}

// 1. Initialize the output array (Starts with null for the constructor)
const output: (number | null)[] = [null];

// 2. Instantiate the class
const myCalendarThree = new MyCalendarThree();

// 3. Run the operations from Example 1 and push results to the output array
output.push(myCalendarThree.book(10, 20)); // return 1
output.push(myCalendarThree.book(50, 60)); // return 1
output.push(myCalendarThree.book(10, 40)); // return 2
output.push(myCalendarThree.book(5, 15)); // return 3
output.push(myCalendarThree.book(5, 10)); // return 3
output.push(myCalendarThree.book(25, 55)); // return 3

// 4. Print the final output array
console.log("Output:");
console.log(output);
