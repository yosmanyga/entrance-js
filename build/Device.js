"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDeviceData = exports.deleteDevice = exports.getDevice = exports.saveDevice = void 0;

var _platform = _interopRequireDefault(require("@yosmy/platform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var saveDevice = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(device) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _platform["default"].secure.set("device", device);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function saveDevice(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.saveDevice = saveDevice;

var getDevice = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var device;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _platform["default"].secure.get("device");

          case 2:
            device = _context2.sent;

            if (!(typeof device === "undefined")) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", false);

          case 5:
            return _context2.abrupt("return", device);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getDevice() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getDevice = getDevice;

var deleteDevice = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _platform["default"].secure["delete"]("device");

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteDevice() {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteDevice = deleteDevice;

var getDeviceData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Promise.all([_platform["default"].application.raw(), _platform["default"].cellular.raw(), _platform["default"].device.raw(), _platform["default"].network.raw()]);

          case 2:
            data = _context4.sent;
            data = JSON.stringify({
              application: data[0],
              cellular: data[1],
              device: data[2],
              network: data[3]
            });
            return _context4.abrupt("return", data);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getDeviceData() {
    return _ref4.apply(this, arguments);
  };
}();

exports.getDeviceData = getDeviceData;