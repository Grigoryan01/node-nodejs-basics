import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputFile = join(__dirname, 'archive.gz');
  const outputFile = join(__dirname, 'files', 'fileToCompress.txt');
  
  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gunzipStream = createGunzip();
  
  try {
    await pipeline(readStream, gunzipStream, writeStream);
    console.log('File decompressed successfully from archive.gz');
  } catch (error) {
    console.error('Decompression failed:', error);
  }
};

await decompress();
