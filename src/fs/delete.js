import { unlink } from 'fs/promises';
import { join } from 'path';

const remove = async () => {
  const filePath = join(import.meta.url.replace('file://', ''), 'files', 'fileToRemove.txt');
  
  try {
    await unlink(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw error;
  }
};

await remove();
