import { rename as fsRename, access, constants } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const rename = promisify(fsRename);
const accessAsync = promisify(access);

const renameFile = async () => {
  const sourceFile = join(process.cwd(), 'src', 'fs', 'files', 'wrongFilename.txt');
  const targetFile = join(process.cwd(), 'src', 'fs', 'files', 'properFilename.md');
  
  try {
    await accessAsync(sourceFile, constants.F_OK);
    
    try {
      await accessAsync(targetFile, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw new Error('FS operation failed');
      }
    }
    
    await rename(sourceFile, targetFile);
    console.log('File renamed successfully');
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    throw error;
  }
};

await renameFile();
