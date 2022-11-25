const fs = require('fs');
const Board = require('../common/board');

const readFile = () => {
    return fs.readFileSync('test.txt', 'utf8')
}

const constructPath = (pathObj, node) => {
    return {
        cost: pathObj.cost + board.get(nodeKey),
        path: [...pathObj.path, node]
    };
}

// pathObj = { cost: Number, path: [a,b,c,d] }
const lowestKnownPath = new Map();  // key -> pathObj
const nodesToCheck = new Set()      // key

const part1 = (input) => {
    const lines = input.split('\n');
    const x = lines[0].length;
    const y = lines.length;
    const board = new Board(x, y);
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            board.set(i,j, parseInt(lines[j][i]));
        }
    }

    const startKey = '0,0';
    const goalKey = '9,9';


    nodesToCheck.add(startKey);
    // minPath(start, goal, board);
    while(nodesToCheck.size > 0) {
        var key = nodesToCheck.values().next().value;
        nodesToCheck.delete(key);



    }
}

part1(readFile());

// const minPath = (start, goal, board) => {
//     const openSet = new Set()
//     openSet.add(start)
//     const visitedSet = new Set()
//     while(openSet.size > 0) {
//         var key = openSet.values().next().value;
//         openSet.delete(key);
//         visitedSet.add(key);
//         // if (key2path.has(key)) {
//         //     const value = key2path.get(key);
//         // }
//         const [x,y] = board.fromKey(key);
//         for (const [x1,y1] of board.adjacent4(x, y)) {
//             const newKey = board.toKey(x1, y1);
//             if (!visitedSet.has(newKey)) {
//                 openSet.add(board.toKey(x1, y1));
//             }
//         }
//     }
//     console.log(visitedSet.size);
// }
// const visit = (key) => {
//     if ()
// }
// const dist = (x1, y1, x2, y2) => {
//     return Math.abs(x2 - x1) + Math.abs(y2 - y1);
// }
// const part2 = (input) => {
// }