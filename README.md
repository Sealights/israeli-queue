# IQ.js :: The Israeli Queue 

a priority queue with the following order rule: After completion of a visit at a queue, the next
queue to be served is the one where its first customer in line has been
waiting in the system for the longest time. That is, the criterion for
selecting the next queue to visit and serve is an age-based one. This type of
service discipline was termed the Israeli Queue, illustrated vividly as follows:
A new arriving customer may find in the system up to N groups, where
each group is headed by a “leader.” This new arrival looks for a “friend”
among all group leaders in the system. If he (“he” stands for “she” as well)
finds such a leader, he joins him and his group and waits with all the
group’s members to be served in a batch mode. That is, the whole group is served at one service period, while the service duration is not affected
by the size of the batch. For example, this queue discipline represents a
physical waiting line for buying tickets to a movie, theater, or rock-concert
performance. A new arrival that finds a friend already standing in line joins
him and his group. When the “leader” reaches the cashier, he buys tickets
for the entire group. It is assumed that the buying process is (almost) not
affected by the number of tickets purchased.

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