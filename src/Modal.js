import React from 'react';
import PropTypes from 'prop-types';
import focusScope from 'a11y-focus-scope';
import focusStore from 'a11y-focus-store';
import ExecutionEnvironment from 'exenv';

function setFocusOn(applicationElement, element) {
  focusStore.storeFocus();
  if (applicationElement) applicationElement.setAttribute('aria-hidden', 'true');
  focusScope.scopeFocus(element);
}

function resetFocus(applicationElement) {
  focusScope.unscopeFocus();
  if (applicationElement) applicationElement.removeAttribute('aria-hidden');
  focusStore.restoreFocus();
}

export default class ReactModal2 extends React.Component {
  static getApplicationElement() {
    console.warn('`ReactModal2.getApplicationElement` needs to be set for accessibility reasons');
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,

    closeOnEsc: PropTypes.bool,
    closeOnBackdropClick: PropTypes.bool,

    backdropClassName: PropTypes.string,
    backdropStyles: PropTypes.object,

    modalClassName: PropTypes.string,
    modalStyles: PropTypes.object
  };

  static defaultProps = {
    closeOnEsc: true,
    closeOnBackdropClick: true
  };

  backdropMouseDown = false
  backdropMouseUp = false

  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      setFocusOn(ReactModal2.getApplicationElement(), this.modal);
      document.addEventListener('keydown', this.handleDocumentKeydown);
    }
  }

  componentWillUnmount() {
    if (ExecutionEnvironment.canUseDOM) {
      resetFocus(ReactModal2.getApplicationElement());
      document.removeEventListener('keydown', this.handleDocumentKeydown);
    }
  }

  handleDocumentKeydown = event => {
    if (this.props.closeOnEsc && event.keyCode === 27) {
      this.props.onClose();
    }
  }

  handleBackdropMouseDown = event => {
    this.backdropMouseDown = !this.modal.contains(event.target)
  }

  handleBackdropMouseUp = event => {
    this.backdropMouseUp = !this.modal.contains(event.target)
  }

  handleBackdropClick = () => {
    if (
      this.props.closeOnBackdropClick &&
      this.backdropMouseDown &&
      this.backdropMouseUp
    ) {
      this.props.onClose();
    }
    
    this.backdropMouseDown = false
    this.backdropMouseUp = false
  }

  handleModalClick = event => {
    event.stopPropagation();
  }

  render() {
    return (
      <div ref={i => this.backdrop = i}
        className={this.props.backdropClassName}
        style={this.props.backdropStyles}
        onMouseDown={this.handleBackdropMouseDown}
        onMouseUp={this.handleBackdropMouseUp}
        onClick={this.handleBackdropClick}>
        <div ref={i => this.modal = i}
          className={this.props.modalClassName}
          style={this.props.modalStyles}
          onClick={this.handleModalClick}
          tabIndex="-1">
          {this.props.children}
        </div>
      </div>
    );
  }
}
