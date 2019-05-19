"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _difference = _interopRequireDefault(require("lodash/difference"));

var _simpleUi = require("@yosmy/simple-ui");

var _compoundUi = require("@yosmy/compound-ui");

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

var InputPhone =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputPhone, _React$Component);

  function InputPhone(props) {
    var _this;

    _classCallCheck(this, InputPhone);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputPhone).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      phone: {
        country: null,
        prefix: null,
        number: null
      },
      error: null,
      progress: false
    });

    _defineProperty(_assertThisInitialized(_this), "_normalize", function (number) {
      return number.replace(/\D/g, '');
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSubmit", function () {
      if (!_this.state.phone.country) {
        _this.setState({
          error: "Debes seleccionar el país"
        });

        return;
      }

      if (!_this.state.phone.number) {
        _this.setState({
          error: "Debes escribir tu número de teléfono"
        });

        return;
      }

      _this.setState({
        error: null,
        progress: true
      }, function () {
        _this.props.onFinish(_objectSpread({}, _this.state.phone, {
          number: _this._normalize(_this.state.phone.number)
        }), // onInvalidNumber
        function () {
          _this.setState({
            error: "El número es incorrecto. Verifícalo",
            progress: false
          });
        });
      });
    });

    if (_this.props.phone) {
      _this.state = _objectSpread({}, _this.state, {
        phone: _this.props.phone
      });
    }

    return _this;
  }

  _createClass(InputPhone, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return (0, _difference["default"])(this.state, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(this.props.ui.layout, {
        input: _react["default"].createElement(_simpleUi.Container, {
          flow: "column",
          align: {
            justifyContent: 'flex-start',
            alignItems: 'center'
          },
          width: "full"
        }, _react["default"].createElement(_compoundUi.CountryPicker, {
          ui: {
            components: {
              button: _simpleUi.Button,
              container: _simpleUi.Container,
              flag: _compoundUi.Flag,
              image: _simpleUi.Image,
              listItem: _compoundUi.ListItem,
              modal: _simpleUi.Modal,
              text: _simpleUi.Text
            },
            icons: {
              actions: {
                down: this.props.ui.icons.actions.down
              }
            }
          },
          width: 300,
          country: this.state.phone.country,
          favorites: this.props.countries.favorites,
          all: this.props.countries.all,
          messages: {
            select: "Selecciona tu país"
          },
          onSelect: function onSelect(_ref) {
            var country = _ref.country,
                prefix = _ref.prefix;

            _this2.setState({
              phone: _objectSpread({}, _this2.state.phone, {
                country: country,
                prefix: prefix
              })
            });
          }
        }), _react["default"].createElement(_simpleUi.Input, {
          value: this.state.phone.number,
          keyboard: "number",
          width: 300,
          placeholder: "Tel\xE9fono",
          start: function start() {
            if (!_this2.state.phone.prefix) {
              return null;
            }

            return _react["default"].createElement(_simpleUi.Text, null, "+", _this2.state.phone.prefix);
          },
          margin: {
            top: 2
          },
          onChange: function onChange(value) {
            _this2.setState({
              phone: _objectSpread({}, _this2.state.phone, {
                number: value
              })
            });
          },
          onEnter: this._handleSubmit
        }), this.state.error !== null ? _react["default"].createElement(_compoundUi.Error, {
          margin: {
            top: 1
          }
        }, this.state.error) : null),
        buttons: _react["default"].createElement(_simpleUi.Container, {
          flow: "row wrap",
          align: {
            justifyContent: "center"
          },
          margin: {
            top: 2
          }
        }, _react["default"].createElement(_simpleUi.Button, {
          variant: "contained",
          color: "primary",
          progress: this.state.progress,
          disabled: this.state.progress,
          onClick: this._handleSubmit
        }, _react["default"].createElement(this.props.ui.icons.actions["continue"], null), _react["default"].createElement(_simpleUi.Text, null, "Continuar")))
      });
    }
  }]);

  return InputPhone;
}(_react["default"].Component);

_defineProperty(InputPhone, "propTypes", {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired,
    // (input, buttons),
    icons: _propTypes["default"].shape({
      actions: _propTypes["default"].shape({
        down: _propTypes["default"].func.isRequired,
        "continue": _propTypes["default"].func.isRequired
      })
    }).isRequired
  }),
  countries: _propTypes["default"].shape({
    favorites: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired,
    all: _propTypes["default"].bool.isRequired
  }).isRequired,
  phone: _propTypes["default"].shape({
    country: _propTypes["default"].string,
    prefix: _propTypes["default"].string,
    number: _propTypes["default"].string
  }),
  onFinish: _propTypes["default"].func.isRequired // (country, {prefix, number}, onInvalidNumber, onInvalidCode)

});

var _default = InputPhone;
exports["default"] = _default;