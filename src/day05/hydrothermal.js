const fs = require('fs');
const HeatMap = require('./heatmap');

const readFile = () => {
    const data = fs.readFileSync('input.txt', 'utf8')
    return data.split('\n');
}

const part1 = (lines) => {
    const map = new HeatMap()
    lines.forEach(line => {
        let [part1, part2] = line.split(" -> ");
        let [x1, y1] = part1.split(',')
        let [x2, y2] = part2.split(',')
        if (x1 == x2 || y1 == y2) {
            map.addLine(Number(x1), Number(y1), Number(x2), Number(y2));
        }
    });
    console.log(`Part 1: ${map.countPointsWithHeatAtLeast(2)}`);
}

const part2 = (lines) => {
    const map = new HeatMap();
    lines.forEach(line => {
        let [part1, part2] = line.split(" -> ");
        let [x1, y1] = part1.split(',');
        let [x2, y2] = part2.split(',');
        map.addLine(Number(x1), Number(y1), Number(x2), Number(y2));
    });
    console.log(`Part 2: ${map.countPointsWithHeatAtLeast(2)}`);
}

part1(readFile());
part2(readFile());