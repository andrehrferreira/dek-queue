import { $ } from "@dekproject/scope";

class Queue {
    constructor(name) {
        this.name = name;
        this.timeout = 1000;
        this.timer = null;
        this.queue = [];
    }

    push(data){
        this.queue.push(data);
    }

    setTimeout(timer){
        if(typeof timer == "number")
            this.timeout = timer;
    }

    setParser(cb){
        this.timer = setInterval(() => {
            if(this.queue.length > 0){
                let data = this.queue[0];
                this.queue.shift();
                cb(data, this.queue.length);
            }
        }, this.timeout);
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
