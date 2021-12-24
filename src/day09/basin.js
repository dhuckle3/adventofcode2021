const fs = require('fs');


const readFile = () => {
    const input = fs.readFileSync('./input.txt', 'utf8');
    const map = new Map();
    input.split('\n').forEach((line, y) => {
        line.trim().split('').forEach((depth, x) => {
            const key = toKey(x,y);
            map.set(key, parseInt(depth));
        });
    });
    return map;
}

const part1 = (map) => {
    const lowestKeys = findLowestKeys(map);
    console.log(`Part 1: ${calculateRisk(lowestKeys, map)}`);
}

const part2 = (map) => {
    const lowestKeys = findLowestKeys(map);
    let basinSizes = Array();
    lowestKeys.forEach((key) => {
        basin = findBasin(map, key);
        basinSizes.push(parseInt(basin.size));
    });
    const result = basinSizes.sort((a,b) => b - a).slice(0,3).reduce((p,c) => p * c);
    console.log(`Part 2: ${result}`)

}

const toKey = (x, y) => {
    return `${x},${y}`;
}

const fromKey = (key) => {
    const x = parseInt(key.split(',')[0]);
    const y = parseInt(key.split(',')[1]);
    return [x,y];
}

const findLowestKeys = (map) => {
    const lowestKeys = new Set();
    for (const key of map.keys()) {
        const [x,y] = fromKey(key);
        if (map.has(toKey(x-1,y)) && map.get(toKey(x-1,y)) <= map.get(key)) {
            continue;
        }
        if (map.has(toKey(x+1,y)) && map.get(toKey(x+1,y)) <= map.get(key)) {
            continue;
        }
        if (map.has(toKey(x,y-1)) && map.get(toKey(x,y-1)) <= map.get(key)) {
            continue;
        }
        if (map.has(toKey(x,y+1)) && map.get(toKey(x,y+1)) <= map.get(key)) {
            continue;
        }
        lowestKeys.add(key);
    }
    return lowestKeys;
}

const calculateRisk = (keys, map) => {
    return [...keys].reduce((previous, current) => {
        return previous + map.get(current);
    }, keys.size);
}

const findBasin = (map, key) => {
    // take the low point and find all points
    const checkedKeys = new Set();
    const keysToCheck = new Array();

    const basin = new Set();
    basin.add(key);

    const addAdjacentKeysToCheck = (key, arr) => {
        const [x, y] = fromKey(key);
        [
            toKey(x-1, y),
            toKey(x+1, y),
            toKey(x, y-1),
            toKey(x, y+1)
        ].forEach(key => {
            if(!checkedKeys.has(key)) {
                arr.push(key);
            }
        });
    }

    addAdjacentKeysToCheck(key, keysToCheck);

    while(keysToCheck.length > 0) {
        const key = keysToCheck.pop();
        if (map.get(key) == 9 || map.get(key) == undefined) {
            // boundary found
        } else {
            addAdjacentKeysToCheck(key, keysToCheck);
            basin.add(key);
        }
        checkedKeys.add(key);
    }
    return basin;
}


part1(readFile());
part2(readFile());