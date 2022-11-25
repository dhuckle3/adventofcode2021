const fs = require('fs');

const readFile = (name) => {
    return fs.readFileSync(name, 'utf8')
}

const usageAndExit = () => {
  console.log('usage: node test.js test|input');
  process.exit(1);
}

let inputFile
if (process.argv.length === 3) {
  let arg = process.argv[2]
  if (arg === 'test') {
    inputFile = 'test.txt';
  }
  else if (arg === 'input') {
    inputFile = 'input.txt';
  }
  else {
    usageAndExit();
  }
}
else {
  usageAndExit();
}

const adjacency = (lines) => {
    const map = new Map();
    for (const line of lines) {
        const [from, to] = line.split("-");
        if (!map.has(from)) {
            map.set(from, new Set());
        }
        if (!map.has(to)) {
            map.set(to, new Set());
        }
        map.set(from, map.get(from).add(to));
        map.set(to, map.get(to).add(from));
    }
    return map;
}

const findPaths = (adj) => {
    const paths = new Set();
    const pathsToUpdate = new Set();
    pathsToUpdate.add('start');

    while(pathsToUpdate.size > 0) {
        for (const path of pathsToUpdate) {
            const segments = path.split('-');
            pathsToUpdate.delete(path);

            const tail = segments[segments.length - 1];
            if (tail === 'end') {
                paths.add(segments.join('-'));
            }
            else {
                let newPaths = new Array();
                for (const node of adj.get(tail)) {
                    if (node === 'start') {
                        continue;
                    }
                    if (node === node.toLowerCase()) {
                        // it's a lower case node... we need to check if the node is present more than one time
                        const isValid = (segments, node) => {
                            let numberOfDoubles = 0;
                            const rooms = new Set();
                            segments
                                .filter(s => s === s.toLowerCase())
                                .forEach(k => {
                                    if (rooms.has(k)) {
                                        numberOfDoubles++;
                                    }
                                    else {
                                        rooms.add(k);
                                    }
                                });

                            return numberOfDoubles < 2;
                        }
                        const newPath = [...segments, node];
                        if (isValid(newPath)) {
                            newPaths.push(newPath);
                        }
                    }
                    else {
                        const newPath = [...segments, node];
                        newPaths.push(newPath);
                    }
                }
                newPaths.forEach(p => pathsToUpdate.add(p.join('-')));
            }
        }
    }
    return paths.size;
}

const part2 = (input) => {
    const lines = input.split('\n');
    const adj = adjacency(lines);
    const result = findPaths(adj);
    console.log(`Part 2: ${result}`);
}

part2(readFile(inputFile));
