"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scope = require("@dekproject/scope");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = function () {
    function Queue(name) {
        _classCallCheck(this, Queue);

        this.name = name;
        this.timeout = 1000;
        this.timer = null;
        this.block = 1;
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
            if (typeof timer == "number") this.timeout = timer;
        }
    }, {
        key: "setBlock",
        value: function setBlock(block) {
            if (typeof block == "number") this.block = block;
        }
    }, {
        key: "setParser",
        value: function setParser(cb) {
            var _this = this;

            this.timer = setInterval(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var data, key;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(_this.queue.length > 0)) {
                                    _context.next = 14;
                                    break;
                                }

                                data = [];
                                key = 0;

                            case 3:
                                if (!(key < _this.block)) {
                                    _context.next = 13;
                                    break;
                                }

                                if (!(_this.queue.length > 0)) {
                                    _context.next = 9;
                                    break;
                                }

                                data.push(_this.queue[0]);
                                _this.queue.shift();
                                _context.next = 10;
                                break;

                            case 9:
                                return _context.abrupt("break", 13);

                            case 10:
                                key++;
                                _context.next = 3;
                                break;

                            case 13:

                                if (data.length > 0) cb(data, _this.queue.length, new Date().getTime());

                            case 14:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            })), this.timeout);
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