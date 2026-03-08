// 1980. Find Unique Binary String

/**
Example 1:

Input: nums = ["01","10"]
Output: "11"
Explanation: "11" does not appear in nums. "00" would also be correct.
Example 2:

Input: nums = ["00","01"]
Output: "11"
Explanation: "11" does not appear in nums. "10" would also be correct.
Example 3:

Input: nums = ["111","011","001"]
Output: "101"
Explanation: "101" does not appear in nums. "000", "010", "100", and "110" would also be correct.
*/
const nums = ["01", "10"];
const findDifferentBinaryString = function (nums: string[]): string {
  let result = "";

  for (let i = 0; i < nums.length; i++) {
    // Look at the i-th character of the i-th string.
    // If it is '0', append '1' to the result. If it's '1', append '0'.
    result += nums[i][i] === "0" ? "1" : "0";
  }

  return result;
};

console.log(findDifferentBinaryString(nums));
