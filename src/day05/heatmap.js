class HeatMap {
    constructor() {
        this.map = new Map();
        this.biggestKey = null;
    }

    addLine(x1, y1, x2, y2) {
        let xIncrement = x2 > x1 ? 1 : -1;
        let yIncrement = y2 > y1 ? 1 : -1;

        let x = x1;
        let y = y1;
        while(true) {
            this.markPoint(x, y);
            if (x == x2 && y == y2) {
                break;
            }
            if (x != x2) {
                x += xIncrement;
            }
            if (y != y2) {
                y += yIncrement;
            }

        }
    }

    markPoint(x, y) {
        const key = `${x},${y}`;
        if (!this.map.has(key)) {
            this.map.set(key, 0);
        }
        this.map.set(key, this.map.get(key) + 1);
        if (this.biggestKey == null) {
            this.biggestKey = key;
        }
        if (this.map.get(key) > this.map.get(this.biggestKey)) {
            this.biggestKey = key;
        }
    }

    countPointsWithHeatAtLeast(value) {
        let count = 0;
        for (let [k, v] of this.map) {
            if (v >= value) {
                count++
            }
        }
        return count;
    }
}

module.exports = HeatMap;