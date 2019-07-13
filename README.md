# @dekproject/queue

Queue manager for DEK

What does this plugin do?

* Control queues by time or completion via Promise
* Group queue blocks for multiple processes multi() example in Redis or bulk() in MongoDB
* Can be implemented in cooperation with RabbitMQ to control queues in multiple clusters or threads

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ yarn add @dekproject/queue --save
```

## Usage

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
