'use strict';

module.exports = class IQ {
    constructor( queue = [], members = {}) {
        this._queue = queue;
        this._members = members;
    }
    enqueue(o, friend = false) {
        this._members[o] = !!(this._members[o]) ? ++(this._members[o]) : 1;
        if (friend && this._members[friend]) {
            let index = (this._queue.indexOf(friend))+1;
            this._queue.splice(index, 0, o);
            return index+1;
        }
        return this._queue.push(o);
    }
    dequeue() {
        let o = (this.length())?this._queue.shift():false;
        o && (this._members[o] = (this._members[o]==1) ? this._members[o]=false : --(this._members[o]));
        return o;
    }
    peek() {
        return (this.length())?this._queue[0]:false;
    }
    length() {
        return this._queue.length;
    }
    toString() {
        return JSON.stringify(this._queue);
    }
};
