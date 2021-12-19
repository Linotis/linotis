import cluster from "cluster";
import os from 'os';
import { pid } from "process";

if(cluster.isPrimary) {
  const cpusCount = os.cpus().length;
  console.log(`CPUs: ${cpusCount}`);
  console.log(`Master started, pid: ${pid}`);
  for(let i = 0; i < cpusCount - 1; i++ ) {
    const worker = cluster.fork();
    console.log(`Worker pid ${worker.process.pid}`);
  }

  cluster.on('exit', (worker, code) => {
    console.log(`Worker fall! Pid: ${worker.process.pid}. Code ${code}`);
    if (code === 1) {
        cluster.fork();
    }
  });
}

if(cluster.isWorker) {
  require('./index');
}