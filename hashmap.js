const LinkedList = require('../DSA-linked-lists/linked-list.js')

class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0
        this._hashTable = []
        this._capacity = initialCapacity
        this._deleted = 0
    }

    //djb2 algorithm
    static _hashString(string) {
        let hash = 5381
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i)
            hash = hash & hash
        }
        return hash >>> 0
    }

    get(key) {
        const index = this._findSlot(key)
        if (this._hashTable[index] === undefined) {
            return false
        }
        return this._hashTable[index].value
    }

    set(key, value) {
        //take care of sizing
        const loadRatio = (this.length + this._deleted + 1) / this._capacity
        if (loadRatio > this.MAX_LOAD_RATIO) {
            this._resize(this._capacity * this.SIZE_RATIO)
        }
        //find the slot where this key should be in
        const index = this._findSlot(key)

        //if the index doesn't exist, increment length and insert the key/value pair at the new index
        if (!this._hashTable[index]) {
            this.length++
            this._hashTable[index] = {
                key,
                value,
                DELETED: false
            }
        } else if (this._hashTable[index]) {
            const tempValue = this._hashTable[index]
            const item = {
                key,
                value,
                DELETED: false
            }
            this._hashTable[index] = new LinkedList()
            this._hashTable[index].insertFirst(tempValue)
            this._hashTable[index].insertLast(item)
        }

    }

    _findSlot(key) {
        const hash = HashMap._hashString(key)
        const start = hash % this._capacity

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity
            const slot = this._hashTable[index]
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index
            } 
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable
        this._capacity = size
        this._deleted = 0
        this.length = 0
        this._hashTable = []
        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value)
            }
        }
    }
    
    delete(key) {
        const index = this._findSlot(key)
        const slot = this._hashTable[index]
        if (slot === undefined) {
            throw new Error('Key error')
        }
        slot.DELETED = true
        this.length--
        this._deleted++
    }
}

module.exports = HashMap