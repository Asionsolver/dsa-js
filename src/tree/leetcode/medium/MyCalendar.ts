// 729. My Calendar I

/**
Example 1:

Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]

Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
*/

class CalendarNode {
  start: number;
  end: number;
  left: CalendarNode | null;
  right: CalendarNode | null;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.left = null;
    this.right = null;
  }
}

class MyCalendar {
  private root: CalendarNode | null;

  constructor() {
    this.root = null;
  }

  book(startTime: number, endTime: number): boolean {
    if (this.root === null) {
      this.root = new CalendarNode(startTime, endTime);
      return true;
    }

    let current: CalendarNode = this.root;

    while (true) {
      if (endTime <= current.start) {
        if (current.left === null) {
          current.left = new CalendarNode(startTime, endTime);
          return true;
        }
        current = current.left;
      } else if (startTime >= current.end) {
        if (current.right === null) {
          current.right = new CalendarNode(startTime, endTime);
          return true;
        }
        current = current.right;
      } else {
        return false;
      }
    }
  }
}

// --- LOCAL TESTING DRIVER CODE ---

// 1. Initialize the calendar and our output array
const myCalendar = new MyCalendar();
const output: (boolean | null)[] = [null]; // The constructor return is 'null' in LeetCode

// 2. Run the bookings and push the results to the output array
output.push(myCalendar.book(10, 20)); // Expected: true
output.push(myCalendar.book(15, 25)); // Expected: false
output.push(myCalendar.book(20, 30)); // Expected: true

// 3. Print the final result to the terminal
console.log("Output:", output);
