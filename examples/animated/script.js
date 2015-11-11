import React, {PropTypes} from 'react';
import {render} from 'react-dom';
import ReactGateway from 'react-gateway';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ReactModal2 from '../../';

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
      <ReactGateway>
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
        <h1>ReactModal2 Example: Animated</h1>
        <button onClick={this.handleOpen.bind(this)}>Open Modal</button>
        <Modal onClose={this.handleClose.bind(this)} isOpen={this.state.isModalOpen}>
          <h1>Hello from Modal</h1>
          <button onClick={this.handleClose.bind(this)}>Close Modal</button>
        </Modal>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactModal2.setApplicationElement(rootElement);
render(<Application/>, rootElement);
