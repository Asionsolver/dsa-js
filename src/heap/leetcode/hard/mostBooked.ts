// 2402. Meeting Rooms III

/**
Example 1:

Input: n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
Output: 0
Explanation:
- At time 0, both rooms are not being used. The first meeting starts in room 0.
- At time 1, only room 1 is not being used. The second meeting starts in room 1.
- At time 2, both rooms are being used. The third meeting is delayed.
- At time 3, both rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 1 finishes. The third meeting starts in room 1 for the time period [5,10).
- At time 10, the meetings in both rooms finish. The fourth meeting starts in room 0 for the time period [10,11).
Both rooms 0 and 1 held 2 meetings, so we return 0. 
Example 2:

Input: n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
Output: 1
Explanation:
- At time 1, all three rooms are not being used. The first meeting starts in room 0.
- At time 2, rooms 1 and 2 are not being used. The second meeting starts in room 1.
- At time 3, only room 2 is not being used. The third meeting starts in room 2.
- At time 4, all three rooms are being used. The fourth meeting is delayed.
- At time 5, the meeting in room 2 finishes. The fourth meeting starts in room 2 for the time period [5,10).
- At time 6, all three rooms are being used. The fifth meeting is delayed.
- At time 10, the meetings in rooms 1 and 2 finish. The fifth meeting starts in room 1 for the time period [10,12).
Room 0 held 1 meeting while rooms 1 and 2 each held 2 meetings, so we return 1. 
 
*/

const n = 2,
  meetings = [
    [0, 10],
    [1, 5],
    [2, 7],
    [3, 4],
  ];

const mostBooked = function (n: number, meetings: number[][]) {
  // Helper class for Priority Queue implementation
  class MinHeap<T> {
    private data: T[];
    private compare: (a: T, b: T) => number;

    constructor(compare: (a: T, b: T) => number) {
      this.data = [];
      this.compare = compare;
    }

    push(val: T): void {
      this.data.push(val);
      this._bubbleUp(this.data.length - 1);
    }

    pop(): T | undefined {
      if (this.size() === 0) return undefined;
      const top = this.data[0];
      const bottom = this.data.pop()!;
      if (this.size() > 0) {
        this.data[0] = bottom;
        this._bubbleDown(0);
      }
      return top;
    }

    peek(): T | undefined {
      return this.data[0];
    }

    size(): number {
      return this.data.length;
    }

    private _bubbleUp(index: number): void {
      while (index > 0) {
        const parentIndex = (index - 1) >>> 1;
        if (this.compare(this.data[index], this.data[parentIndex]) < 0) {
          [this.data[index], this.data[parentIndex]] = [
            this.data[parentIndex],
            this.data[index],
          ];
          index = parentIndex;
        } else {
          break;
        }
      }
    }

    private _bubbleDown(index: number): void {
      const lastIndex = this.data.length - 1;
      while (true) {
        const leftIndex = index * 2 + 1;
        const rightIndex = index * 2 + 2;
        let smallestIndex = index;

        if (
          leftIndex <= lastIndex &&
          this.compare(this.data[leftIndex], this.data[smallestIndex]) < 0
        ) {
          smallestIndex = leftIndex;
        }
        if (
          rightIndex <= lastIndex &&
          this.compare(this.data[rightIndex], this.data[smallestIndex]) < 0
        ) {
          smallestIndex = rightIndex;
        }

        if (smallestIndex !== index) {
          [this.data[index], this.data[smallestIndex]] = [
            this.data[smallestIndex],
            this.data[index],
          ];
          index = smallestIndex;
        } else {
          break;
        }
      }
    }
  }

  // Sort meetings by start time
  meetings.sort((a, b) => a[0] - b[0]);

  // Count of meetings per room
  const meetingCounts = new Array(n).fill(0);

  // MinHeap for unused rooms: stores room indices.
  // Comparison simply sorts by lowest index.
  const unusedRooms = new MinHeap<number>((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    unusedRooms.push(i);
  }

  // MinHeap for used rooms: stores { endTime, roomIndex }.
  // Comparison sorts by earliest endTime, then by lowest roomIndex.
  type UsedRoom = { endTime: number; roomIndex: number };
  const usedRooms = new MinHeap<UsedRoom>((a, b) => {
    if (a.endTime !== b.endTime) {
      return a.endTime - b.endTime;
    }
    return a.roomIndex - b.roomIndex;
  });

  for (const [start, end] of meetings) {
    const duration = end - start;

    // 1. Release rooms that finish before or at the current meeting's start time
    while (usedRooms.size() > 0 && usedRooms.peek()!.endTime <= start) {
      const room = usedRooms.pop()!;
      unusedRooms.push(room.roomIndex);
    }

    // 2. Allocate room
    if (unusedRooms.size() > 0) {
      // If there are unused rooms, pick the one with the lowest index
      const roomIndex = unusedRooms.pop()!;
      meetingCounts[roomIndex]++;
      usedRooms.push({ endTime: end, roomIndex });
    } else {
      // If no rooms are available, we must wait for the earliest one to finish.
      // Note: The meeting is delayed, but duration remains the same.

      // Get the room that finishes earliest
      const earliestRoom = usedRooms.pop()!;
      const newEndTime = earliestRoom.endTime + duration;

      meetingCounts[earliestRoom.roomIndex]++;

      // Important: We used the earliest available room.
      // However, other rooms might also finish at the exact same 'earliestRoom.endTime'.
      // The heap logic ensures that if endTimes are equal, we popped the one with the smallest index.
      // But to be perfectly safe with logic (and consistent with "When a room becomes unused..."),
      // we effectively fast-forward time to earliestRoom.endTime.

      usedRooms.push({
        endTime: newEndTime,
        roomIndex: earliestRoom.roomIndex,
      });
    }
  }

  // Find the room with the maximum meetings
  let maxMeetings = -1;
  let resultRoom = -1;

  for (let i = 0; i < n; i++) {
    if (meetingCounts[i] > maxMeetings) {
      maxMeetings = meetingCounts[i];
      resultRoom = i;
    }
  }

  return resultRoom;
};

console.log(mostBooked(n, meetings));
