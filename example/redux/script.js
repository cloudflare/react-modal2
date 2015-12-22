import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {
  Gateway,
  GatewayDest,
  GatewayProvider
} from 'react-gateway';
import ReactModal2 from '../../src/index';

/**
 * Constants
 */

const ActionTypes = {
  MODAL_OPEN: 'MODAL_OPEN',
  MODAL_CLOSE: 'MODAL_ClOSE'
};

/**
 * Actions
 */

const actions = {
  modalOpen: () => ({ type: ActionTypes.MODAL_OPEN }),
  modalClose: () => ({ type: ActionTypes.MODAL_CLOSE })
};

/**
 * Reducer
 */

const initialState = { isModalOpen: false };;

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MODAL_OPEN: return { ...state, isModalOpen: true };
    case ActionTypes.MODAL_CLOSE: return { ...state, isModalOpen: false };
    default: return state;
  }
}

/**
 * Modal Component
 */

class Modal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    closeOnEsc: PropTypes.bool,
    closeOnBackdropClick: PropTypes.bool
  };

  static defaultProps = {
    closeOnEsc: true,
    closeOnBackdropClick: true
  };

  handleClose() {
    this.props.onClose();
  }

  render() {
    return (
      <Gateway into="example">
        <ReactModal2
          onClose={this.handleClose.bind(this)}
          closeOnEsc={this.props.closeOnEsc}
          closeOnBackdropClick={this.props.closeOnEsc}

          backdropClassName='modal-backdrop'
          modalClassName='modal'>
          {this.props.children}
        </ReactModal2>
      </Gateway>
    );
  }
}

/**
 * Application Container
 */

class Application extends React.Component {
  handleOpen() {
    this.props.dispatch(actions.modalOpen());
  }

  handleClose() {
    this.props.dispatch(actions.modalClose());
  }

  render() {
    return (
      <GatewayProvider>
        <div>
          <div id="application">
            <h1>ReactModal2 Example: Redux</h1>
            <button onClick={this.handleOpen.bind(this)}>Open Modal</button>
            {this.props.isModalOpen && (
              <Modal onClose={this.handleClose.bind(this)}>
                <h1>Hello from Modal</h1>
                <button onClick={this.handleClose.bind(this)}>Close Modal</button>
              </Modal>
            )}
          </div>
          <GatewayDest name="example"/>
        </div>
      </GatewayProvider>
    );
  }
}

Application = connect(state => ({ isModalOpen: state.isModalOpen }))(Application);

/**
 * Init
 */

ReactModal2.getApplicationElement = () => document.getElementById('application');

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Application/>
  </Provider>
, document.getElementById('root'));
