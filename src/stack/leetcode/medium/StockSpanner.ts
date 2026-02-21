// 901. Online Stock Span

/**
Example 1:

Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6

*/

// 1. The Class Definition (The solution)
class StockSpanner {
  private stack: [number, number][];

  constructor() {
    this.stack = [];
  }

  next(price: number): number {
    let span = 1;

    // While stack not empty AND top price <= current price
    while (
      this.stack.length > 0 &&
      this.stack[this.stack.length - 1][0] <= price
    ) {
      const [prevPrice, prevSpan] = this.stack.pop()!;
      span += prevSpan;
    }

    this.stack.push([price, span]);
    return span;
  }
}

// 2. The Driver Code (To see the output)
function runTest() {
  // Input from Example 1
  const inputs = [100, 80, 60, 70, 60, 75, 85];

  console.log("Starting StockSpanner...");
  const stockSpanner = new StockSpanner();

  inputs.forEach((price) => {
    const result = stockSpanner.next(price);
    console.log(`Input: ${price} -> Span: ${result}`);
  });
}

// Run the test
runTest();
