const fs = require('fs');

const readFile = () => {
    const data = fs.readFileSync('input.txt', 'utf8')
    return data.split('\n');
}

const part1 = (lines) => {
    let count = 0;
    for (let i = 1; i < lines.length; i++) {
        let current = Number(lines[i]);
        let previous = Number(lines[i-1]);
        if (current > previous) {
            count++;
        }
    }
    console.log('part1 result:', count);}

const part2 = (lines) => {
    let count = 0;
    for (let i = 3; i < lines.length; i++) {
        const front = Number(lines[i-0]);
        const tail = Number(lines[i-3]);
        if (front > tail) {
            count++;
        }
    }
    console.log('part2 result', count);
}

part1(readFile());
part2(readFile());