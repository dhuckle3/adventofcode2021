const fs = require('fs');
const Board = require('../common/board');

const readFile = () => {
    const input = fs.readFileSync('./input.txt', 'utf8');
    const board = new Board(10, 10);
    board.flashes = 0;
    input.split('\n').forEach((line, y) => {
        line.split("").forEach((char, x) => {
            board.set(x, y, parseInt(char));
        });
    });
    return board;
}

function part1(board) {
    for (let i = 0; i < 100; i++) {
        step(board);
    }

    display(board);
    console.log('');
    console.log(`Part 1: ${board.flashes}`);
}

const part2 = (board) => {
    let steps = 0;
    while (board.flashes != (board.width * board.height)) {
        board.flashes = 0;
        step(board);
        steps++;
    }
    console.log(`Part 2: ${steps}`);
}

const step = (board) => {
    for (let x = 0; x < board.width; x++) {
        for (let y = 0; y < board.height; y++) {
            increment(board, x, y);
        }
    }
    for (let x = 0; x < board.width; x++) {
        for (let y = 0; y < board.height; y++) {
            if (board.get(x, y) > 9) {
                board.set(x, y, 0);
                board.flashes++;
            }
        }
    }
}

const increment = (board, x, y) => {
    const value = board.get(x, y) + 1;
    board.set(x, y, value);

    if (value > 10) {
        // already flashed
    }
    if (value == 10) {
        // flash!
        for (const [i, j] of board.adjacent8(x, y)) {
            increment(board, i, j);
        }
    }
}

const display = (board) => {
    for (let y = 0; y < board.height; y++) {
        let str = "";
        for (let x = 0; x < board.width; x++) {
            str = str.concat(board.get(x, y))
        }
        console.log(str);
    }
}

part1(readFile());
part2(readFile());