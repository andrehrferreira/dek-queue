# @dekproject/queue

Queue manager for DEK

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
}).catch((e) => {
    console.log("The wait timeout was reached without loading the dependencies");
    process.exit(-1);
});
```

Using in the standard DEK skeleton

```js
import { $, queue } from "@dekproject/scope";

$.wait("queue").then(() => {
    queue.subscribe("test").setTimeout(2000);
    queue.subscribe("test").setBlock(100);

    queue.subscribe("test").setParser((data, count, blockID) => {
        console.log({
            block: blockID,
            length: data.length,
            data: data
        });
    });

    setInterval(() => {
        queue.subscribe("test").push({ timeout: new Date().getTime() });
    }, 300);
});
```
