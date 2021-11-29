const unzip = require("unzip-crx-3");
const debug = require("debug");

const log = debug("extension-flat:unzip");

class Unzip {
    /** */
    /**
     * @public
     * @param {string} crxFilePath
     * @param {string} outputFolder
     */
    constructor(crxFilePath, outputFolder) {
        this.crxFilePath = crxFilePath;
        this.outputFolder = outputFolder;
    }

    /**
     * @public
     * @returns Promise<void>
     */
    execute() {
        return this.unzip();
    }

    /**
     * @private
     * @returns Promise<void>
     */
    unzip() {
        log("ready unzip");

        return unzip(this.crxFilePath, this.outputFolder)
            .then(() => {
                log("unzip complate");
            })
            .catch(error => {
                throw new Error(`unzip crx file failed! message: ${error.message}`);
            });
    }
}

module.exports.Unzip = Unzip;