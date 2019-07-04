import '@babel/polyfill/noConflict';
import Queue from "./src/index";
import { $, queue } from "@dekproject/scope";

Queue();

$.wait(["queue"]).then(async () => {
    queue.subscribe("test").setTimeout(2000);
    queue.subscribe("test").setBlock(100);

    queue.subscribe("test").setParser((data, count, blockID) => {
        console.log({
            block: blockID,
            length: data.length,
            data: data
        });

        //data.map((item) => console.log("data:", item));
    });

    setInterval(() => {
        queue.subscribe("test").push({ timeout: new Date().getTime() });
    }, 300);
});
