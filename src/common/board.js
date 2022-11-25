class Board {
    constructor(x, y, intialValue) {
        this.width = x;
        this.height = y;
        this.map = new Map();
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                this.map.set(this.toKey(i,j), intialValue);
            }
        }
    }

    toKey(x, y) {
        return `${x},${y}`;
    }

    fromKey(key) {
        const x = parseInt(key.split(',')[0]);
        const y = parseInt(key.split(',')[1]);
        return [x, y];
    }

    set(x, y, value) {
        if (!this.map.has(this.toKey(x, y))) {
            console.log(`WARNING: ${x},${y} is not a point on the board`);
        }
        this.map.set(this.toKey(x, y), value);
    }

    get(x, y) {
        return this.map.get(this.toKey(x, y));
    }

    squares() {
        return [...this.map.keys()].map(key => this.fromKey(key));
    }

    // Generator the yields the 4 adjacent squares next to this board, if they
    // exist
    *adjacent4(x, y) {
        if (this.map.has((this.toKey(x-1, y)))) {
            yield [x-1, y];
        }
        if (this.map.has((this.toKey(x+1, y)))) {
            yield [x+1, y];
        }
        if (this.map.has((this.toKey(x, y-1)))) {
            yield [x, y-1];
        }
        if (this.map.has((this.toKey(x, y+1)))) {
            yield [x, y+1];
        }
    }

    *adjacent8(x,y) {
        if (this.map.has((this.toKey(x-1, y-1)))) {
            yield [x-1, y-1];
        }
        if (this.map.has((this.toKey(x, y-1)))) {
            yield [x, y-1];
        }
        if (this.map.has((this.toKey(x+1, y-1)))) {
            yield [x+1, y-1];
        }
        if (this.map.has((this.toKey(x-1, y)))) {
            yield [x-1, y];
        }
        if (this.map.has((this.toKey(x+1, y)))) {
            yield [x+1, y];
        }
        if (this.map.has((this.toKey(x-1, y+1)))) {
            yield [x-1, y+1];
        }
        if (this.map.has((this.toKey(x, y+1)))) {
            yield [x, y+1];
        }
        if (this.map.has((this.toKey(x+1, y+1)))) {
            yield [x+1, y+1];
        }
    }
}

module.exports = Board;