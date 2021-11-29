# extension-flat

Download and unzip crx file

## CLI

```txt
Usage: extension-flat hash --name=NAME [option ...]

  Download and unzip crx file

    --help         display this usage info
    --name         folder name
    --remove       delete crx file after unzip complate
    --crxDir       crx folder
    --output       output path
```

## API

```javascript
/**
 * @param {object} config
 * @param {string} config.extensionHash - extension id (e.g. fmkadmapgofadopljbjfkapdkoienihi)
 * @param {string} config.outputFolder - output folder
 * @param {boolean} [config.deleteCRX] - delete crx file after unzip complate
 * @param {string} [config.crxFolder] - crx folder
 * @param {string} config.folderName - folder name
 */
```