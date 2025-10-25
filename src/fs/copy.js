import { promises as fs } from 'fs';
import path from 'path';

const copy = async () => {
  const sourcePath = path.join(process.cwd(), 'src', 'fs', 'files');
  const destPath = path.join(process.cwd(), 'src', 'fs', 'files_copy');
  
  try {
    await fs.access(sourcePath);
    try {
      await fs.access(destPath);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.message === 'FS operation failed') {
        throw error;
      }
    }
    
    await fs.mkdir(destPath, { recursive: true });
    
    await copyDirectory(sourcePath, destPath);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw error;
  }
};

const copyDirectory = async (src, dest) => {
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

await copy();
