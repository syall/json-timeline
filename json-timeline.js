#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const loadAdvents = require('./src/functions/loadAdvents');
const sortAdvents = require('./src/functions/sortAdvents');
const groupAdvents = require('./src/functions/groupAdvents');

try {
    if (process.argv.length !== 4) {
        throw new Error('Usage: json-timeline path/to/advents/ path/to/output/');
    }
    const [examples, output] = process.argv.slice(2);
    const { advents, tags } = loadAdvents(examples);
    const sortedAdvents = sortAdvents(advents);
    const groupedAdvents = groupAdvents(sortedAdvents);
    const adventsJs = (
        `export const advents = ${JSON.stringify(groupedAdvents, null, 2)};\n` +
        `export const tags = new Map(${JSON.stringify([...tags.entries()], null, 2)});\n`
    );
    const outputDirectory = makeOutputDirectory(output);
    copyViewFiles(outputDirectory);
    fs.writeFileSync(`${outputDirectory}/advents.js`, adventsJs);
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

function copyViewFiles(outputDirectory) {
    const viewsDirectory = path.resolve(__dirname, './src/views');
    for (const file of fs.readdirSync(viewsDirectory)) {
        fs.createReadStream(`${viewsDirectory}/${file}`)
            .pipe(fs.createWriteStream(`${outputDirectory}/${file}`));
    }
}

function makeOutputDirectory(outputPath) {
    const outputDirectory = path.resolve(outputPath);
    try {
        fs.lstatSync(outputDirectory).isDirectory();
    } catch (error) {
        fs.mkdirSync(outputDirectory);
    }
    return outputDirectory;
}
