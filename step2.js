/**
 * Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.

Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.
 */

const fs = require('fs');
const axios = require('axios').default;

const argv = process.argv

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}`, err);
            process.kill(1);
        }
        console.log(data)
    })
}

function webCat(url) {
    axios.get(url)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(`Error fetching ${url}`, err);
        })
}

const path = argv[2]; // arguments come after the path to node, and path to the script, therefore use index 2 to retreive the path argument

if((path.slice(0, 7) === "http://") || (path.slice(0, 8) === "https://")) {
    webCat(path);
} else {
    cat(path);
}


