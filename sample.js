import '@babel/polyfill/noConflict';
import Queue from "./src/index";
import { $, queue } from "@dekproject/scope";

Queue();

$.wait(["queue"]).then(async () => {
    queue.subscribe("test").setTimeout(300);
    queue.subscribe("test").setParser((data, count) => {
        console.log(data, count);
    });

    setInterval(() => {
        queue.subscribe("test").push({ timeout: new Date().getTime() });
    }, 300);
});
