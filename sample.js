import '@babel/polyfill/noConflict';
import Queue from "./src/index";
import { $, queue } from "@dekproject/scope";

Queue();

$.wait(["queue"]).then(async () => {

    //Interval queue
    /*queue.subscribe("test").setTimeout(2000).setBlock(100).setParser((data, count, blockID) => {
        console.log({
            block: blockID,
            length: data.length,
            data: data
        });
    });*/

    //Promise queue
    queue.subscribe("test").parserReturnPromise(true).setTimeout(1000).setBlock(100).setParser((data, count, blockID) => {
        return new Promise((resolve, reject) => {
            console.log({
                block: blockID,
                length: data.length,
                data: data
            });

            resolve();
        });
    });

    setInterval(() => {
        queue.subscribe("test").push({ timeout: new Date().getTime() });
    }, 100);
}).catch((e) => {
    console.log("The wait timeout was reached without loading the dependencies");
    process.exit(-1);
});
