import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import {
  Gateway,
  GatewayDest,
  GatewayProvider
} from 'react-gateway';
import ReactModal2 from '../../src/index';

class Modal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onAfterOpen:  PropTypes.func,
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
    const { closeOnEsc, onAfterOpen } = this.props;
    return (
      <Gateway into="example">
        <ReactModal2
          onClose={this.handleClose.bind(this)}
          closeOnEsc={closeOnEsc}
          closeOnBackdropClick={closeOnEsc}
          onAfterOpen={onAfterOpen}
          backdropClassName="modal-backdrop"
          modalClassName="modal">
          {this.props.children}
        </ReactModal2>
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

  onOpen() {
    console.log('calling onOpen');
  }

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
            <h1>ReactModal2 Example: Basic</h1>
            <button onClick={this.handleOpen.bind(this)}>Open Modal</button>
            {this.state.isModalOpen && (
              <Modal onClose={this.handleClose.bind(this)} onAfterOpen={this.onOpen.bind(this)}>
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

ReactModal2.getApplicationElement = () => document.getElementById('application');
render(<Application/>, document.getElementById('root'));
