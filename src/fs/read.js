import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const content = await readFile(filePath, 'utf8');
    console.log(content);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await read();
