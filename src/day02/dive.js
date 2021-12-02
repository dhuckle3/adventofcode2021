const fs = require('fs');

const readFile = () => {
    const data = fs.readFileSync('input.txt', 'utf8')
    return data.split('\n');
}

const part1 = (lines) => {
    let x = 0;
    let y = 0;

    for (let i = 0; i < lines.length; i++) {
        [cmd, arg] = lines[i].split(" ")
        arg = Number(arg);

        switch(cmd) {
            case "down":
                y += arg;
                break;
            case "up":
                y -= arg;
                break;
            case "forward":
                x += arg;
                break;
        }
    }
    console.log(x, y, x*y);
}

const part2 = (lines) => {
    let aim = 0; 
    let x = 0;
    let y = 0;

    for (let i = 0; i < lines.length; i++) {
        [cmd, arg] = lines[i].split(" ")
        arg = Number(arg);

        switch(cmd) {
            case "down":
                aim += arg;
                break;
            case "up":
                aim -= arg;
                break;
            case "forward":
                x += arg;
                y = y + (aim * arg);
                break;
        }
    }
    console.log(x,y,x*y);
}

part1(readFile());
part2(readFile());