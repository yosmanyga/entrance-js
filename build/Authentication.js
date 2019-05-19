"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputPhone = _interopRequireDefault(require("./InputPhone"));

var _ConfirmPhone = _interopRequireDefault(require("./ConfirmPhone"));

var _InputCode = _interopRequireDefault(require("./InputCode"));

var _InputPassword = _interopRequireDefault(require("./InputPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Authentication = function Authentication(_ref) {
  var ui = _ref.ui,
      api = _ref.api,
      countries = _ref.countries,
      onAuthenticate = _ref.onAuthenticate;

  var _useState = (0, _react.useState)('input_phone'),
      _useState2 = _slicedToArray(_useState, 2),
      step = _useState2[0],
      setStep = _useState2[1]; // 'input_phone', 'confirm_phone', 'input_code', 'input_password'


  var _useState3 = (0, _react.useState)({
    country: null,
    prefix: null,
    number: null
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      phone = _useState4[0],
      setPhone = _useState4[1];

  switch (step) {
    case 'input_phone':
      return /*#__PURE__*/_react["default"].createElement(_InputPhone["default"], {
        ui: {
          layout: ui.layouts.inputPhone,
          icons: {
            actions: {
              expand: ui.icons.actions.expand
            }
          }
        },
        phone: phone,
        countries: countries,
        onContinue: function onContinue(phone, onInvalidNumber, onDenied) {
          var country = phone.country,
              prefix = phone.prefix,
              number = phone.number;
          api.startAuthenticationWithPassword(country, prefix, number, // onReturn
          function () {
            setPhone({
              country: country,
              prefix: prefix,
              number: number
            });
            setStep('input_password');
          }, // onPhoneInvalidNumberException
          function () {
            onInvalidNumber();
          }, // onUnsupportedAuthenticationException
          function () {
            setPhone({
              country: country,
              prefix: prefix,
              number: number
            });
            setStep('confirm_phone');
          }, // onDeniedAuthenticationException
          function () {
            onDenied();
          });
        }
      });

    case 'confirm_phone':
      return /*#__PURE__*/_react["default"].createElement(_ConfirmPhone["default"], {
        ui: {
          layout: ui.layouts.confirmPhone
        },
        phone: phone,
        onContinue: function onContinue(onDenied) {
          api.startAuthenticationWithCode(phone.country, phone.prefix, phone.number, // onReturn
          function () {
            setStep('input_code');
          }, // onDenied
          function (_ref2) {
            var message = _ref2.message;
            onDenied(message);
          });
        },
        onBack: function onBack() {
          setStep('input_phone');
        }
      });

    case 'input_code':
      return /*#__PURE__*/_react["default"].createElement(_InputCode["default"], {
        ui: {
          layout: ui.layouts.inputCode,
          icons: {
            objects: {
              code: ui.icons.objects.code
            }
          }
        },
        phone: phone,
        onContinue: function onContinue(code, onDeniedAuthentication) {
          api.completeAuthenticationWithCode(phone.country, phone.prefix, phone.number, code, // onReturn
          function (credential) {
            onAuthenticate(credential);
          }, // onDeniedAuthentication
          function (_ref3) {
            var message = _ref3.message;
            onDeniedAuthentication(message);
          });
        },
        onBack: function onBack() {
          setStep('input_phone');
        }
      });

    case 'input_password':
      return /*#__PURE__*/_react["default"].createElement(_InputPassword["default"], {
        ui: {
          layout: ui.layouts.inputPassword,
          icons: {
            objects: {
              password: ui.icons.objects.password,
              help: ui.icons.objects.help
            }
          }
        },
        phone: phone,
        onContinue: function onContinue(password, onDenied) {
          api.completeAuthenticationWithPassword(phone.country, phone.prefix, phone.number, password, // onReturn
          function (credential) {
            onAuthenticate(credential);
          }, // onDeniedAuthenticationException
          function (_ref4) {
            var message = _ref4.message;
            onDenied(message);
          });
        },
        onBack: function onBack() {
          setStep('input_phone');
        },
        onForgot: function onForgot() {
          setStep('confirm_phone');
        }
      });

    default:
      throw "Invalid step ".concat(step);
  }
};

Authentication.propTypes = {
  ui: _propTypes["default"].shape({
    layouts: _propTypes["default"].shape({
      inputPhone: _propTypes["default"].func.isRequired,
      confirmPhone: _propTypes["default"].func.isRequired,
      inputCode: _propTypes["default"].func.isRequired,
      inputPassword: _propTypes["default"].func.isRequired
    }).isRequired,
    icons: _propTypes["default"].shape({
      actions: _propTypes["default"].shape({
        expand: _propTypes["default"].func.isRequired
      }),
      objects: _propTypes["default"].shape({
        code: _propTypes["default"].func.isRequired,
        help: _propTypes["default"].func.isRequired,
        password: _propTypes["default"].func.isRequired
      })
    }).isRequired
  }).isRequired,
  api: _propTypes["default"].shape({
    startAuthenticationWithPassword: _propTypes["default"].func.isRequired,
    completeAuthenticationWithPassword: _propTypes["default"].func.isRequired,
    startAuthenticationWithCode: _propTypes["default"].func.isRequired,
    completeAuthenticationWithCode: _propTypes["default"].func.isRequired
  }).isRequired,
  countries: _propTypes["default"].shape({
    favorites: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
    more: _propTypes["default"].bool.isRequired
  }).isRequired,
  onAuthenticate: _propTypes["default"].func.isRequired // (credential)

};
var _default = Authentication;
exports["default"] = _default;