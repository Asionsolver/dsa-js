const text = `
john.smith@company.com
customer123@email.com
support@example.org
(555) 123-4567
+1 (800) 555-0199
01724114339
ID:USER-1234
CODE:X-9B2-88C
ORD-9876
USR-1234
REQ-5678
SAVE20-2023
WINTER25
Name: John Smith
Email: john.smith@company.com
Phone: (555) 123-4567
Address: 123 Main St, New York, NY 10001
Username: jsmith_2023
Password: P@ssw0rd123!
IP: 192.168.1.100
Credit Card: 4111-1111-1111-1111
SSN: 123-45-6789
Date: 2023-12-01
[ERROR] 2023-12-01 10:30:25 - Database connection failed
[INFO] 2023-12-01 10:31:00 - User login successful (ID: USR-1234)
[WARN] 2023-12-01 10:32:15 - Disk space 85% full
[DEBUG] 2023-12-01 10:33:45 - Processing request ID: REQ-5678
[ERROR] 2023-12-01 10:35:10 - File not found: /var/www/data/report.pdf
Website: https://johndoe.com
`;

// phone
// const regex = /01[3-9]\d{8}/g;

//ID
// const regex = /[A-Z]{3,4}-\d{4}/g;

// email
// const regex = /\S+@\S+\.\S+/g;

// IP
// const regex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;

// Log Level
// const regex = /\[(ERROR|INFO|WARN|DEBUG)\]/g;

// code
// const regex = /[A-Z]+\d+-?\d*/g;

// time
// const regex = /\d{1,2}:\d{2}(?::\d{2})?/g;

// url
// const regex = /https?:\/\/[^\s]+/g;

// Filename
const regex = /\b\w+\.(pdf|jpg|csv)\b/g;

const matches = text.match(regex);
const index = text.search(regex);
const testing = regex.test(text);

console.log("Match: ", matches);
console.log("Index: ", index);
console.log("Testing: ", testing);
