// const text = "#2A2A2A #2a2a2a 2a2a2a hello year travel"; // #2A 2A2A
// const regex = /#?([\da-zA-z]{2})([\da-zA-z]{2})([\da-zA-z]{2})/g;
const text =
  "+88-01910302649 01310302649 724114339 +88-01710725954 8801724114339 +8801724114339"; // +88-01910302649
const regex = /(\+88)?-?01[1-9]\d{8}/g;
const matches = text.match(regex);
const index = text.search(regex);
// const replaced = text.replace(regex, "#000000");
const replaced = text.replace(regex, "true");
const testing = regex.test(text);

console.log("Match: ", matches);
console.log("Index: ", index);
console.log("Replaced: ", replaced);
console.log("Testing: ", testing);
