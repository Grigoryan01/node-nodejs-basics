import { Worker } from 'worker_threads';
import os from 'os';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const numCores = os.cpus().length;
  
  const results = [];
  
  const workers = [];
  
  for (let i = 0; i < numCores; i++) {
    const worker = new Worker(join(__dirname, 'worker.js'));
    workers.push(worker);
  }
  
  const promises = workers.map((worker, index) => {
    return new Promise((resolve) => {
      const data = 10 + index; 
      
      worker.postMessage(data);
      
      worker.on('message', (result) => {
        resolve(result);
        worker.terminate();
      });
      
      worker.on('error', (error) => {
        resolve({ status: 'error', data: null });
        worker.terminate();
      });
    });
  });
  
  const workerResults = await Promise.all(promises);
  
  console.log(workerResults);
};

await performCalculations();
