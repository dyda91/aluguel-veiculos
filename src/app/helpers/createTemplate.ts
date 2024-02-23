import fs from 'fs';

export const createTemplate = (path) => {
    const htmlFile = fs.readFileSync(path, 'utf-8');
    return htmlFile;
}