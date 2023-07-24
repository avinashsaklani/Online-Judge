const { exec } = require('child_process');
const { error } = require('console');
const fs = require('fs');
const path = require('path');
const { stdout, stderr } = require('process');
const { v4: uuid } = require('uuid');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];  //[ab3d6074 - e5ec - 40f6 - b678 - e5618ad9598e,cpp]
    const outPath = path.join(outputPath, `${jobId}.exe`);
    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );

    })

}

module.exports = {
    executeCpp,
}