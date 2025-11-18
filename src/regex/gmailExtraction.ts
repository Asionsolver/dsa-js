const text = `
name%tag@gmail.com
me+spam@gmail.com
 test-user@gmail.com
user_name123@gmail.com  
Email: user@gmail.com
Contact: person@yahoo.com
Gmail: test.user@gmail.com
Work: employee@company.com
Personal: mymail@gmail.com
`;
// Only gmail addresses
const regex = /\b[a-zA-Z0-9._%+-]+@gmail\.com\b/g;

const matches = text.match(regex);
const index = text.search(regex);
const testing = regex.test(text);

console.log("Match: ", matches);
console.log("Index: ", index);
console.log("Testing: ", testing);
