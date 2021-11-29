const got = require("got");
const debug = require("debug");
const { createWriteStream } = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");

const log = debug("extension-flat:download");

class Download {
    /**
     * @public
     * @param {string} extensionHash
     * @param {string} outFilePath
     */
    constructor(extensionHash, outFilePath) {
        this.extensionHash = extensionHash;
        this.outFilePath = outFilePath;
    }

    /**
     * @public
     * @returns Promise<void>
     */
    execute() {
        return this.download();
    }

    /**
     * @private
     * @returns Promise<void>
     */
    download() {
        log("ready download");

        const downloadStream = got.stream(this.URL);
        const fileWriteStream = createWriteStream(this.outFilePath);

        return promisify(pipeline)(downloadStream, fileWriteStream)
            .then(() => {
                log("download complate");
            })
            .catch(error => {
                throw new Error(`download failed! message: ${error.message}`);
            });
    }

    /**
     * @private
     * @returns string
     */
    get URL() {
        return `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${this.extensionHash}%26uc&prodversion=32`;
    }
}

module.exports.Download = Download;