const { count, Console } = require('console');
const fs = require('fs');


const readFile = () => {
    return fs.readFileSync('input.txt', 'utf8')
}

const part1 = (input) => {
    const lines = input.split('\n');
    let polymer = lines[0].trim();
    const rules = new Map();
    for (let i = 1; i < lines.length; i++) {
        let [pair, sub] = lines[i].split(' -> ');
        rules.set(pair, sub);
    }
    for (let i = 0; i < 10; i++) {
        let updatedPolymer = "";
        for (let i = 0; i < polymer.length -1; i++) {
            updatedPolymer = updatedPolymer.concat(polymer[i]);
            let pair = polymer[i] + polymer[i+1];
            if (rules.has(pair)) {
                updatedPolymer = updatedPolymer.concat(rules.get(pair));
            }
        }
        updatedPolymer = updatedPolymer.concat(polymer[polymer.length-1]);
        polymer = updatedPolymer;
    }

    const counts = new Map();
    for (let i = 0; i < polymer.length; i++) {
        let char = polymer[i];
        if (!counts.has(char)) {
            counts.set(char, 0);
        }
        counts.set(char, counts.get(char) + 1);
    }
    let min = Math.min(...counts.values())
    let max = Math.max(...counts.values());
    console.log(`Part 1: ${max - min}`);
}

const part2 = (input) => {
    const lines = input.split('\n')
    let polymer = lines[0].trim();
    const rules = new Map();
    for (let i = 1; i < lines.length; i++) {
        let [pair, sub] = lines[i].split(' -> ');
        rules.set(pair, sub);
    }

    let pairs = polymer.split('').reduce((p, c, i, arr) => {
        if (arr[i+1]) {
            const pair = arr[i] + arr[i+1];
            if (!p.has(pair)) {
                p.set(pair, 0);
            }
            p.set(pair, p.get(pair) + 1);
        }
        return p;
    }, new Map());

    for (let i = 0; i < 40; i++) {
        console.log(`Step ${i+1}`);
        const newPairs = new Map();
        pairs.forEach((value, key) => {
            console.log(key, value);
            if (rules.has(key)) {
                const p1 = key[0] + rules.get(key);
                const p2 = rules.get(key) + key[1];
                [p1, p2].forEach(v => {
                    if (!newPairs.has(v)) {
                        newPairs.set(v, 0);
                    }
                    newPairs.set(v, newPairs.get(v) + value);
                });
            }
            else {
                console.log('oh no!');
                newPairs.set(key, value);
            }
        });
        pairs = newPairs;
    }
    console.log(pairs);

    const letters = new Map();
    letters.set('S', 1);
    letters.set('C', 1);
    pairs.forEach((value, key) => {
        key.split('').forEach(letter => {
            if (!letters.has(letter)) {
                letters.set(letter, 0);
            }
            letters.set(letter, letters.get(letter) + value);
        })
    });

    let min = Math.min(...letters.values()) / 2;
    console.log(min)

    let max = Math.max(...letters.values()) / 2;
    console.log(max)

    console.log(`Part 1: ${max - min}`);
}

part1(readFile());
part2(readFile());