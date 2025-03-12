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
        let newNode = {
            value: data,
            next: null
        }

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

}

let list = new SinglyLinkedList();
// console.log(list);

// console.log(list.isEmpty())

list.push(5);
// console.log(list.isEmpty());
// console.log(list);

list.push(10);

list.push(12);
list.push(14);
list.push(15);
console.log(list);
console.log(list.tail.next)