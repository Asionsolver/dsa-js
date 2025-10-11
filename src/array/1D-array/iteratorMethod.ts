import { it } from "node:test";

interface Customer {
  id: number;
  f_name: string;
  l_name: string;
  gender: string;
  married: boolean;
  age: number;
  expense: number;
  purchased: string[];
}

// The Customer Array

let customers: Customer[] = [
  {
    id: 1,
    f_name: "Abby",
    l_name: "Thomas",
    gender: "M",
    married: true,
    age: 32,
    expense: 500,
    purchased: ["Shampoo", "Toys", "Book"],
  },
  {
    id: 2,
    f_name: "Jerry",
    l_name: "Tom",
    gender: "M",
    married: true,
    age: 64,
    expense: 100,
    purchased: ["Stick", "Blade"],
  },
  {
    id: 3,
    f_name: "Dianna",
    l_name: "Cherry",
    gender: "F",
    married: true,
    age: 22,
    expense: 1500,
    purchased: ["Lipstik", "Nail Polish", "Bag", "Book"],
  },
  {
    id: 4,
    f_name: "Dev",
    l_name: "Currian",
    gender: "M",
    married: true,
    age: 82,
    expense: 90,
    purchased: ["Book"],
  },
  {
    id: 5,
    f_name: "Maria",
    l_name: "Gomes",
    gender: "F",
    married: false,
    age: 7,
    expense: 300,
    purchased: ["Toys"],
  },
  {
    id: 6,
    f_name: "Mari",
    l_name: "Tony",
    gender: "F",
    married: false,
    age: 70,
    expense: 300,
    purchased: ["Book", "Toy"],
  },
  {
    id: 7,
    f_name: "Henry",
    l_name: "Nicole",
    gender: "M",
    married: false,
    age: 8,
    expense: 300,
    purchased: ["Toy"],
  },
  //   {
  //     id: 8,
  //     f_name: "Dev",
  //     l_name: "Monohor",
  //     gender: "M",
  //     married: true,
  //     age: 82,
  //     expense: 0,
  //     purchased: [],
  //   },
];

// filter

// filtering out non-Senior Citizens
// const nonSenior = customers.filter((customer) => {
//   if (customer?.age < 60) {
//     return customer;
//   }
// });

// console.log(nonSenior);

// filtering out Senior Citizens
// const senior = customers.filter((customer) => {
//   if (customer?.age > 60) {
//     return customer;
//   }
// });

// console.log(senior);

// map
// return full name of each customer

// console.log(
//   customers.map((customer) => ({
//     // return customer.f_name + " " + customer.l_name;
//     ...customer,
//     full_name: `${
//       customer.gender === "M" ? "Mr." : customer.married ? "Mrs." : "Miss"
//     } ${customer?.f_name} ${customer?.l_name}`,
//   }))
// );

// reduce

// let bookBuyingCustomer = 0;
// const totalAge = customers.reduce((acc, customer, curIndex, array) => {
//   if (customer?.purchased?.includes("Book")) {
//     acc = acc + customer?.age;
//     bookBuyingCustomer++;
//   }
//   return acc;
// }, 0);

// const avgBookBuyingCustomer = Math.floor(totalAge / bookBuyingCustomer);
// console.log(avgBookBuyingCustomer);

// console.log(
//   customers.some((customer) => {
//     return customer?.age < 10;
//   })
// );

// console.log(
//   customers.find((customer) => {
//     return customer?.age < 10;
//   })
// );

// console.log(
//   customers.findIndex((customer) => {
//     return customer?.age < 10;
//   })
// );

// console.log(
//   customers.findLastIndex((customer) => {
//     return customer?.age < 10;
//   })
// );

// console.log(
//   customers.every((customer) => {
//     return customer?.purchased?.length === 0;
//   })
// );

// console.log(
//   customers.some((customer) => {
//     return customer?.purchased?.length === 0;
//   })
// );

const numberArr = [1, 2, 3, 4];
// for (const [key, value] of numberArr.entries()) {
//   console.log(key, value);
// }

// for (const value of numberArr.values()) {
//   console.log(value);
// }

// console.log(
//   numberArr.flatMap((item) => {
//     return item * 2;
//   })
// );

const nestedArr = numberArr.map((item) => [item * 2]);

// console.log(nestedArr.flatMap((item) => [item]));

console.log(numberArr.flatMap((item) => [item * 2]));
