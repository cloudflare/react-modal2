import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import ReactGateway from 'react-gateway';
import ReactModal2 from '../../';

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
      <ReactGateway>
        <ReactModal2
          onClose={this.handleClose.bind(this)}
          closeOnEsc={this.props.closeOnEsc}
          closeOnBackdropClick={this.props.closeOnEsc}

          backdropClassName='modal-backdrop'
          modalClassName='modal'>
          {this.props.children}
        </ReactModal2>
      </ReactGateway>
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
      <div>
        <h1>ReactModal2 Example: Basic</h1>
        <button onClick={this.handleOpen.bind(this)}>Open Modal</button>
        {this.state.isModalOpen && (
          <Modal onClose={this.handleClose.bind(this)}>
            <h1>Hello from Modal</h1>
            <button onClick={this.handleClose.bind(this)}>Close Modal</button>
          </Modal>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactModal2.setApplicationElement(rootElement);
render(<Application/>, rootElement);
