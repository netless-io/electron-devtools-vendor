#!/usr/bin/env node

const { extensionFlat } = require("../src");

const { output, name, remove, crxDir, help, _ } = require("minimist")(process.argv.slice(2));
const hash = _[0];

if (help) {
    console.log("Usage: extension-flat hash [option ...]");
    console.log("");
    console.log("  Download and unzip crx file");
    console.log("");
    console.log("    --help         display this usage info");
    console.log("    --name         folder name");
    console.log("    --hash         extension id (e.g. fmkadmapgofadopljbjfkapdkoienihi)");
    console.log("    --remove       delete crx file after unzip complate");
    console.log("    --crxDir       crx folder");
    console.log("    --output       output path");

    process.exit(0);
}

if (!hash || !name || !output) {
    console.log(hash, name, output);
    throw new Error("lose require params");
}

extensionFlat({
    extensionHash: hash,
    folderName: name,
    outputFolder: output,
    crxFolder: crxDir,
    deleteCRX: remove,
}).catch(e => {
    console.log(e);
})