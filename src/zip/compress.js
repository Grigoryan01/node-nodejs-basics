import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const inputFile = join(__dirname, 'files', 'fileToCompress.txt');
  const outputFile = join(__dirname, 'archive.gz');
  
  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gzipStream = createGzip();
  
  try {
    await pipeline(readStream, gzipStream, writeStream);
    console.log('File compressed successfully to archive.gz');
  } catch (error) {
    console.error('Compression failed:', error);
  }
};

await compress();
