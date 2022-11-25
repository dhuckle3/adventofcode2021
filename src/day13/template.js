const fs = require('fs');

const readFile = () => {
    const dots = new Set(); // example: '1,2'
    const folds = []; // [{fold: y, value: 7}]

    const lines = fs.readFileSync('input.txt', 'utf8').split('\n');
    lines.forEach(line => {
        if (line.startsWith('fold along')) {
            const [dir, value] = line.substring(11).split('=')
            folds.push({dir: dir, value: parseInt(value)});
        }
        else if (line.length > 1) {
            dots.add(line);
        }
    });

    return {dots: dots, folds: folds};
}

const handleFold = (fold, dots) => {
    const newDots = new Set();
    for (const dot of dots) {
        let [x, y] = dot.split(',')
        x = parseInt(x);
        y = parseInt(y);

        if (fold.dir === 'y') {
            if (y > fold.value) {
                y = fold.value - (y-fold.value)
            }
        }
        else {
            if (x > fold.value) {
                x = fold.value - (x-fold.value);
            }
        }

        newDots.add([x, y].join(','));
    }
    return newDots;
}


const display = (dots) => {
    const lines = [];
    for (let y = 0; y < 6; y++){
        lines.push('.......................................');
    }


    for (const dot of dots) {
        let [x, y] = dot.split(',')
        x = parseInt(x);
        y = parseInt(y);
        lines[y] = lines[y].substring(0,x) + '#' + lines[y].substring(x+1);
    }

    for(const line of lines) {
        console.log(line);
    }
}


const part1 = ({dots, folds}) => {
    console.log("Part 1");
    console.log(handleFold(folds[0], dots).size + '\n');
}

const part2 = ({dots, folds}) => {
    console.log("Part 2");
    let newDots = dots;
    for (const fold of folds) {
        newDots = handleFold(fold, newDots);
    }
    display(newDots);
}

part1(readFile());
part2(readFile());