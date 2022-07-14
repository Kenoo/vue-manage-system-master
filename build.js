const {
    isMainThread,
    parentPort,
    workerData,
    Worker
  } = require('worker_threads');
  const process = require("child_process");
  require("./date_format");
  const fs=require("fs");

  const apps = [];
  const apps_cnt = 6;
  
  function mainThread() {
    console.log(new Date().format("yyyy-MM-dd HH:mm:ss"));
    for (let i = 0; i < apps_cnt; i++) {
      const worker = new Worker(__filename, { workerData: i });
      apps.push(i);
      worker.on('exit', code => { 
        console.log(`main: worker stopped with exit code ${code}`); 
        checkAllFinished();
      });
      worker.on('message', msg => {
        worker.postMessage(msg);
      });
    }
  }
  
  function workerThread() {
    console.log(`worker: workerDate ${workerData}`);
    parentPort.postMessage(workerData);
    process.exec('sh ./build.sh '+workerData, (error, stdout, stderr) => {
        console.log("build success:"+workerData);
        console.log(new Date().format("yyyy-MM-dd HH:mm:ss"));
    });

  }

  /**
   * 检查所有app是否已经打包完成
   */
  function checkAllFinished () {
    let index=0;
    for (index=0; index < apps_cnt; index++){
      if (!fs.existsSync("./dist"+ apps[index])){
        break;
      }
    }
    if (index === apps_cnt) {
      console.log("all apps builded");
    }
  }
  
  if (isMainThread) {
    mainThread();
  } else {
    workerThread();
  }