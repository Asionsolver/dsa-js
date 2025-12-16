// check if the sentence is pangram
// const sentence = "thequickbrownfoxjumpsoverthelazydog";
const sentence = "leetcode";

const checkIfPangram = function (sentence: string) {
  let set = new Set();

  for (const element of sentence) {
    set.add(element);
  }

  return set.size == 26;
};

if (checkIfPangram(sentence)) {
  console.log("Sentence is Pangram.");
} else {
  console.log("Sentence is not Pangram");
}
