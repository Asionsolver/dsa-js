// 2836. Maximize Value of Function in a Ball Passing Game

/**
Example 1:

Input: receiver = [2,0,1], k = 4

Output: 6

Explanation:

Starting with player i = 2 the initial score is 2:

Pass	Sender Index	Receiver Index	Score
1	2	1	3
2	1	0	3
3	0	2	5
4	2	1	6
Example 2:

Input: receiver = [1,1,1,2,3], k = 3

Output: 10

Explanation:

Starting with player i = 4 the initial score is 4:

Pass	Sender Index	Receiver Index	Score
1	4	3	7
2	3	2	9
3	2	1	10

*/

function getMaxFunctionValue(receiver: number[], k: number): number {
  const n = receiver.length;

  // up[i] keeps track of where player `i` lands after 2^j steps
  let up = new Int32Array(receiver);

  // sum[i] keeps track of the accumulated score of the first 2^j steps starting from player `i`
  let sum = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    sum[i] = i;
  }

  let curr_score = new Float64Array(n);
  let curr_player = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    curr_score[i] = 0;
    curr_player[i] = i;
  }

  let kRemaining = k;

  // Pre-allocated arrays to be used as our swap buffers for the next power of 2 intervals
  let next_up = new Int32Array(n);
  let next_sum = new Float64Array(n);

  while (kRemaining > 0) {
    // If the current bit in k's binary representation is set
    if (kRemaining % 2 === 1) {
      for (let i = 0; i < n; i++) {
        curr_score[i] += sum[curr_player[i]];
        curr_player[i] = up[curr_player[i]];
      }
    }

    // Shift right by dividing by 2 and flooring
    kRemaining = Math.floor(kRemaining / 2);

    // Build up the destinations and scores of the next power of 2
    if (kRemaining > 0) {
      for (let i = 0; i < n; i++) {
        next_up[i] = up[up[i]];
        next_sum[i] = sum[i] + sum[up[i]];
      }

      // Swap array references (avoids expensive recurring memory allocations)
      let temp_up = up;
      up = next_up;
      next_up = temp_up;

      let temp_sum = sum;
      sum = next_sum;
      next_sum = temp_sum;
    }
  }

  // Compute the global maximum outcome score
  let max_score = 0;
  for (let i = 0; i < n; i++) {
    // Append the very last player destination landing index onto the score
    let total = curr_score[i] + curr_player[i];
    if (total > max_score) {
      max_score = total;
    }
  }

  return max_score;
}

// Example test cases
console.log(getMaxFunctionValue([2, 0, 1], 4)); // Output: 6
console.log(getMaxFunctionValue([1, 1, 1, 2, 3], 3)); // Output: 10
