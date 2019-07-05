import { $ } from "@dekproject/scope";

class Queue {
    constructor(name) {
        this.name = name;
        this.timeout = 1000;
        this.timer = null;
        this.block = 1;
        this.queue = [];
        this.parsePromise = false;
    }

    push(data){
        this.queue.push(data);
        return this;
    }

    setTimeout(timer){
        if(typeof timer == "number")
            this.timeout = timer;

        return this;
    }

    setBlock(block){
        if(typeof block == "number")
            this.block = block;

        return this;
    }

    parserReturnPromise(returnPromise){
        if(typeof returnPromise == "boolean")
            this.parsePromise = returnPromise;

        return this;
    }

    async setParser(cb){
        if(this.parsePromise){
            try{
                if(this.queue.length > 0){
                    let data = [];

                    for(let key = 0; key < this.block; key++){
                        if(this.queue.length > 0){
                            data.push(this.queue[0]);
                            this.queue.shift();
                        }
                        else{
                            break;
                        }
                    }

                    if(data.length > 0){
                        await cb(data, this.queue.length, new Date().getTime());
                    }
                }
            }
            catch(e){ }

            setTimeout((cb) => { this.setParser(cb); }, this.timeout, cb);
        }
        else{
            this.timer = setInterval(async () => {
                try{
                    if(this.queue.length > 0){
                        let data = [];

                        for(let key = 0; key < this.block; key++){
                            if(this.queue.length > 0){
                                data.push(this.queue[0]);
                                this.queue.shift();
                            }
                            else{
                                break;
                            }
                        }

                        if(data.length > 0)
                            cb(data, this.queue.length, new Date().getTime());
                    }
                }
                catch(e){ }
            }, this.timeout);
        }
    }
}

class Queues{
    constructor() {
        this.queues = {};
    }

    subscribe(name){
        if(typeof this.queues[name] !== "object")
            this.queues[name] = new Queue(name);

        return this.queues[name];
    }
}

export default () => {
    $.set("queue", new Queues());
}
