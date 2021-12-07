
const fs = require('fs');

const readFile = () => {
    return fs.readFileSync('input.txt', 'utf8').split(',').map(x => parseInt(x)).sort();
}

const checkFuel = (crabs, fuelFunction) => {
    let min = crabs[0];
    let max = crabs[crabs.length - 1];
    let minFuel = Infinity;
    let position = -1;
    for (let i = min; i < max; i++) {
        let fuel = crabs.reduce((p,c) => {
            return p + fuelFunction(c, i);
        }, 0);
        if (fuel < minFuel) {
            minFuel = fuel;
            position = i;
        }
    }
    return [position, minFuel];
}

const constantFuel = (from, to) => {
    return Math.abs(from - to);
};

const increasingFuel = (from, to) => {
    let distance = Math.abs(from - to);
    return (distance * (distance+1)) / 2;
}

const part1 = (crabs) => {
    const [position, fuel] = checkFuel(crabs, constantFuel);
    console.log(`Part 1: position ${position} takes ${fuel} fuel`);
}

const part2 = (crabs) => {
    const [position, fuel] = checkFuel(crabs, increasingFuel);
    console.log(`Part 2: position ${position} takes ${fuel} fuel`);
}

part1(readFile());
part2(readFile());