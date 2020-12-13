/**
 * @module loadAdvents
 */
const fs = require('fs');
const validateSchema = require('../schema/validateSchema');

/**
 * @function
 * @name loadAdvents
 * @description Load and Validate Advents from Directory
 * @param {string} dirPath Path to Advents Directory
 * @returns {Object[]} Array of Valid Advents
 * @throws An Error if Invalid Advents exist, printing the File Names
 */
function loadAdvents(dirPath) {
    // Process JSON Files
    const { valid, invalid, tags } = fs.readdirSync(dirPath)
        // Filter *.advent.js(on)? Files
        .filter(name => (
            fs.lstatSync(`${dirPath}/${name}`).isFile() &&
            (name.endsWith('.advent.js') || name.endsWith('.advent.json'))
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
            `Invalid Advents in "${dirPath}"\n` +
            invalid.map(name => `[ERROR]: - ${dirPath}/${name}`).join('\n')
        );
    }
    // Return Valid Advents
    return { advents: valid, tags };
}

module.exports = loadAdvents;
