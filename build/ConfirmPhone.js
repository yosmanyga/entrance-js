"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ui = require("@yosmy/ui");

var _phone = require("@yosmy/phone");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ConfirmPhone = _react["default"].memo(function (_ref) {
  var ui = _ref.ui,
      phone = _ref.phone,
      onContinue = _ref.onContinue,
      onBack = _ref.onBack;

  var _useState = (0, _react.useState)({
    error: null,
    progress: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      execution = _useState2[0],
      setExecution = _useState2[1];

  var handleSubmit = function handleSubmit() {
    setExecution({
      error: null,
      progress: true
    });
    onContinue( // onDenied
    function (message) {
      setExecution({
        error: message,
        progress: false
      });
    });
  };

  return /*#__PURE__*/_react["default"].createElement(ui.layout, {
    progress: execution.progress,
    phone: /*#__PURE__*/_react["default"].createElement(_phone.Phone, {
      country: phone.country,
      prefix: phone.prefix,
      number: phone.number,
      humanized: true
    }),
    error: execution.error && /*#__PURE__*/_react["default"].createElement(_ui.Text, {
      type: "error",
      margin: {
        top: 2
      }
    }, execution.error),
    buttons: /*#__PURE__*/_react["default"].createElement(_ui.Container, {
      flow: "row",
      align: {
        main: "center",
        cross: "center"
      },
      margin: {
        top: 2
      }
    }, /*#__PURE__*/_react["default"].createElement(_ui.Button, {
      type: "secondary",
      disabled: execution.progress,
      onClick: onBack
    }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Regresar")), /*#__PURE__*/_react["default"].createElement(_ui.Button, {
      type: "primary",
      margin: {
        left: 1
      },
      progress: execution.progress,
      disabled: execution.progress,
      onClick: handleSubmit
    }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "S\xED, es correcto")))
  });
}, function () {
  return true;
});

ConfirmPhone.propTypes = {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired // (phone, error, buttons),

  }),
  phone: _propTypes["default"].shape({
    country: _propTypes["default"].string.isRequired,
    prefix: _propTypes["default"].string.isRequired,
    number: _propTypes["default"].string.isRequired
  }).isRequired,
  onContinue: _propTypes["default"].func.isRequired,
  // (onDenied)
  onBack: _propTypes["default"].func.isRequired // ()

};
var _default = ConfirmPhone;
exports["default"] = _default;