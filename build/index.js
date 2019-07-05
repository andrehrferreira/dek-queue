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
        this.parsePromise = false;
    }

    _createClass(Queue, [{
        key: "push",
        value: function push(data) {
            this.queue.push(data);
            return this;
        }
    }, {
        key: "setTimeout",
        value: function setTimeout(timer) {
            if (typeof timer == "number") this.timeout = timer;

            return this;
        }
    }, {
        key: "setBlock",
        value: function setBlock(block) {
            if (typeof block == "number") this.block = block;

            return this;
        }
    }, {
        key: "parserReturnPromise",
        value: function parserReturnPromise(returnPromise) {
            if (typeof returnPromise == "boolean") this.parsePromise = returnPromise;

            return this;
        }
    }, {
        key: "setParser",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cb) {
                var _this = this;

                var data, key;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this.parsePromise) {
                                    _context2.next = 25;
                                    break;
                                }

                                _context2.prev = 1;

                                if (!(this.queue.length > 0)) {
                                    _context2.next = 18;
                                    break;
                                }

                                data = [];
                                key = 0;

                            case 5:
                                if (!(key < this.block)) {
                                    _context2.next = 15;
                                    break;
                                }

                                if (!(this.queue.length > 0)) {
                                    _context2.next = 11;
                                    break;
                                }

                                data.push(this.queue[0]);
                                this.queue.shift();
                                _context2.next = 12;
                                break;

                            case 11:
                                return _context2.abrupt("break", 15);

                            case 12:
                                key++;
                                _context2.next = 5;
                                break;

                            case 15:
                                if (!(data.length > 0)) {
                                    _context2.next = 18;
                                    break;
                                }

                                _context2.next = 18;
                                return cb(data, this.queue.length, new Date().getTime());

                            case 18:
                                _context2.next = 22;
                                break;

                            case 20:
                                _context2.prev = 20;
                                _context2.t0 = _context2["catch"](1);

                            case 22:

                                setTimeout(function (cb) {
                                    _this.setParser(cb);
                                }, this.timeout, cb);
                                _context2.next = 26;
                                break;

                            case 25:
                                this.timer = setInterval(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var _data, _key;

                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.prev = 0;

                                                    if (!(_this.queue.length > 0)) {
                                                        _context.next = 15;
                                                        break;
                                                    }

                                                    _data = [];
                                                    _key = 0;

                                                case 4:
                                                    if (!(_key < _this.block)) {
                                                        _context.next = 14;
                                                        break;
                                                    }

                                                    if (!(_this.queue.length > 0)) {
                                                        _context.next = 10;
                                                        break;
                                                    }

                                                    _data.push(_this.queue[0]);
                                                    _this.queue.shift();
                                                    _context.next = 11;
                                                    break;

                                                case 10:
                                                    return _context.abrupt("break", 14);

                                                case 11:
                                                    _key++;
                                                    _context.next = 4;
                                                    break;

                                                case 14:

                                                    if (_data.length > 0) cb(_data, _this.queue.length, new Date().getTime());

                                                case 15:
                                                    _context.next = 19;
                                                    break;

                                                case 17:
                                                    _context.prev = 17;
                                                    _context.t0 = _context["catch"](0);

                                                case 19:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this, [[0, 17]]);
                                })), this.timeout);

                            case 26:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[1, 20]]);
            }));

            function setParser(_x) {
                return _ref.apply(this, arguments);
            }

            return setParser;
        }()
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