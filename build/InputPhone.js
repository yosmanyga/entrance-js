"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _phoneBuild = require("@yosmy/phone-build");

var _ui = require("@yosmy/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var InputPhone = _react["default"].memo(function (_ref) {
  var ui = _ref.ui,
      initialPhone = _ref.phone,
      countries = _ref.countries,
      onContinue = _ref.onContinue;

  var _useState = (0, _react.useState)(initialPhone || {
    country: null,
    prefix: null,
    number: null
  }),
      _useState2 = _slicedToArray(_useState, 2),
      phone = _useState2[0],
      setPhone = _useState2[1];

  var _useState3 = (0, _react.useState)({
    error: null,
    progress: false
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      execution = _useState4[0],
      setExecution = _useState4[1];

  var handleSubmit = function handleSubmit() {
    if (!phone.country) {
      setExecution({
        error: "Selecciona el país",
        progress: false
      });
      return;
    }

    if (!phone.number) {
      setExecution({
        error: "Escribe el número de teléfono",
        progress: false
      });
      return;
    }

    var builtPhone;

    try {
      builtPhone = (0, _phoneBuild.build)(phone.number, phone.country);
    } catch (e) {
      setExecution({
        error: "El número es incorrecto. Verifícalo",
        progress: false
      });
      return;
    }

    setExecution({
      error: null,
      progress: true
    });
    onContinue(builtPhone, // onInvalidNumber
    function () {
      setExecution({
        error: "El número es incorrecto. Verifícalo",
        progress: false
      });
    });
  };

  var input = /*#__PURE__*/_react["default"].createElement(_ui.Container, {
    align: {
      cross: "center"
    },
    margin: {
      top: 1
    }
  }, /*#__PURE__*/_react["default"].createElement(_ui.CountryPicker, {
    ui: {
      icons: {
        actions: {
          expand: ui.icons.actions.expand
        }
      }
    },
    messages: {
      select: "País"
    },
    country: phone.country,
    favorites: countries.favorites,
    more: countries.more,
    onSelect: function onSelect(_ref2) {
      var country = _ref2.country,
          prefix = _ref2.prefix;
      setExecution({
        error: null,
        progress: false
      });
      setPhone(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          country: country,
          prefix: prefix
        });
      });
    }
  }), /*#__PURE__*/_react["default"].createElement(_ui.Input, {
    value: phone.number,
    keyboard: "number",
    placeholder: "Tel\xE9fono",
    start: phone.prefix && /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "+", phone.prefix),
    margin: {
      top: 2
    },
    onChange: function onChange(value) {
      setExecution({
        error: null,
        progress: false
      });
      setPhone(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          number: value
        });
      });
    },
    onEnter: handleSubmit
  }), execution.error !== null ? /*#__PURE__*/_react["default"].createElement(_ui.Text, {
    type: "error",
    margin: {
      top: 2
    }
  }, execution.error) : null);

  var buttons = /*#__PURE__*/_react["default"].createElement(_ui.Container, {
    flow: "row wrap",
    align: {
      main: "center"
    },
    margin: {
      top: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_ui.Button, {
    type: "primary",
    progress: execution.progress,
    disabled: execution.progress,
    onClick: handleSubmit
  }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Continuar")));

  return /*#__PURE__*/_react["default"].createElement(ui.layout, {
    progress: execution.progress,
    input: input,
    buttons: buttons
  });
}, function () {
  return true;
});

InputPhone.propTypes = {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired,
    // ({input, buttons}),
    icons: _propTypes["default"].shape({
      actions: _propTypes["default"].shape({
        expand: _propTypes["default"].func.isRequired
      })
    }).isRequired
  }),
  countries: _propTypes["default"].shape({
    favorites: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
    more: _propTypes["default"].bool.isRequired
  }).isRequired,
  phone: _propTypes["default"].shape({
    country: _propTypes["default"].string,
    prefix: _propTypes["default"].string,
    number: _propTypes["default"].string
  }),
  onContinue: _propTypes["default"].func.isRequired // (phone, onInvalidNumber)

};
var _default = InputPhone;
exports["default"] = _default;