// 731. My Calendar II

/**
Example 1:

Input
["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, true, true, true, false, true, true]

Explanation
MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked. 
myCalendarTwo.book(50, 60); // return True, The event can be booked. 
myCalendarTwo.book(10, 40); // return True, The event can be double booked. 
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.

*/

class MyCalendarTwo {
  private overlaps: [number, number][];
  private events: [number, number][];

  constructor() {
    this.overlaps = [];
    this.events = [];
  }

  book(startTime: number, endTime: number): boolean {
    // 1. Check if the new event intersects with any existing double bookings.
    // If it does, this would create a triple booking.
    for (const [oStart, oEnd] of this.overlaps) {
      if (Math.max(startTime, oStart) < Math.min(endTime, oEnd)) {
        return false;
      }
    }

    // 2. Since it's a valid booking, find intersections with all existing events
    // to record new double bookings.
    for (const [eStart, eEnd] of this.events) {
      const overlapStart = Math.max(startTime, eStart);
      const overlapEnd = Math.min(endTime, eEnd);

      // If the start of the overlap is less than the end, an intersection exists
      if (overlapStart < overlapEnd) {
        this.overlaps.push([overlapStart, overlapEnd]);
      }
    }

    // 3. Add the valid event to the calendar
    this.events.push([startTime, endTime]);

    return true;
  }
}

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(startTime,endTime)
 */

let myCalendarTwo = new MyCalendarTwo();
console.log(myCalendarTwo.book(10, 20)); // return True, The event can be booked.
console.log(myCalendarTwo.book(50, 60)); // return True, The event can be booked.
console.log(myCalendarTwo.book(10, 40)); // return True, The event can be double booked.
console.log(myCalendarTwo.book(5, 15)); // return False, The event cannot be booked, because it would result in a triple booking.
console.log(myCalendarTwo.book(5, 10)); // return True, The event can be booked, as it does not use time 10 which is already double booked.
console.log(myCalendarTwo.book(25, 55)); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.
