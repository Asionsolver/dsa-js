// 3606. Coupon Code Validator

/**
Example 1:

Input: code = ["SAVE20","","PHARMA5","SAVE@20"], businessLine = ["restaurant","grocery","pharmacy","restaurant"], isActive = [true,true,true,true]

Output: ["PHARMA5","SAVE20"]

Explanation:

First coupon is valid.
Second coupon has empty code (invalid).
Third coupon is valid.
Fourth coupon has special character @ (invalid).
Example 2:

Input: code = ["GROCERY15","ELECTRONICS_50","DISCOUNT10"], businessLine = ["grocery","electronics","invalid"], isActive = [false,true,true]

Output: ["ELECTRONICS_50"]

Explanation:

First coupon is inactive (invalid).
Second coupon is valid.
Third coupon has invalid business line (invalid).
*/
const code = ["SAVE20", "", "PHARMA5", "SAVE@20"],
  businessLine = ["restaurant", "grocery", "pharmacy", "restaurant"],
  isActive = [true, true, true, true];
const validateCoupons = function (
  code: string[],
  businessLine: string[],
  isActive: boolean[]
) {
  // 1. Create the Hash Table (Buckets)
  // We only create entries for valid categories. This acts as our validation set too.
  const validBuckets: Record<string, string[]> = {
    electronics: [],
    grocery: [],
    pharmacy: [],
    restaurant: [],
  };

  const n = code.length;
  const codeRegex = /^[a-zA-Z0-9_]+$/;

  // 2. Iterate and Populate Buckets
  for (let i = 0; i < n; i++) {
    // Condition 3: Must be active
    if (!isActive[i]) continue;

    const currentLine = businessLine[i];
    const currentCode = code[i];

    // Condition 2: Must be a valid business line
    // We check if the key exists in our predefined hash table
    if (!Object.prototype.hasOwnProperty.call(validBuckets, currentLine)) {
      continue;
    }

    // Condition 1: Code validation
    // Check non-empty and Regex match
    if (currentCode.length === 0 || !codeRegex.test(currentCode)) {
      continue;
    }

    // Add to the specific bucket (Grouping)
    validBuckets[currentLine].push(currentCode);
  }

  // 3. & 4. Sort internally and Concatenate in specific order
  const result: string[] = [];

  // We explicitly define the order here to satisfy the requirement:
  // "electronics", "grocery", "pharmacy", "restaurant"
  const orderedKeys = ["electronics", "grocery", "pharmacy", "restaurant"];

  for (const key of orderedKeys) {
    // Sort the codes within this specific category lexicographically
    validBuckets[key].sort();

    // Spread the sorted codes into the result array
    result.push(...validBuckets[key]);
  }

  return result;
};

console.log(validateCoupons(code, businessLine, isActive));
