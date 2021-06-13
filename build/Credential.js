"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCredential = exports.getCredential = exports.saveCredential = void 0;

var _platform = _interopRequireDefault(require("@yosmy/platform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var saveCredential = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(credential) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _platform["default"].secure.set("credential", credential);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function saveCredential(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.saveCredential = saveCredential;

var getCredential = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var credential;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _platform["default"].secure.get("credential");

          case 2:
            credential = _context2.sent;

            if (!(typeof credential === "undefined")) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", false);

          case 5:
            return _context2.abrupt("return", credential);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCredential() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCredential = getCredential;

var deleteCredential = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _platform["default"].secure["delete"]("credential");

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteCredential() {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteCredential = deleteCredential;