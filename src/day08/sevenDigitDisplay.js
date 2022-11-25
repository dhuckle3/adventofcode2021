const fs = require('fs');

const readFile = () => {
    return fs.readFileSync('input.txt', 'utf8')
}

const part1 = (input) => {
    let result = input
        .split("\n")
        .map(line => line.split('|')[1].trim())
        .map(x => x.split(' '))
        .flat()
        .map(s => {
            if (s.length == 2 || s.length == 3 || s.length == 4 || s.length == 7) {
                return 1;
            }
            return 0;
        })
        .reduce((p, c) => p + c, 0);
    console.log(result);
}

/**
 *  aaaa
 * b    c
 * b    c
 *  dddd
 * e    f
 * e    f
 *  gggg
 *
 * Unique Numbers
 * 1 - cf
 * 7 - acf
 * 4 - bcdf
 * 8 - abcdefg
 *
 * Numbers to determine
 *
 * // If we know c/d/e we can figure this out
 * 6 - ab defg
 * 0 - abc efg
 * 9 - abcd fg
 *
 * // if we know bottom right and bottom left we can figure out 2/3/5
 * 2 - a cde g
 * 3 - a cd fg
 * 5 - ab d fg
 *
 * @returns
 */
const part2 = (input) => {
    const guessLetter = (arr) => {
        const cipher = new Array(7);
        const inputItems = [...arr];

        // ciper[0] is the replacement for A, cipher[1] is the replacement for b...
        // or put differently cipher[0] is top, cipher[1] is top left...
        while(cipher.filter(i => i == undefined).length > 0) {
            const x = inputItems.pop();
            if (x.length == 2) {
                // 2 length means it's CF (1)
                cipher[2] = x[0];
                cipher[5] = x[1];
            }
            if(x.length == 3) {
                // 3 length means it's ACF (7)
                cipher[0] = x[0];
                cipher[2] = x[1];
                cipher[5] = x[2];
            }
            if (x.length == 4) {
                // 4 length means it's bcdf (4)
                cipher[1] = x[0];
                cipher[2] = x[1];
                cipher[3] = x[2];
                cipher[5] = x[3];
            }
            if (x.length == 6) {
                // * 6 - abdefg
                // * 0 - abcefg
                // * 9 - abcdfg
                if (cipher[3]) {
                    if(x[2] == cipher[3]) {
                        // it's the number 6
                        cipher[0] = x[0]
                        cipher[0] = x[1]
                        cipher[0] = x[3]
                        cipher[0] = x[4]
                        cipher[0] = x[5]
                        cipher[0] = x[6]
                    }
                    if (x[3] == cipher[3]) {
                        // it's the number 9
                        cipher[0] = x[0]
                        cipher[0] = x[1]
                        cipher[0] = x[2]
                        cipher[0] = x[3]
                        cipher[0] = x[5]
                        cipher[0] = x[6]
                    }
                }
                if (cipher[4]) {
                    // we know what 'e' is...
                    // if it's not six
                }
                // if (cipher[2] && cipher[3] && cipher[4]) {
                //     if (x[3] ==
                // }
            }

            if (x.length == 7) {
                // 7 length means it's abcdefg (8)
                cipher[0] = x[0];
                cipher[1] = x[1];
                cipher[2] = x[2];
                cipher[3] = x[3];
                cipher[4] = x[4];
                cipher[5] = x[5];
                cipher[6] = x[6];
            }
            inputItems.unshift(x);
        }

        console.log(cipher);
        console.log(cipher[0])
        console.log(arr);
        arr
    };
    guessLetter(['cefdb', 'cefbgd', 'gcbe', 'a'])
}

part1(readFile());
part2(readFile());