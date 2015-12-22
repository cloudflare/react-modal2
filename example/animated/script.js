import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {
  Gateway,
  GatewayDest,
  GatewayProvider
} from 'react-gateway';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ReactModal2 from '../../src/index';

class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
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
        <CSSTransitionGroup
          transitionName='modal'
          transitionAppear={true}
          transitionAppearTimeout={200}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.props.isOpen && (
            <ReactModal2
              key='modal'
              onClose={this.handleClose.bind(this)}
              closeOnEsc={this.props.closeOnEsc}
              closeOnBackdropClick={this.props.closeOnEsc}

              backdropClassName={'modal-backdrop'}
              modalClassName={'modal'}>
              {this.props.children}
            </ReactModal2>
          )}
        </CSSTransitionGroup>
      </Gateway>
    );
  }
}

class Application extends React.Component {
  constructor() {
    super();
  }

  state = {
    isModalOpen: false
  };

  handleOpen() {
    this.setState({ isModalOpen: true });
  }

  handleClose() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <GatewayProvider>
        <div>
          <div id="application">
            <h1>ReactModal2 Example: Animated</h1>
            <button onClick={this.handleOpen.bind(this)}>Open Modal</button>
            <Modal onClose={this.handleClose.bind(this)} isOpen={this.state.isModalOpen}>
              <h1>Hello from Modal</h1>
              <button onClick={this.handleClose.bind(this)}>Close Modal</button>
            </Modal>
          </div>
          <GatewayDest name="example"/>
        </div>
      </GatewayProvider>
    );
  }
}

ReactModal2.getApplicationElement = () => document.getElementById('application');
render(<Application/>, document.getElementById('root'));
