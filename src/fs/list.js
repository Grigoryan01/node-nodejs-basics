import { readdir } from 'fs/promises';
import { join } from 'path';

const list = async () => {
  try {
    const filesPath = join(process.cwd(), 'src', 'fs', 'files');
    const files = await readdir(filesPath);
    console.log(files);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await list();
