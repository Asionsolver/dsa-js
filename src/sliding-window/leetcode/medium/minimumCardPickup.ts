// 2260. Minimum Consecutive Cards to Pick Up

/**
Example 1:

Input: cards = [3,4,2,3,4,7]
Output: 4
Explanation: We can pick up the cards [3,4,2,3] which contain a matching pair of cards with value 3. Note that picking up the cards [4,2,3,4] is also optimal.
Example 2:

Input: cards = [1,0,5,3]
Output: -1
Explanation: There is no way to pick up a set of consecutive cards that contain a pair of matching cards.
*/

const minimumCardPickup = (cards: number[]): number => {
  let minLength = Infinity;
  // Map to store the last seen index of each card value
  const lastSeen = new Map<number, number>();

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    // If we have seen this card before, calculate the distance
    if (lastSeen.has(card)) {
      const prevIndex = lastSeen.get(card)!;
      const currentLength = i - prevIndex + 1;

      // Update the minimum length found so far
      if (currentLength < minLength) {
        minLength = currentLength;
      }
    }

    // Update the last seen index for the current card
    lastSeen.set(card, i);
  }

  // If minLength was never updated, no matching pair exists
  return minLength === Infinity ? -1 : minLength;
};

// Test cases
console.log(minimumCardPickup([3, 4, 2, 3, 4, 7])); // Output: 4
console.log(minimumCardPickup([1, 0, 5, 3])); // Output: -1
