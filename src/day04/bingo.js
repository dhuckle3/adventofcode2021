const fs = require('fs');

class BingoBoard {
    constructor(lines) {
        this.board = new Map();
        for (let y = 0; y < 5; y++) {
            let line = lines[y].trim().split(/\s+/);
            for (let x = 0; x < 5; x++) {
                this.board.set(`${x},${y}`, {number: line[x], marked: false});
            }
        }
    }

    place(number) {
        let keyToCheck = null;
        const iterator = this.board[Symbol.iterator]();
        for (const item of iterator) {
            const [key, value] = item;
            if (value.number === number) {
                value.marked = true;
                keyToCheck = key;
                break;
            }
        }
        if (keyToCheck != null) {
            let [x, y] = keyToCheck.split(",").map(x => Number(x));
            if(this.checkColumn(x) || this.checkRow(y)) {
                return true;
            }
        }
        return false;
    }

    checkColumn(x) {
        let bingo = true;
        for (let y = 0; y < 5; y++) {
            if (!this.board.get(`${x},${y}`).marked) {
                bingo = false;
            }
        }
        return bingo;
    }

    checkRow(y) {
        let bingo = true;
        for (let x = 0; x < 5; x++) {
            if (!this.board.get(`${x},${y}`).marked) {
                bingo = false;
            }
        }
        return bingo;
    }

    countUnmarkedNumbers() {
        let count = 0;
        const iterator = this.board[Symbol.iterator]();
        for (const item of iterator) {
            let [, value] = item;
            if (!value.marked) {
                count += Number(value.number);
            }
        }
        return count;
    }
}

const readFile = () => {
    data = fs.readFileSync('input.txt', 'utf8')
    return data.split('\n');
}

const part1 = (lines) => {
    let numbers = lines[0].split(',');
    let boardInput = new Array();
    let boards = new Array();
    for (let i = 2; i < lines.length; i++) {
        if (lines[i].trim() == "") {
            boards.push(new BingoBoard(boardInput));
            boardInput = new Array();
        }
        else {
            boardInput.push(lines[i]);
        }
    }

    for (let number of numbers) {
        for (let board of boards) {
            if (board.place(number)) {
                console.log(number * board.countUnmarkedNumbers());
                return;
            }
        }
    }
}

const part2 = (lines) => {
    let numbers = lines[0].split(',');
    let boardInput = new Array();
    let boards = new Set();
    for (let i = 2; i < lines.length; i++) {
        if (lines[i].trim() == "") {
            boards.add(new BingoBoard(boardInput));
            boardInput = new Array();
        }
        else {
            boardInput.push(lines[i]);
        }
    }


    for (let number of numbers) {
        for (const board of boards) {
            if (board.place(number)) {
                if (boards.size == 1) {
                    console.log(number * board.countUnmarkedNumbers());
                    return;
                }
                else {
                    boards.delete(board);
                }
            }
        }
    }
}

part1(readFile());
part2(readFile());