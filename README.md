# IQ.js :: The Israeli Queue 

The so called “Israeli Queue” is a single server polling system with batch service of an unlimited size, where the next queue to be visited is the one in which the first customer in line has been waiting for the longest time.

## Usage

To install: `npm install israeli-queue` 

### require
    
    const IQ = require('israeli-queue');
    
    let q1 = new IQ();
    let q2 = new IQ();

## API

### *constructor*()

The constructor will create an in-memory Israeli queue data structure 

### dequeue()

Removes and returns the element of the priority queue which is first in line. Simply returns `false` if the priority queue is empty.

### enqueue(element, friend_element)

Inserts each given argument into the appropriate place in the priority queue. Returns the index of the inserted item.

### length()

Integer property which reflects the number of elements in the priority queue.

### peek()

Returns the element of the priority queue which is first in line without removing it.

### toString()

Returns the `.toString()` of an Array containing the priority queue's elements in sorted order. 

## Author

Dror Arazi (dror@sealights.io)

## License

MIT