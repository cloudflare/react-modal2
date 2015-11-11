'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var ReactGateway = require('react-gateway');
var ReactModal2 = require('../../');

/**
 * Constants
 */

var ActionTypes = {
  MODAL_OPEN: 'MODAL_OPEN',
  MODAL_CLOSE: 'MODAL_ClOSE'
};

/**
 * Actions
 */

var actions = {
  modalOpen: function() {
    return { type: ActionTypes.MODAL_OPEN };
  },
  modalClose: function() {
    return { type: ActionTypes.MODAL_CLOSE };
  }
};

/**
 * Reducer
 */

function reducer(state, action) {
  if (!state) state = { isModalOpen: false };

  switch (action.type) {
    case ActionTypes.MODAL_OPEN: return { isModalOpen: true };
    case ActionTypes.MODAL_CLOSE: return { isModalOpen: false };
    default: return state;
  }
}

/**
 * Modal Component
 */

var Modal = React.createClass({
  propType: {
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
      React.createElement(ReactModal2, {
        onClose: this.handleClose,
        closeOnEsc: this.props.closeOnEsc,
        closeOnBackdropClick: this.props.closeOnEsc,

        backdropClassName: 'modal-backdrop',
        modalClassName: 'modal'
      }, this.props.children)
    );
  }
});

/**
 * Application Container
 */

function getApplicationProps(state) {
  return { isModalOpen: state.isModalOpen };
}

var Application = ReactRedux.connect(getApplicationProps)(React.createClass({
  handleOpen: function() {
    this.props.dispatch(actions.modalOpen());
  },

  handleClose: function() {
    this.props.dispatch(actions.modalClose());
  },

  render: function() {
    return React.createElement('div', null,
      React.createElement('h1', null, 'ReactModal2 Example: Redux'),
      React.createElement('button', { onClick: this.handleOpen }, 'Open Modal'),
      this.props.isModalOpen && React.createElement(Modal, { onClose: this.handleClose },
        React.createElement('h1', null, 'Hello from Modal'),
        React.createElement('button', { onClick: this.handleClose }, 'Close Modal')
      )
    );
  }
}));

/**
 * Init
 */

var rootElement = document.getElementById('root');
ReactModal2.setApplicationElement(rootElement);

var store = Redux.createStore(reducer);
var dom = React.createElement(ReactRedux.Provider, { store: store },
  React.createElement(Application)
);

ReactDOM.render(dom, rootElement);
