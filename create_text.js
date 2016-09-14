/**
 * Takes a list of comment objects and generates one big text file.
 * This file can be used as an input for torch-rnn.
 */

const fs = require('fs');

const INPUT_PATH = './comments.json';
const OUTPUT_PATH = './comments.txt';

const comments = shuffle(JSON.parse(fs.readFileSync(INPUT_PATH)));

function createText(comments) {
    for (let i = 0; i < comments.length; i++) {
        if(1 % 1000 == 0) console.log(i);
        const comment = comments[i];
        const text_comment = `#${comment.a}#\n${comment.c}\n`;
        fs.appendFileSync(OUTPUT_PATH, rendered_comment);
    }
}

function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}