const HashMap = require('./hashmap')

function main() {
    const lotr = new HashMap
    lotr.MAX_LOAD_RATIO = 0.5
    lotr.SIZE_RATIO = 3
    
    lotr.set("Hobbit", "Bilbo")
    lotr.set("Hobbit", "Frodo")
    lotr.set("Wizard", "Gandalf")
    lotr.set("Human", "Aragon")
    lotr.set("Elf", "Legolas")
    lotr.set("Maiar", "The Necromancer")
    lotr.set("Maiar", "Sauron")
    lotr.set("RingBearer", "Gollum")
    lotr.set("LadyOfLight", "Galadriel")
    lotr.set("HalfElven", "Arwen")
    lotr.set("Ent", "Treebeard")
    console.log(lotr)
}

//main()

//the second-added hobbit and maiar keys were the only ones that were added
//the length is 9 despite having a capacity of 8

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}
//this will return 20 and 10 due to the overwriting aspect highlighted above

//3.1
//insert keys [10, 22, 31, 4, 15, 28, 17, 88, 59] with function k % m where k is the key and m is 11
//result: [22, 88, , 59, 4, 15, 28, 17, , 31, 10]

//3.2
//same as above but with length m = 9 and keys = [5, 28, 19, 15, 20, 33, 12, 17, 10]
//result: [19, 28, 20, 12, 10, 5, 15, 6, 17]

function removeDupes(str) {
    const map = new HashMap()
    map.SIZE_RATIO = 3
    map.MAX_LOAD_RATIO = 0.5
    let result = ''
    for (let i = 0; i < str.length; i++) {
        if (!map.get(str[i])) {
            map.set(str[i], 1)
            result += str[i]
        }
    }
    return result
}

function isPal(str) {
    const map = new HashMap()
    map.SIZE_RATIO = 3
    map.MAX_LOAD_RATIO = 0.5
    for (let i = 0; i < str.length; i++) {
        let v = map.get(str[i])
        if (!v) {
            map.set(str[i], 1)
        } else {
            map.set(str[i], v + 1)
        }
    }

    switch(str.length % 2) {
        case 0: //even

            break
        case 1: //odd

            break
    }
    return map

}

console.log(isPal('racecar'))