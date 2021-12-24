const fs = require('fs');

const readFile = () => {
    return fs.readFileSync('input.txt', 'utf8')
}

const part1 = (input) => {
    const lines = input.split('\n');
    let count = 0;
    for (let line of lines) {
        const trimmed = removeCompleteGroups(line);
        count += getCorruptedValue(trimmed);
    }
    console.log(`Part 1: ${count}`);
}

const getCorruptedValue = (line) => {
    let value = 0;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === ')') {
            value = 3;
            break;
        }
        if (char === ']') {
            value = 57;
            break;
        }
        if (char === '}') {
            value = 1197;
            break;
        }
        if (char === '>') {
            value = 25137;
            break;
        }
    }
    return value;
}

const removeCompleteGroups = (line) => {
    while (true) {
        let l1 = line.length;
        line = line.replace('()','');
        line = line.replace('[]','');
        line = line.replace('{}','');
        line = line.replace('<>','');
        let l2 = line.length;
        if (l1 === l2) {
            break;
        }
    }
    return line;
}

const part2 = (input) => {
    const lines = input.split('\n');

    let scores = new Array();
    for (let line of lines) {
        const trimmed = removeCompleteGroups(line);
        if (getCorruptedValue(trimmed) === 0) {
            // incomplete
            let tempLine = trimmed.split("").reverse().join("")
            const score = calcScore(tempLine)
            scores.push(score);
        }
    }
    const median = Math.floor(scores.length / 2);
    scores.sort((a, b) => { return a - b })
    console.log(`Part 2: ${scores[median]}`);
}

const calcScore = (line) => {
    const score = line.split("").reduce((p, c) => {
        let value = 0;
        switch(c) {
            case '(':
                value = 1;
                break;
            case '[':
                value = 2;
                break;
            case '{':
                value = 3;
                break;
            case '<':
                value = 4;
                break;
        }
        return (p * 5) + value;
    }, 0)
    return score;
}

part1(readFile());
part2(readFile());