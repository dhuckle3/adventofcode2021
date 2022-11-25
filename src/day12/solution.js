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

const hasDuplicate = (segments) => {
    const nodes = new Set();
    for (const node of segments) {
        if (nodes.has(node)) {
            return false;
        }
        nodes.add(node);
    }
    return true;
}

const isValidPart2 = (segments, node) => {
    if (node === 'start') {
        return false;
    }
    // hasDuplicate[...segments, node]

    ts.reduce((p, c) => {
        if (c === node) {
            return p + 1;
        }
        return p;
    }, 0);

    if (count < max) {
        return true;
    }
    return false;
}
const isValidNode = (segments, node, max)  => {
    if (node === 'start') {
        return false;
    }
    const count = segments.reduce((p, c) => {
        if (c === node) {
            return p + 1;
        }
        return p;
    }, 0);

    if (count < max) {
        return true;
    }
    return false;
}

const findPaths = (adj, max) => {
    const paths = new Set();
    const pathsToUpdate = new Set();
    pathsToUpdate.add('start');

    while(pathsToUpdate.size > 0) {

        for (const path of pathsToUpdate) {
            const segments = path.split('-');
            pathsToUpdate.delete(path);

            const tail = segments[segments.length - 1];
            if (tail === 'end') {
                //console.log(paths.size);
                paths.add(segments.join('-'));
            }
            else {
                let newPaths = new Array();
                for (const node of adj.get(tail)) {
                    if (node === node.toLowerCase()) {
                        if(isValidNode(segments, node, max)) {
                            const newPath = [...segments, node];
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

const part1 = (input) => {
    const lines = input.split('\n');
    const adj = adjacency(lines);
    console.log(adj);
    console.log(`Part 1: ${findPaths(adj, 1)}`);
}

const part2 = (input) => {
    const lines = input.split('\n');
    const adj = adjacency(lines);
    console.log(`Part 2: ${findPaths(adj, 2)}`);
}

part1(readFile(inputFile));
part2(readFile(inputFile));
