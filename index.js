'use strict';

const _ = require('lodash'),
    hash = require('object-hash');

module.exports = class IQ {
    constructor( queue = [], members = {}) {
        this._queue = queue;
        this._members = members;
    }
    enqueue(o, friend = false) {
        if (!o) return false;
        const oKey = (typeof o==='object')?hash(o):o,
            friendKey = friend?(typeof friend==='object')?hash(friend):friend:false;
        this._members[oKey] = (this._members[oKey]) ? ++(this._members[oKey]) : 1;
        if (friend && this._members[friendKey]) {
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
        const o = (this.length())?this._queue.shift():false,
            oKey = o?(typeof o==='object')?hash(o):o:false;
        o && (this._members[oKey] = (this._members[oKey]==1) ? this._members[oKey]=false : --(this._members[oKey]));
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
