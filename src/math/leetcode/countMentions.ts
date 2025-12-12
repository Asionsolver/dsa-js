// 3433. Count Mentions Per User

/**
Example 1:

Input: numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]]

Output: [2,2]

Explanation:

Initially, all users are online.

At timestamp 10, id1 and id0 are mentioned. mentions = [1,1]

At timestamp 11, id0 goes offline.

At timestamp 71, id0 comes back online and "HERE" is mentioned. mentions = [2,2]

Example 2:

Input: numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","12","ALL"]]

Output: [2,2]

Explanation:

Initially, all users are online.

At timestamp 10, id1 and id0 are mentioned. mentions = [1,1]

At timestamp 11, id0 goes offline.

At timestamp 12, "ALL" is mentioned. This includes offline users, so both id0 and id1 are mentioned. mentions = [2,2]

Example 3:

Input: numberOfUsers = 2, events = [["OFFLINE","10","0"],["MESSAGE","12","HERE"]]

Output: [0,1]

Explanation:

Initially, all users are online.

At timestamp 10, id0 goes offline.

At timestamp 12, "HERE" is mentioned. Because id0 is still offline, they will not be mentioned. mentions = [0,1]


 */

const numberOfUsers = 2,
  events = [
    ["MESSAGE", "10", "id1 id0"],
    ["OFFLINE", "11", "0"],
    ["MESSAGE", "71", "HERE"],
  ];
const countMentions = function (numberOfUsers: number, events: string[][]) {
  // Array to store mention counts for each user
  const mentions: number[] = new Array(numberOfUsers).fill(0);

  // Array to track when a user comes back online.
  // onlineTime[i] = t means user i is offline until time t.
  // If current time >= t, the user is online.
  const onlineTime: number[] = new Array(numberOfUsers).fill(0);

  // Map events to a structured object and sort them
  const sortedEvents = events
    .map((event) => ({
      type: event[0],
      timestamp: parseInt(event[1]),
      data: event[2],
    }))
    .sort((a, b) => {
      // Primary sort: Timestamp ascending
      if (a.timestamp !== b.timestamp) {
        return a.timestamp - b.timestamp;
      }
      // Secondary sort: OFFLINE events must happen before MESSAGE events at the same time
      if (a.type === "OFFLINE") return -1;
      return 1;
    });

  for (const event of sortedEvents) {
    if (event.type === "OFFLINE") {
      const userId = parseInt(event.data);
      // User becomes offline at this timestamp and stays offline for 60 units.
      // They are back online at timestamp + 60.
      onlineTime[userId] = event.timestamp + 60;
    } else {
      // Handle MESSAGE event
      const mentionString = event.data;

      if (mentionString === "ALL") {
        // Mentions all users, regardless of status
        for (let i = 0; i < numberOfUsers; i++) {
          mentions[i]++;
        }
      } else if (mentionString === "HERE") {
        // Mentions all online users
        for (let i = 0; i < numberOfUsers; i++) {
          // Check if user is online
          // A user is online if current timestamp >= the time they come back
          if (event.timestamp >= onlineTime[i]) {
            mentions[i]++;
          }
        }
      } else {
        // Mentions specific user IDs (e.g., "id0 id1 id0")
        const tokens = mentionString.split(" ");
        for (const token of tokens) {
          // Parse "id<number>" -> <number>
          const userId = parseInt(token.substring(2));
          mentions[userId]++;
        }
      }
    }
  }

  return mentions;
};

console.log(countMentions(numberOfUsers, events));
