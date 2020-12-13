#!/usr/bin/env node
/**
 * @file json-timeline
 * @module json-timeline
 * @description CLI for generating Timelines
 * @param {string} adventsPath Path to Advents Directory
 * @param {string} outputPath  Path to Output Directory
 * @param {string} flags       Flags: v = verbose, f = force
 */
const path = require('path');
const fs = require('fs');
const loadAdvents = require('./functions/loadAdvents');
const sortAdvents = require('./functions/sortAdvents');
const groupAdvents = require('./functions/groupAdvents');

/**
 * @constant
 * @type {Object}
 * @name FLAGS
 * @description Boolean flags for CLI Argument flags
 */
const FLAGS = {
    VERBOSE: false,
    FORCE: false
};

(function main() {
    try {
        const [adventsInput, outputInput] = handleArguments(process.argv.slice(2));
        vLog(`json-timeline initiated with options { verbose: ${FLAGS.VERBOSE}, force: ${FLAGS.FORCE} }`);
        const adventsPath = checkAdventsDirectory(adventsInput);
        const adventsContent = processAdvents(adventsPath);
        const outputPath = checkOutputDirectory(outputInput);
        writeViewFiles(outputPath);
        writeAdvents(`${outputPath}/advents.js`, adventsContent);
        vLog('json-timeline finished');
    } catch (error) {
        vLog(error.message, { level: 'ERROR', verbose: true });
        process.exit(1);
    }
})();

/**
 * @function
 * @name handleArguments
 * @description Handles CLI Arguments for Paths and Flags
 * @param {string[]} args [advents, output, flags] CLI arguments
 * @returns {string[]} Advents and Output Paths
 * @throws An Error if advents or output are undefined
 */
function handleArguments([advents, output, flags]) {
    if (advents === undefined || output === undefined) {
        throw new Error('Usage: json-timeline path/to/advents/ path/to/output/ [vf]');
    }
    FLAGS.VERBOSE = flags !== undefined && flags.includes('v');
    FLAGS.FORCE = flags !== undefined && flags.includes('f');
    return [path.resolve(advents), path.resolve(output)];
}

/**
 * @function
 * @name checkAdventsDirectory
 * @description Check if the Advents Input Path is an Existing Directory
 * @param {string} adventsPath Advents Input Path
 * @returns {string} Advents Path
 * @throws An Error if the Advents Input Path is not an Existing Directory
 */
function checkAdventsDirectory(adventsPath) {
    vLog(`Checking Advents Directory: "${adventsPath}"`);
    if (fs.existsSync(adventsPath)) {
        if (fs.lstatSync(adventsPath).isDirectory()) {
            vLog(`Advents Directory "${adventsPath}" already exists`);
        } else {
            throw new Error(`Advents Path "${adventsPath}" is not a directory`);
        }
    } else {
        throw new Error(`Advents Path "${adventsPath}" does not exist`);
    }
    return adventsPath;
}

/**
 * @function
 * @name processAdvents
 * @description Process and Return Advents from Advents Directory
 * @param {string} adventsPath Advents Path
 * @returns {string} advents.js File Contents
 * @throws An Error if failed to load Advents
 */
function processAdvents(adventsPath) {
    vLog(`Processing Advents from "${adventsPath}"`);
    const { advents, tags } = loadAdvents(adventsPath);
    const sortedAdvents = sortAdvents(advents);
    const groupedAdvents = groupAdvents(sortedAdvents);
    return (
        `export const advents=${str(groupedAdvents)};` +
        `export const tags=new Map(${str([...tags.entries()])});`
    );
}

/**
 * @function
 * @name str
 * @description Wrapper for consistent JSON.stringify
 * @param {*} input Input Argument
 * @returns {string} Stringified Input
 */
function str(input) {
    return JSON.stringify(input);
}

/**
 * @function
 * @name checkAdventsDirectory
 * @description Check and Make a Directory of the Output Input Path
 * @param {string} outputPath Output Input Path
 * @returns {string} Output Path
 * @throws An Error if the Output Input Path Exists but is not a Directory
 */
function checkOutputDirectory(outputPath) {
    vLog(`Checking Output Directory: "${outputPath}"`);
    if (fs.existsSync(outputPath)) {
        if (fs.lstatSync(outputPath).isDirectory()) {
            vLog(`Output Directory "${outputPath}" already exists`);
        } else {
            throw new Error(`Output Path "${outputPath}" is not a directory`);
        }
    } else {
        fs.mkdirSync(outputPath);
        vLog(`Created Output Directory "${outputPath}"`);
    }
    return outputPath;
}

/**
 * @function
 * @name writeViewFiles
 * @description Write files in view/ to Output Directory, overwriting if the
 * force flag is true
 * @param {string} outputPath Output Path
 * @throws An Error if an Output Destination File Path is not a file
 */
function writeViewFiles(outputPath) {
    vLog(`Writing View Files to "${outputPath}"`);
    const viewsDirectory = path.resolve(__dirname, '../views/');
    for (const file of fs.readdirSync(viewsDirectory)) {
        const sourcePath = `${viewsDirectory}/${file}`;
        const destPath = `${outputPath}/${file}`;
        if (fs.existsSync(destPath)) {
            if (fs.lstatSync(destPath).isFile()) {
                if (FLAGS.FORCE) {
                    copyFile(sourcePath, destPath);
                    vLog(`Overwritten file "${destPath}"`);
                } else {
                    vLog(`File "${destPath}" already exists`);
                }
            } else {
                throw new Error(`Output Path "${destPath}" is not a file`);
            }
        } else {
            copyFile(sourcePath, destPath);
            vLog(`Created file "${destPath}"`);
        }
    }
}

/**
 * @function
 * @name copyFile
 * @description Copies Source File to Destination File
 * @param {string} sourcePath Path to Source File
 * @param {string} destPath   Path to Destination File
 */
function copyFile(sourcePath, destPath) {
    fs.createReadStream(sourcePath).pipe(fs.createWriteStream(destPath));
}

/**
 * @function
 * @name writeAdvents
 * @description Write advents.js content to Destination File
 * @param {string} destPath Destination Path
 * @param {string} content  Content to write to Destination File
 * @throws An Error if the Destination Path is not a file
 */
function writeAdvents(destPath, content) {
    vLog(`Writing Advents to "${destPath}"`);
    if (fs.existsSync(destPath)) {
        if (fs.lstatSync(destPath).isFile()) {
            fs.writeFileSync(destPath, content);
            vLog(`Overwritten file "${destPath}"`);
        } else {
            throw new Error(`Output Path "${destPath}" is not a file`);
        }
    } else {
        fs.writeFileSync(destPath, content);
        vLog(`Created file "${destPath}"`);
    }
}

/**
 * @function
 * @name vLog
 * @description Log a message with Level based on Verbose
 * @param {string} message Message to Log
 * @param {Object} opts    Options for Level and Verbose
 */
function vLog(message, opts) {
    const options = {
        level: 'INFO',
        verbose: FLAGS.VERBOSE,
        ...opts
    };
    options.verbose && console.log(`[${options.level}]: ${message}`);
}
