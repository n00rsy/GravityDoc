'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NameDocModal = function (_React$Component) {
    _inherits(NameDocModal, _React$Component);

    function NameDocModal(props) {
        _classCallCheck(this, NameDocModal);

        var _this = _possibleConstructorReturn(this, (NameDocModal.__proto__ || Object.getPrototypeOf(NameDocModal)).call(this, props));

        _this.state = { value: '' };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(NameDocModal, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ value: event.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {

            if (this.state.value.length > 30 || this.state.value.length == 0) {
                setDocumentTitle("Untitled Document");
            } else {
                setDocumentTitle(this.state.value);
            }
            event.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { className: 'modal', id: 'renameModal', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'renameModalLabel', 'aria-hidden': 'true' },
                React.createElement(
                    'div',
                    { className: 'modal-dialog', role: 'document' },
                    React.createElement(
                        'div',
                        { className: 'modal-content' },
                        React.createElement(
                            'div',
                            { className: 'modal-header' },
                            React.createElement(
                                'h5',
                                { className: 'modal-title', id: 'renameModalLabel' },
                                'Rename Document'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                                React.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '\xD7'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-body' },
                            React.createElement(
                                'form',
                                { onSubmit: this.handleSubmit },
                                React.createElement('input', { className: 'form-control', type: 'text', value: this.state.value, onChange: this.handleChange })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'modal-footer' },
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-secondary', 'data-dismiss': 'modal' },
                                'Cancel'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', className: 'btn btn-primary', 'data-dismiss': 'modal', onClick: this.handleSubmit },
                                'Save'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return NameDocModal;
}(React.Component);

/*
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#renameModal">
                        Launch demo modal
                    </button>
                    */

var domContainer = document.querySelector('#nameDocModalContainer');
ReactDOM.render(React.createElement(NameDocModal, null), domContainer);