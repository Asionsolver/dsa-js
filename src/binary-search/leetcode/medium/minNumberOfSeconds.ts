// 3296. Minimum Number of Seconds to Make Mountain Height Zero

/**
Example 1:

Input: mountainHeight = 4, workerTimes = [2,1,1]

Output: 3

Explanation:

One way the height of the mountain can be reduced to 0 is:

Worker 0 reduces the height by 1, taking workerTimes[0] = 2 seconds.
Worker 1 reduces the height by 2, taking workerTimes[1] + workerTimes[1] * 2 = 3 seconds.
Worker 2 reduces the height by 1, taking workerTimes[2] = 1 second.
Since they work simultaneously, the minimum time needed is max(2, 3, 1) = 3 seconds.

Example 2:

Input: mountainHeight = 10, workerTimes = [3,2,2,4]

Output: 12

Explanation:

Worker 0 reduces the height by 2, taking workerTimes[0] + workerTimes[0] * 2 = 9 seconds.
Worker 1 reduces the height by 3, taking workerTimes[1] + workerTimes[1] * 2 + workerTimes[1] * 3 = 12 seconds.
Worker 2 reduces the height by 3, taking workerTimes[2] + workerTimes[2] * 2 + workerTimes[2] * 3 = 12 seconds.
Worker 3 reduces the height by 2, taking workerTimes[3] + workerTimes[3] * 2 = 12 seconds.
The number of seconds needed is max(9, 12, 12, 12) = 12 seconds.

Example 3:

Input: mountainHeight = 5, workerTimes = [1]

Output: 15

Explanation:

There is only one worker in this example, so the answer is workerTimes[0] + workerTimes[0] * 2 + workerTimes[0] * 3 + workerTimes[0] * 4 + workerTimes[0] * 5 = 15.
*/

const mountainHeight = 5,
  workerTimes = [1];

const minNumberOfSeconds = function (
  mountainHeight: number,
  workerTimes: number[],
): number {
  let minBaseTime = workerTimes[0];
  const freqMap = new Map<number, number>();

  // Group identical worker times and find the globally fastest individual time
  for (let i = 0; i < workerTimes.length; i++) {
    const t = workerTimes[i];
    if (t < minBaseTime) {
      minBaseTime = t;
    }
    freqMap.set(t, (freqMap.get(t) || 0) + 1);
  }

  const uniqueWorkers: { base: bigint; count: bigint }[] = [];
  for (const [t, count] of freqMap.entries()) {
    uniqueWorkers.push({ base: BigInt(t), count: BigInt(count) });
  }

  // Process faster workers first. Maximize early break probability inside inner loop
  uniqueWorkers.sort((a, b) =>
    a.base < b.base ? -1 : a.base > b.base ? 1 : 0,
  );

  const mH = BigInt(mountainHeight);
  let low = 1n;
  // Maximum time taken if only the fastest single worker reduced the entire mountain standalone
  let high = (BigInt(minBaseTime) * mH * (mH + 1n)) / 2n;
  let ans = high;

  while (low <= high) {
    const mid = (low + high) / 2n;
    let totalAssigned = 0n;

    for (let i = 0; i < uniqueWorkers.length; i++) {
      const maxVal = (2n * mid) / uniqueWorkers[i].base;

      // Using standard double precision Math.sqrt to form a highly accurate initial guess
      let guess = Math.floor(Math.sqrt(Number(maxVal)));
      let x = BigInt(guess);

      // Refine the guess precisely employing arbitrary precision boundaries
      while (x * (x + 1n) > maxVal) {
        x -= 1n;
      }
      while ((x + 1n) * (x + 2n) <= maxVal) {
        x += 1n;
      }

      totalAssigned += x * uniqueWorkers[i].count;

      // Reached our milestone early, effectively preventing needless computations
      if (totalAssigned >= mH) {
        break;
      }
    }

    if (totalAssigned >= mH) {
      ans = mid; // Store possible answer, seek tighter bounds
      high = mid - 1n;
    } else {
      low = mid + 1n;
    }
  }

  return Number(ans);
};

console.log(minNumberOfSeconds(mountainHeight, workerTimes));
