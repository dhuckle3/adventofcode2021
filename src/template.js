const fs = require('fs');

const readFile = () => {
    const data = fs.readFileSync('input.txt', 'utf8')
    return data.split('\n');
}

const part1 = (lines) => {
}

const part2 = (lines) => {
}

part1(readFile());
part2(readFile());