# @dekproject/queue

Queue manager for DEK

What does this plugin do?

* Control queues by time or completion via Promise
* Group queue blocks for multiple processes multi() example in Redis or bulk() in MongoDB
* Can be implemented in cooperation with RabbitMQ to control queues in multiple clusters or threads

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ npm i -g @dekproject/cli
$ dek install queue
```

or

```bash
$ npm i @dekproject/queue @dekproject/scope
```

## Usage

Using direct

```bash
$ npm i @dekproject/scope
```

```js
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
    queue.subscribe("test").parserReturnPromise(true).setTimeout(100).setBlock(100).setParser((data, count, blockID) => {
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
```

Using in the standard DEK skeleton

```js
import { $, queue } from "@dekproject/scope";

$.wait("queue").then(() => {
    queue.subscribe("test").parserReturnPromise(true).setTimeout(100).setBlock(100).setParser((data, count, blockID) => {
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
});
```
