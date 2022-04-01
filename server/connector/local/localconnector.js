import fs from 'fs';
import path from 'path';

import {Connector}  from '../connector';
export class LocalConnector extends Connector {
    constructor(baseFolder) {
        super();
        this.baseFolder = baseFolder;
    }
    async getFiles(folder) {
        const fullFolderPath = path.join(this.baseFolder, folder);
        return new Promise((resolve, reject) => {
            if (fs.existsSync(fullFolderPath)) {
                fs.readdir(fullFolderPath, (err, files) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(files);
                });
            } else {
                resolve([]);
            }
        });
    }
    async getFile(fileName, options) {
        const fullFilePath = path.join(this.baseFolder, fileName);
        return new Promise((resolve, reject) => {
            fs.readFile(fullFilePath, options, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(file);
                }
            });
        });
    };    
}