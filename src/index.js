const { Download } = require("./Download");
const { Unzip } = require("./Unzip");
const path = require("path");
const os = require("os");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");

/**
 * 
 * @param {object} config
 * @param {string} config.extensionHash - extension id (e.g. fmkadmapgofadopljbjfkapdkoienihi)
 * @param {string} config.outputFolder - output folder
 * @param {boolean} [config.deleteCRX] - delete crx file after unzip complate
 * @param {string} [config.crxFolder] - crx folder
 * @param {string} config.folderName - folder name
 */
const extensionFlat = async (config) => {
    const crxFileFolder = config.crxFolder || os.tmpdir();
    const crxFilePath = path.join(crxFileFolder, `${config.extensionHash}.crx`);
    const outputFolderPath = path.join(config.outputFolder, String(config.folderName));

    mkdirp.sync(crxFileFolder);
    mkdirp.sync(outputFolderPath);

    const download = new Download(config.extensionHash, crxFilePath);
    const unzip = new Unzip(crxFilePath, outputFolderPath);

    return download.execute()
        .then(() => {
            return unzip.execute();
        })
        .then(() => {
            if (config.deleteCRX) {
                rimraf.sync(crxFilePath);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

module.exports.extensionFlat = extensionFlat;