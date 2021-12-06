const fs = require('fs');

const readFile = () => {
    return fs.readFileSync('input.txt', 'utf8').trim();
}

const part1 = (input) => calculateFish(input, 80);
const part2 = (input) => calculateFish(input, 256);

const calculateFish = (initialFish, days) => {
    let values = new Array(9)
    values.fill(0);
    initialFish
        .split(',')
        .forEach(element => values[element]++);
    for (let i = 1; i <= days; i++) {
        values = processDay(values);
    }
    const count = values.reduce((x,y) => x + y);
    console.log(`After ${days} days: ${count} fish`);
}

const processDay = (arr) =>{
    let numberToAdd = arr[0];
    for (let i = 0; i < 8; i++) {
        arr[i] = arr[i+1];
    }
    arr[6] += numberToAdd;
    arr[8] = numberToAdd;
    return arr;
}

part1(readFile());
part2(readFile());