"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Authentication", {
  enumerable: true,
  get: function get() {
    return _Authentication["default"];
  }
});
Object.defineProperty(exports, "ConfirmPhone", {
  enumerable: true,
  get: function get() {
    return _ConfirmPhone["default"];
  }
});
Object.defineProperty(exports, "InputCode", {
  enumerable: true,
  get: function get() {
    return _InputCode["default"];
  }
});
Object.defineProperty(exports, "InputEmailAndPassword", {
  enumerable: true,
  get: function get() {
    return _InputEmailAndPassword["default"];
  }
});
Object.defineProperty(exports, "InputPassword", {
  enumerable: true,
  get: function get() {
    return _InputPassword["default"];
  }
});
Object.defineProperty(exports, "InputPhone", {
  enumerable: true,
  get: function get() {
    return _InputPhone["default"];
  }
});
Object.defineProperty(exports, "saveCredential", {
  enumerable: true,
  get: function get() {
    return _Credential.saveCredential;
  }
});
Object.defineProperty(exports, "getCredential", {
  enumerable: true,
  get: function get() {
    return _Credential.getCredential;
  }
});
Object.defineProperty(exports, "deleteCredential", {
  enumerable: true,
  get: function get() {
    return _Credential.deleteCredential;
  }
});
Object.defineProperty(exports, "saveDevice", {
  enumerable: true,
  get: function get() {
    return _Device.saveDevice;
  }
});
Object.defineProperty(exports, "getDevice", {
  enumerable: true,
  get: function get() {
    return _Device.getDevice;
  }
});
Object.defineProperty(exports, "deleteDevice", {
  enumerable: true,
  get: function get() {
    return _Device.deleteDevice;
  }
});
Object.defineProperty(exports, "getDeviceData", {
  enumerable: true,
  get: function get() {
    return _Device.getDeviceData;
  }
});

var _Authentication = _interopRequireDefault(require("./Authentication"));

var _ConfirmPhone = _interopRequireDefault(require("./ConfirmPhone"));

var _InputCode = _interopRequireDefault(require("./InputCode"));

var _InputEmailAndPassword = _interopRequireDefault(require("./InputEmailAndPassword"));

var _InputPassword = _interopRequireDefault(require("./InputPassword"));

var _InputPhone = _interopRequireDefault(require("./InputPhone"));

var _Credential = require("./Credential");

var _Device = require("./Device");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }