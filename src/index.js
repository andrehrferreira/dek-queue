import { $ } from "@dekproject/scope";

class Queue {
    constructor(name) {
        this.name = name;
        this.timeout = 1000;
        this.timer = null;
        this.block = 1;
        this.queue = [];
        this.promise = false;
    }

    push(data){
        this.queue.push(data);
        return this;
    }

    setTimeout(v){
        if(typeof v == "number")
            this.timeout = v;

        return this;
    }

    setBlock(v){
        if(typeof v == "number")
            this.block = v;

        return this;
    }

    returnPromise(v){
        if(typeof v == "boolean")
            this.promise = v;

        return this;
    }

    async setParser(cb){
        if(this.promise){
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

$.set("queue", new Queues());
