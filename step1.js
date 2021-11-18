/**
 * In step1.js, write a function, cat.

It should take one argument, path, and it should read the file with that path, and print the contents of that file.

Then, write some code that calls that function, allowing you to specify the path argument via the command line. For example:
 */

const fs = require('fs');

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

const file = argv[2]; // arguments come after the path to node, and path to the script, therefore use index 2 to retreive the path argument

cat(file);