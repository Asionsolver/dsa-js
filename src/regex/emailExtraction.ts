const text = `
Name: John Smith
Email: john.smith@company.com
Phone: (555) 123-4567
Email: customer123@email.com
Contact: support@example.org
`;

const regex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

const matches = text.match(regex);
const index = text.search(regex);
const testing = regex.test(text);

console.log("Match: ", matches);
console.log("Index: ", index);
console.log("Testing: ", testing);
