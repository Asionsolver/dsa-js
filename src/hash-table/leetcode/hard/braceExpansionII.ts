// 1096. Brace Expansion II

/**
Under the grammar given below, strings can represent a set of lowercase words. Let R(expr) denote the set of words the expression represents.

The grammar can best be understood through simple examples:

Single letters represent a singleton set containing that word.
R("a") = {"a"}
R("w") = {"w"}
When we take a comma-delimited list of two or more expressions, we take the union of possibilities.
R("{a,b,c}") = {"a","b","c"}
R("{{a,b},{b,c}}") = {"a","b","c"} (notice the final set only contains each word at most once)
When we concatenate two expressions, we take the set of possible concatenations between two words where the first word comes from the first expression and the second word comes from the second expression.
R("{a,b}{c,d}") = {"ac","ad","bc","bd"}
R("a{b,c}{d,e}f{g,h}") = {"abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"}
Formally, the three rules for our grammar:

For every lowercase letter x, we have R(x) = {x}.
For expressions e1, e2, ... , ek with k >= 2, we have R({e1, e2, ...}) = R(e1) ∪ R(e2) ∪ ...
For expressions e1 and e2, we have R(e1 + e2) = {a + b for (a, b) in R(e1) × R(e2)}, where + denotes concatenation, and × denotes the cartesian product.
Given an expression representing a set of words under the given grammar, return the sorted list of words that the expression represents.
*/

/**
Example 1:

Input: expression = "{a,b}{c,{d,e}}"
Output: ["ac","ad","ae","bc","bd","be"]
Example 2:

Input: expression = "{{a,z},a{b,c},{ab,z}}"
Output: ["a","ab","ac","z"]
Explanation: Each distinct word is written only once in the final answer.
*/

/**
Constraints:

1 <= expression.length <= 60
expression[i] consists of '{', '}', ','or lowercase English letters.
The given expression represents a set of words based on the grammar given in the description.
*/

// Brute Force Approach
// function braceExpansionII(expression: string): string[] {
//   // Queue to hold intermediate strings during expansion.
//   const queue: string[] = [expression];

//   // Set to avoid processing identical intermediate expressions.
//   const seen = new Set<string>([expression]);

//   // Set to collect the final evaluated words.
//   const resultSet = new Set<string>();

//   while (queue.length > 0) {
//     const current = queue.shift()!;

//     // Find the first closing brace.
//     const right = current.indexOf("}");

//     // If no closing brace is found, this string is fully expanded.
//     if (right === -1) {
//       resultSet.add(current);
//       continue;
//     }

//     // Find the nearest opening brace before this closing brace.
//     const left = current.lastIndexOf("{", right);

//     // Extract the prefix, suffix, and the inner comma-separated choices.
//     const prefix = current.substring(0, left);
//     const suffix = current.substring(right + 1);
//     const choices = current.substring(left + 1, right).split(",");

//     for (const choice of choices) {
//       const nextExpression = prefix + choice + suffix;
//       if (!seen.has(nextExpression)) {
//         seen.add(nextExpression);
//         queue.push(nextExpression);
//       }
//     }
//   }

//   // Return the distinct words sorted lexicographically.
//   return Array.from(resultSet).sort();
// }

// Optimized Approach
function braceExpansionII(expression: string): string[] {
  let index = 0;

  // Helper function to calculate the Cartesian product of two sets of strings.
  function cartesianProduct(setA: Set<string>, setB: Set<string>): Set<string> {
    const product = new Set<string>();
    for (const wordA of setA) {
      for (const wordB of setB) {
        product.add(wordA + wordB);
      }
    }
    return product;
  }

  // Factor represents either a base word or a braced sub-expression.
  function parseFactor(): Set<string> {
    if (expression[index] === "{") {
      // Skip the opening brace '{'.
      index++;
      const subResult = parseExpr();
      // Skip the closing brace '}'.
      index++;
      return subResult;
    } else {
      // Read consecutive lowercase letters.
      let word = "";
      while (
        index < expression.length &&
        expression[index] >= "a" &&
        expression[index] <= "z"
      ) {
        word += expression[index];
        index++;
      }
      return new Set<string>([word]);
    }
  }

  // Term represents adjacent factors concatenated together (Cartesian Product).
  function parseTerm(): Set<string> {
    // Identity element for concatenation is a set with an empty string.
    let termResult = new Set<string>([""]);

    while (
      index < expression.length &&
      expression[index] !== "}" &&
      expression[index] !== ","
    ) {
      const nextFactor = parseFactor();
      termResult = cartesianProduct(termResult, nextFactor);
    }

    return termResult;
  }

  // Expression represents comma-separated terms combined via Union.
  function parseExpr(): Set<string> {
    const exprResult = new Set<string>();

    while (index < expression.length && expression[index] !== "}") {
      const currentTerm = parseTerm();

      // Perform union with the accumulated expression result.
      for (const word of currentTerm) {
        exprResult.add(word);
      }

      // Skip the comma to move to the next term in the union.
      if (index < expression.length && expression[index] === ",") {
        index++;
      }
    }

    return exprResult;
  }

  // Parse the entire expression starting from index 0.
  const resultSet = parseExpr();

  // Return the sorted distinct words as an array.
  return Array.from(resultSet).sort();
}

// Example usage:
const expression1 = "{a,b}{c,{d,e}}";
console.log(braceExpansionII(expression1)); // Output: ["ac","ad","ae","bc","bd","be"]

const expression2 = "{{a,z},a{b,c},{ab,z}}";
console.log(braceExpansionII(expression2)); // Output: ["a","ab","ac","z"]
