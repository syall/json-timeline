const path = require('path');
const fs = require('fs');
const validateSchema = require('../schema/validateSchema');

function loadAdvents(input) {
    // Get Absolute Path
    const dirPath = path.resolve(input);
    // Check if Path is a Directory
    if (!fs.lstatSync(dirPath).isDirectory()) {
        throw new Error(`Path "${dirPath}" is not a directory`);
    }
    // Process JSON Files
    const { valid, invalid, tags } = fs.readdirSync(dirPath)
        // Filter *.advent.json Files
        .filter(name => (
            fs.lstatSync(`${dirPath}/${name}`).isFile() &&
            name.endsWith('.advent.json')
        ))
        // Load Advents
        .map(name => ({
            name,
            data: require(`${dirPath}/${name}`)
        }))
        // Group Valid and Invalid Advents
        .reduce((advents, { name, data }) => {
            const validatedData = validateSchema(data);
            if (validatedData !== false) {
                advents.valid.push(validatedData);
                for (const tag of validatedData.tags) {
                    if (!advents.tags.has(tag)) {
                        advents.tags.set(tag, true);
                    }
                }
            } else {
                advents.invalid.push(name);
            }
            return advents;
        }, { valid: [], invalid: [], tags: new Map() });
    // Log Invalid Advents
    if (invalid.length !== 0) {
        throw new Error(
            `Invalid Advents in "${input}"\n` +
            invalid.map(name => `- ${input}/${name}`).join('\n')
        );
    }
    // Return Valid Advents
    return { advents: valid, tags };
}

module.exports = loadAdvents;
