"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scope = require("@dekproject/scope");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = function () {
    function Queue(name) {
        _classCallCheck(this, Queue);

        this.name = name;
        this.timeout = 1000;
        this.timer = null;
        this.queue = [];
    }

    _createClass(Queue, [{
        key: "push",
        value: function push(data) {
            this.queue.push(data);
        }
    }, {
        key: "setTimeout",
        value: function setTimeout(timer) {
            if (typeof timer == "Number") this.timeout = timer;
        }
    }, {
        key: "setParser",
        value: function setParser(cb) {
            var _this = this;

            this.timer = setInterval(function () {
                if (_this.queue.length > 0) {
                    var data = _this.queue[0];
                    _this.queue.shift();
                    cb(data, _this.queue.length);
                }
            }, this.timeout);
        }
    }]);

    return Queue;
}();

var Queues = function () {
    function Queues() {
        _classCallCheck(this, Queues);

        this.queues = {};
    }

    _createClass(Queues, [{
        key: "subscribe",
        value: function subscribe(name) {
            if (_typeof(this.queues[name]) !== "object") this.queues[name] = new Queue(name);

            return this.queues[name];
        }
    }]);

    return Queues;
}();

exports.default = function () {
    _scope.$.set("queue", new Queues());
};
//# sourceMappingURL=index.js.map