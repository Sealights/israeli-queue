'use strict';

const _ = require('lodash'),
    hash = require('object-hash');

function EmptyQueue(message) {
    this.name = "EmptyQueue";
    this.message = (message || "");
}
EmptyQueue.prototype = Error.prototype;

module.exports = class IQ {
    constructor( queue = [], members = {}) {
        this._queue = queue;
        this._members = members;
    }
    enqueue(o, friend = false) {
        if (o===undefined) throw new EmptyQueue();
        const oKey = (typeof o==='object')?hash(o):o,
            friendKey = (friend!=null)?(typeof friend==='object')?hash(friend):friend:null;
        this._members[oKey] = (this._members[oKey]) ? ++(this._members[oKey]) : 1;
        if (friend!=undefined && this._members[friendKey]) {
            let index = (typeof friend==='object')?false:(this._queue.indexOf(friend))+1;
            if (index) {
                this._queue.splice(index, 0, o);
                return ++index;
            }
            index = _.findIndex(this._queue, (member) => {
                return hash(member)==friendKey;
            });
            this._queue.splice(++index, 0, o);
            return ++index;
        }
        return this._queue.push(o);
    }
    dequeue() {
        const o = this._queue.shift(),
            oKey = o?(typeof o==='object')?hash(o):o:false;
        o && (this._members[oKey] = (this._members[oKey]==1) ? this._members[oKey]=false : --(this._members[oKey]));
        return o;
    }
    peek() {
        return this._queue[0];
    }
    length() {
        return this._queue.length;
    }
    toString() {
        return JSON.stringify(this._queue);
    }
};
