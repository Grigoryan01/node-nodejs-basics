import { writeFile, access, constants } from 'fs/promises';
import { join } from 'path';

const create = async () => {
  const filePath = join(process.cwd(), 'src', 'fs', 'files', 'fresh.txt');
  
  try {
    await access(filePath, constants.F_OK);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await writeFile(filePath, 'I am fresh and young');
        console.log('File created successfully');
      } catch (writeError) {
        throw new Error('FS operation failed');
      }
    } else {
      throw error;
    }
  }
};

await create();
