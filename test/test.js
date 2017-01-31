'use strict';

const chai = require('chai'),
    IQ = require('../index');

chai.should();

describe('IQ', () => {
    describe('#primitive', () => {
        let queue;

        beforeEach(() => {
            queue = new IQ();
        });

        it('no member', () => {
            queue.enqueue().should.equal(false);
            queue.enqueue(undefined, undefined).should.equal(false);

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);

            queue.toString().should.equal("[]");
        });

        it('one simple member', () => {
            queue.enqueue(1).should.equal(1);

            queue.length().should.equal(1);
            queue.peek().should.equal(1);
            queue.dequeue().should.equal(1);

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);
        });

        it('many simple members', () => {
            queue.enqueue(1).should.equal(1);
            queue.enqueue(2).should.equal(2);

            queue.length().should.equal(2);
            queue.peek().should.equal(1);
            queue.dequeue().should.equal(1);

            queue.length().should.equal(1);
            queue.peek().should.equal(2);
            queue.dequeue().should.equal(2);

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);
        });

        it('many israeli members', () => {
            queue.enqueue(1,2).should.equal(1);
            queue.enqueue(2,3).should.equal(2);
            queue.enqueue('a', 1).should.equal(2);
            queue.enqueue('b', 'a').should.equal(3);

            queue.length().should.equal(4);
            queue.peek().should.equal(1);
            queue.dequeue().should.equal(1);

            queue.length().should.equal(3);
            queue.peek().should.equal('a');
            queue.dequeue().should.equal('a');

            queue.length().should.equal(2);
            queue.peek().should.equal('b');
            queue.dequeue().should.equal('b');

            queue.length().should.equal(1);
            queue.peek().should.equal(2);
            queue.dequeue().should.equal(2);

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);

            // replay to test dequeue went clean

            queue.enqueue(1,2).should.equal(1);
            queue.enqueue(2,3).should.equal(2);
            queue.enqueue('a', 1).should.equal(2);
            queue.enqueue('b', 'a').should.equal(3);

            queue.length().should.equal(4);
            queue.peek().should.equal(1);
            queue.dequeue().should.equal(1);

            queue.enqueue('c', 1).should.equal(4);

            queue.length().should.equal(4);
            queue.peek().should.equal('a');
            queue.dequeue().should.equal('a');

            queue.length().should.equal(3);
            queue.peek().should.equal('b');
            queue.dequeue().should.equal('b');

            queue.length().should.equal(2);
            queue.peek().should.equal(2);
            queue.dequeue().should.equal(2);

            queue.length().should.equal(1);
            queue.peek().should.equal('c');
            queue.dequeue().should.equal('c');

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);
        });

        it('israeli members with duplication', () => {
            queue.enqueue(1).should.equal(1);
            queue.enqueue(2).should.equal(2);
            queue.enqueue(2).should.equal(3);
            queue.enqueue(3, 2).should.equal(3);

            queue.length().should.equal(4);
            queue.peek().should.equal(1);
            queue.dequeue().should.equal(1);

            queue.length().should.equal(3);
            queue.peek().should.equal(2);
            queue.dequeue().should.equal(2);

            queue.length().should.equal(2);
            queue.peek().should.equal(3);
            queue.dequeue().should.equal(3);

            queue.enqueue(1).should.equal(2);
            queue.enqueue(2).should.equal(3);

            queue.length().should.equal(3);
            queue.peek().should.equal(2);
            queue.dequeue().should.equal(2);

            queue.length().should.equal(2);
            queue.peek().should.equal(1);
            queue.dequeue().should.equal(1);

            queue.length().should.equal(1);
            queue.peek().should.equal(2);
            queue.dequeue().should.equal(2);

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);
        });
    });
    describe('#object', () => {
        let queue;

        beforeEach(() => {
            queue = new IQ();
        });

        it('one simple member', () => {
            queue.enqueue({o:1}).should.equal(1);

            queue.length().should.equal(1);
            queue.peek().should.eql({o:1});
            queue.dequeue().should.eql({o:1});

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);
        });

        it('many simple members', () => {
            queue.enqueue({o:1}).should.equal(1);
            queue.enqueue({o:2}).should.equal(2);

            queue.length().should.equal(2);
            queue.peek().should.eql({o:1});
            queue.dequeue().should.eql({o:1});

            queue.length().should.equal(1);
            queue.peek().should.eql({o:2});
            queue.dequeue().should.eql({o:2});

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);
        });

        it('many israeli members', () => {
            queue.enqueue({o:1},{o:2}).should.equal(1);
            queue.enqueue({o:2},{o:3}).should.equal(2);
            queue.enqueue({o:'a'}, {o:1}).should.equal(2);
            queue.enqueue({o:'b'}, {o:'a'}).should.equal(3);

            queue.length().should.equal(4);
            queue.peek().should.eql({o:1});
            queue.dequeue().should.eql({o:1});

            queue.length().should.equal(3);
            queue.peek().should.eql({o:'a'});
            queue.dequeue().should.eql({o:'a'});

            queue.length().should.equal(2);
            queue.peek().should.eql({o:'b'});
            queue.dequeue().should.eql({o:'b'});

            queue.length().should.equal(1);
            queue.peek().should.eql({o:2});
            queue.dequeue().should.eql({o:2});

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);

            // replay to test dequeue went clean

            queue.enqueue({o:1},{o:2}).should.equal(1);
            queue.enqueue({o:2},{o:3}).should.equal(2);
            queue.enqueue({o:'a'}, {o:1}).should.equal(2);
            queue.enqueue({o:'b'}, {o:'a'}).should.equal(3);

            queue.length().should.equal(4);
            queue.peek().should.eql({o:1});
            queue.dequeue().should.eql({o:1});

            queue.enqueue({o:'c'}, {o:1}).should.equal(4);

            queue.length().should.equal(4);
            queue.peek().should.eql({o:'a'});
            queue.dequeue().should.eql({o:'a'});

            queue.length().should.equal(3);
            queue.peek().should.eql({o:'b'});
            queue.dequeue().should.eql({o:'b'});

            queue.length().should.equal(2);
            queue.peek().should.eql({o:2});
            queue.dequeue().should.eql({o:2});

            queue.length().should.equal(1);
            queue.peek().should.eql({o:'c'});
            queue.dequeue().should.eql({o:'c'});

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);
        });

        it('israeli members with duplication', () => {
            queue.enqueue({o:1}).should.equal(1);
            queue.enqueue({o:2}).should.equal(2);
            queue.enqueue({o:2}).should.equal(3);
            queue.enqueue({o:3}, {o:2}).should.equal(3);

            queue.length().should.equal(4);
            queue.peek().should.eql({o:1});
            queue.dequeue().should.eql({o:1});

            queue.length().should.equal(3);
            queue.peek().should.eql({o:2});
            queue.dequeue().should.eql({o:2});

            queue.length().should.equal(2);
            queue.peek().should.eql({o:3});
            queue.dequeue().should.eql({o:3});

            queue.enqueue({o:1}).should.equal(2);
            queue.enqueue({o:2}).should.equal(3);

            queue.length().should.equal(3);
            queue.peek().should.eql({o:2});
            queue.dequeue().should.eql({o:2});

            queue.length().should.equal(2);
            queue.peek().should.eql({o:1});
            queue.dequeue().should.eql({o:1});

            queue.length().should.equal(1);
            queue.peek().should.eql({o:2});
            queue.dequeue().should.eql({o:2});

            queue.length().should.equal(0);
            queue.peek().should.equal(false);
            queue.dequeue().should.equal(false);
        });
    });
});