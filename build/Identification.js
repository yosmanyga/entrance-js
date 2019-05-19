"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _InputPhone = _interopRequireDefault(require("./InputPhone.block"));

var _ConfirmPhone = _interopRequireDefault(require("./ConfirmPhone.block"));

var _InputCode = _interopRequireDefault(require("./InputCode.block"));

var _InputPassword = _interopRequireDefault(require("./InputPassword.block"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Identification =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Identification, _React$Component);

  function Identification(props) {
    var _this;

    _classCallCheck(this, Identification);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Identification).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      step: 'input_phone',
      // 'input_phone', 'confirm_phone', 'input_code', 'input_password'
      phone: {
        country: null,
        prefix: null,
        number: null
      }
    });

    if (_this.props.country) {
      _this.state = _objectSpread({}, _this.state, {
        country: _this.props.country
      });
    }

    if (_this.props.number) {
      _this.state = _objectSpread({}, _this.state, {
        number: _this.props.number
      });
    }

    return _this;
  }

  _createClass(Identification, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      switch (this.state.step) {
        case 'input_phone':
          return _react["default"].createElement(_InputPhone["default"], {
            ui: {
              layout: function layout(_ref) {
                var input = _ref.input,
                    buttons = _ref.buttons;
                return _react["default"].createElement(_this2.props.ui.layout, {
                  title: "Reg\xEDstrate o accede a tu cuenta"
                }, input, buttons);
              },
              icons: {
                actions: {
                  down: this.props.ui.icons.actions.down,
                  "continue": this.props.ui.icons.actions["continue"]
                }
              }
            },
            phone: this.state.phone,
            countries: this.props.countries,
            onFinish: function onFinish(phone, onInvalidNumber) {
              var country = phone.country,
                  prefix = phone.prefix,
                  number = phone.number;

              _this2.props.onProgress(true, function () {
                _this2.props.api.appriseIdentification(country, prefix, number, // onReturn
                function () {
                  _this2.props.onProgress(false, function () {
                    _this2.setState({
                      phone: {
                        country: country,
                        prefix: prefix,
                        number: number
                      },
                      step: 'input_password'
                    });
                  });
                }, // onInvalidNumber
                function () {
                  _this2.props.onProgress(false, function () {
                    onInvalidNumber();
                  });
                }, // onUnknownPhone
                function () {
                  _this2.props.onProgress(false, function () {
                    _this2.setState({
                      phone: {
                        country: country,
                        prefix: prefix,
                        number: number
                      },
                      step: 'confirm_phone'
                    });
                  });
                }, // onUnknownSession
                function () {
                  _this2.props.onProgress(false, function () {
                    _this2.setState({
                      phone: {
                        country: country,
                        prefix: prefix,
                        number: number
                      },
                      step: 'confirm_phone'
                    });
                  });
                }, // onNoPasswordPhone
                function () {
                  _this2.props.onProgress(false, function () {
                    _this2.setState({
                      phone: {
                        country: country,
                        prefix: prefix,
                        number: number
                      },
                      step: 'confirm_phone'
                    });
                  });
                });
              });
            }
          });

        case 'confirm_phone':
          return _react["default"].createElement(_ConfirmPhone["default"], {
            ui: {
              layout: function layout(_ref2) {
                var info = _ref2.info,
                    error = _ref2.error,
                    buttons = _ref2.buttons;
                return _react["default"].createElement(_this2.props.ui.layout, {
                  title: "Verifica tu n\xFAmero"
                }, info, error, buttons);
              },
              icons: {
                actions: {
                  "continue": this.props.ui.icons.actions["continue"],
                  back: this.props.ui.icons.actions.back
                }
              }
            },
            phone: this.state.phone,
            onFinish: function onFinish(onPhoneInvalidNumber, onExceededStarts) {
              _this2.props.onProgress(true, function () {
                _this2.props.api.startIdentificationWithCode(_this2.state.phone.country, _this2.state.phone.prefix, _this2.state.phone.number, // onReturn
                function () {
                  _this2.props.onProgress(false, function () {
                    _this2.setState({
                      step: 'input_code'
                    });
                  });
                }, // onPhoneInvalidNumberException
                function () {
                  _this2.props.onProgress(false, function () {
                    onPhoneInvalidNumber();
                  });
                }, // onVerificationExceededStartsException
                function () {
                  _this2.props.onProgress(false, function () {
                    onExceededStarts();
                  });
                });
              });
            },
            onBack: function onBack() {
              _this2.setState({
                step: 'input_phone'
              });
            }
          });

        case 'input_code':
          return _react["default"].createElement(_InputCode["default"], {
            ui: {
              layout: function layout(_ref3) {
                var info = _ref3.info,
                    input = _ref3.input,
                    error = _ref3.error,
                    buttons = _ref3.buttons;
                return _react["default"].createElement(_this2.props.ui.layout, {
                  title: "Escribe el c\xF3digo de verificaci\xF3n"
                }, info, input, error, buttons);
              },
              icons: {
                actions: {
                  "continue": this.props.ui.icons.actions["continue"],
                  back: this.props.ui.icons.actions.back
                },
                objects: {
                  code: this.props.ui.icons.objects.code
                }
              }
            },
            phone: this.state.phone,
            onFinish: function onFinish(code, onAttemptExceededCompletes, onWrongValueException) {
              _this2.props.onProgress(true, function () {
                _this2.props.api.completeIdentificationWithCode(_this2.state.phone.country, _this2.state.phone.prefix, _this2.state.phone.number, code, // onReturn
                function (credential) {
                  _this2.props.onProgress(false, function () {
                    _this2.props.onFinish(credential);
                  });
                }, // onVerificationAttemptExceededCompletesException
                function () {
                  _this2.props.onProgress(false, function () {
                    onAttemptExceededCompletes();
                  });
                }, // onVerificationCodeWrongValueException
                function () {
                  _this2.props.onProgress(false, function () {
                    onWrongValueException();
                  });
                });
              });
            },
            onBack: function onBack() {
              _this2.setState({
                step: 'input_phone'
              });
            }
          });

        case 'input_password':
          return _react["default"].createElement(_InputPassword["default"], {
            ui: {
              layout: function layout(_ref4) {
                var info = _ref4.info,
                    input = _ref4.input,
                    error = _ref4.error,
                    buttons = _ref4.buttons;
                return _react["default"].createElement(_this2.props.ui.layout, {
                  title: "Accede usando tu pin"
                }, info, input, error, buttons);
              },
              icons: {
                actions: {
                  "continue": this.props.ui.icons.actions["continue"],
                  back: this.props.ui.icons.actions.back
                },
                objects: {
                  password: this.props.ui.icons.objects.password,
                  help: this.props.ui.icons.objects.help
                }
              }
            },
            phone: this.state.phone,
            onFinish: function onFinish(password, onInvalidPassword) {
              _this2.props.onProgress(true, function () {
                if (!password) {
                  _this2.props.onProgress(false, function () {
                    onInvalidPassword();
                  });

                  return;
                }

                _this2.props.api.completeIdentificationWithPassword(_this2.state.phone.country, _this2.state.phone.prefix, _this2.state.phone.number, password, // onReturn
                function (credential) {
                  _this2.props.onProgress(false, function () {
                    _this2.props.onFinish(credential);
                  });
                }, // onInvalidPassword
                function () {
                  _this2.props.onProgress(false, function () {
                    onInvalidPassword();
                  });
                });
              });
            },
            onBack: function onBack() {
              _this2.setState({
                step: 'input_phone'
              });
            },
            onForgot: function onForgot() {
              _this2.setState({
                step: 'confirm_phone'
              });
            }
          });

        default:
          throw "Invalid step ".concat(this.state.step);
      }
    }
  }]);

  return Identification;
}(_react["default"].Component);

_defineProperty(Identification, "propTypes", {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired,
    icons: _propTypes["default"].shape({
      actions: _propTypes["default"].shape({
        "continue": _propTypes["default"].func.isRequired,
        back: _propTypes["default"].func.isRequired,
        down: _propTypes["default"].func.isRequired
      }),
      objects: _propTypes["default"].shape({
        code: _propTypes["default"].func.isRequired,
        help: _propTypes["default"].func.isRequired,
        password: _propTypes["default"].func.isRequired
      })
    }).isRequired
  }).isRequired,
  api: _propTypes["default"].shape({
    appriseIdentification: _propTypes["default"].func.isRequired,
    completeIdentificationWithCode: _propTypes["default"].func.isRequired,
    completeIdentificationWithPassword: _propTypes["default"].func.isRequired,
    startIdentificationWithCode: _propTypes["default"].func.isRequired
  }).isRequired,
  countries: _propTypes["default"].shape({
    favorites: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
    all: _propTypes["default"].bool.isRequired
  }).isRequired,
  country: _propTypes["default"].string,
  number: _propTypes["default"].string,
  onFinish: _propTypes["default"].func.isRequired,
  // (credential)
  onProgress: _propTypes["default"].func.isRequired
});

var _default = Identification;
exports["default"] = _default;