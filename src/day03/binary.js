const fs = require('fs');

const readFile = () => {
    const data = fs.readFileSync('input.txt', 'utf8')
    return data.split('\n');
}

const mostCommon = (report)=> {
    let values = new Array(report[0].length).fill(0);
    for (let line of report) {
        for (let i = 0; i < values.length; i++) {
            if (line[i] == 1) {
                values[i]++;
            }
        }
    }
    let midpoint = report.length / 2
    return values.map(x => x >= midpoint ? 1 : 0);
}

const part1 = (lines) => {
    let values = mostCommon(lines);
    let gamma = parseInt(values.join(''), 2);
    let epsilon = parseInt(values.map(x => 1 - x).join(''), 2);
    console.log(`Part 1: gamma: ${gamma}, epsilon: ${epsilon}, power consumption: ${gamma*epsilon}`);
}

const part2 = (report) => {
    let values = new Array(report[0].length).fill(0);
    let temp = [...report];
    
    // Oxygen generator rating
    for (let i = 0; i < values.length; i++) {
        values = mostCommon(temp);
        temp = temp.filter(x => x[i] == values[i]);
        if (temp.length == 1) {
            break;
        }
        
    }
    let oxygen = temp;
    console.log(`oxygen generator rating:\t${temp}`);

    // CO2 scrubber rating
    temp = [...report];
    for (let i = 0; i < values.length; i++) {
        values = mostCommon(temp).map(x => 1 - x);
        temp = temp.filter(x => x[i] == values[i]);
        if (temp.length == 1) {
            break;
        }
        
    }
    let co2 = temp;
    oxygen = parseInt(oxygen.join(''), 2);
    co2 = parseInt(co2.join(''), 2);
    console.log(`CO2 scrubber rating:\t\t${temp}`);
    console.log(`Part 2: ${oxygen * co2}`)

}

part1(readFile());
part2(readFile());