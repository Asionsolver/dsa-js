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
// console.log(list.tail.next)

console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list.pop());
console.log(list)