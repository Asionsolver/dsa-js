class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

// let first = new Node(1);
// console.log(first);


class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }


    // check if the list is empty
    isEmpty() {
        return this.length === 0;
    }

    // add a new node or data

    push(data) {
        // create a new node
        let newNode = new Node(data);

        // check if the list is empty
        if (this.isEmpty()) {
            // if the list is empty, set the head and tail to the new node
            this.head = newNode;
            this.tail = newNode;
            // increment the length
            this.length++;
        } else {
            // if the list is not empty, set the next property of the tail to the new node
            this.tail.next = newNode;
            // set the tail to the new node
            this.tail = newNode;
            // increment the length
            this.length++;
        }
    }

    // remove the last node
    pop() {
        if (!this.head) {
            return null;
        }

        if (this.length === 1) {
            let removedNode = this.head;
            this.head = null;
            this.tail = null;
            this.length = 0;
            return removedNode;
        }

        let currentNode = this.head;
        let lastNode = this.tail;
        let newLastNode;

        while (currentNode) {
            if (currentNode.next === lastNode) {
                newLastNode = currentNode;
                break;
            }
            currentNode = currentNode.next;

        }

        newLastNode.next = null;
        this.tail = newLastNode;
        this.length--;
        return lastNode;
    }

    // remove the first node
    shift() {
        if (!this.head) {
            return null;
        }

        let removedNode = this.head;
        this.head = this.head.next;
        this.length--;

        if (this.length === 0) {
            this.tail = null;
        }

        return removedNode;
    }

    // add a new node or data at the beginning of the list
    unshift(data) {
        let newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;

        } else {
            newNode.next = this.head;
            this.head = newNode;
            this.length++;
        }
    }


    // show the list
    showList() {
        let arr = [];
        let currentNode = this.head;
        while (currentNode) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }
}

let list = new SinglyLinkedList();
// console.log(list);

// console.log(list.isEmpty())

list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
// console.log(list.isEmpty());
// console.log(list);

list.push(10);
list.push(12);
list.push(14);
list.push(15);
console.log(list);
// console.log(list.tail.next)

// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list)

// console.log(list.shift());
list.shift();
console.log(list);

list.unshift(1);
console.log(list);


console.log(list.showList());
