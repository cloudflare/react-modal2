'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactGateway = require('react-gateway');
var CSSTransitionGroup = require('react-addons-css-transition-group');
var ReactModal2 = require('../../');

var Modal = React.createClass({
  propType: {
    isOpen: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    closeOnEsc: React.PropTypes.bool,
    closeOnBackdropClick: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      closeOnEsc: true,
      closeOnBackdropClick: true
    };
  },

  handleClose: function() {
    this.props.onClose();
  },

  render: function() {
    return React.createElement(ReactGateway, null,
      React.createElement(CSSTransitionGroup, {
        transitionName: 'modal',
        transitionAppear: true,
        transitionAppearTimeout: 200,
        transitionEnterTimeout: 200,
        transitionLeaveTimeout: 200
      },
        this.props.isOpen && React.createElement(ReactModal2, {
          key: 'modal',

          onClose: this.handleClose,
          closeOnEsc: this.props.closeOnEsc,
          closeOnBackdropClick: this.props.closeOnEsc,

          backdropClassName: 'modal-backdrop',
          modalClassName: 'modal'
        }, this.props.children)
      )
    );
  }
});

var Application = React.createClass({
  getInitialState: function() {
    return {
      isModalOpen: false
    };
  },

  handleOpen: function() {
    this.setState({ isModalOpen: true });
  },

  handleClose: function() {
    this.setState({ isModalOpen: false });
  },

  render: function() {
    return React.createElement('div', null,
      React.createElement('h1', null, 'ReactModal2 Example: Animated'),
      React.createElement('button', { onClick: this.handleOpen }, 'Open Modal'),
      React.createElement(Modal, { onClose: this.handleClose, isOpen: this.state.isModalOpen },
        React.createElement('h1', null, 'Hello from Modal'),
        React.createElement('button', { onClick: this.handleClose }, 'Close Modal')
      )
    );
  }
});

var rootElement = document.getElementById('root');
ReactModal2.setApplicationElement(rootElement);
ReactDOM.render(React.createElement(Application), rootElement);
