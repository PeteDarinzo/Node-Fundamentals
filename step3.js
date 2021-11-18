/**
* Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console. The argument should look like this: --out output-filename.txt readfile-or-url.
 */

const fs = require('fs');
const axios = require('axios').default;

const argv = process.argv


// helper function to write to a file
function writeToPath(file, data) {
    fs.writeFile(file, data, { encoding: 'utf8', flag: 'w' }, err => {
        if (err) {
            console.log(`Error writing to path ${file}`, err);
            process.kill(1)
        }
    })
}


// print a file's contents
function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}`, err);
            process.kill(1);
        }
        console.log(data)
    })
}


// print the content of a web page
async function webCat(url) {
    try {
        const res = await axios.get(url)
        console.log(res.data);
    } catch (err) {
        console.log(`Error fetching ${url}`, err);
        process.kill(1);
    }
}


// copy one file to another file
function catWrite(newPath, oldPath) {
    fs.readFile(oldPath, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${oldPath}`, err);
            process.kill(1);
        }
        writeToPath(newPath, data);
    })
}


// copy a web page to a file
async function webCatWrite(newPath, url) {
    try {
        const res = await axios.get(url);
        writeToPath(newPath, res.data);
    } catch (err) {
        console.log(`Error fetching ${url}`, err);
        process.kill(1);
    }
}


// get the basic args from the command line
// arguments come after the path to node, and the path to the script, therefore start at index 2 to retreive the first argument
const firstArg = argv[2]
const toPath = argv[3];
const fromPath = argv[4];


if (firstArg === "--out") {
    if ((fromPath.slice(0, 7) === "http://") || (fromPath.slice(0, 8) === "https://")) {
        webCatWrite(toPath, fromPath)
    } else {
        catWrite(toPath, fromPath)
    }
} else if ((firstArg.slice(0, 7) === "http://") || (firstArg.slice(0, 8) === "https://")) {
    webCat(firstArg);
} else {
    for (let i = 2; i < argv.length; i++)
        cat(argv[i]);
}


