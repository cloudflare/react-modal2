# react-modal2

> Simple modal component for React. 

- Unopionated
- Stateless (dumb component)
- Accessible
- Built via [reusable](https://github.com/thejameskyle/react-gateway) [collection](https://github.com/thejameskyle/a11y-focus-scope) of [modules](https://github.com/thejameskyle/a11y-focus-store)

## Installation

```js
$ npm install --save react-modal2
```

## Usage

This library has as few opinions as possible. It's meant to be wrapped by your
own custom Modal components that adds styles, animations, and behavior.

```js
import React from 'react';
import ReactModal2 from 'react-modal2';

ReactModal2.setApplicationElement(document.getElementById('root'));

export default class MyCustomModal extends React.Component {
  static propTypes = {
    onClose: React.PropTypes.func.isRequired,
    closeOnEsc: React.PropTypes.bool,
    closeOnBackdropClick: React.PropTypes.bool
  };

  getDefaultProps() {
    return {
      closeOnEsc: true,
      closeOnBackdropClick: true
    };
  }

  handleClose() {
    this.props.onClose();
  }

  render() {
    return (
      <ReactModal2
        onClose={this.handleClose.bind(this)}
        closeOnEsc={this.props.closeOnEsc}
        closeOnBackdropClick={this.props.closeOnEsc}

        backdropClassName='my-custom-backdrop-class'
        modalClassName='my-custom-modal-class'

        backdropStyles={{ my: 'custom', backdrop: 'styles' }}
        modalStyles={{ my: 'custom', modal: 'styles' }}>
        {this.props.children}
      </ReactModal2>
    );
  }
}
```

```js
import MyCustomModal from './my-custom-modal';

export default class App extends React.Component {
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
        <button onClick={this.handleOpen}>Open</button>
        {this.state.isModalOpen && (
          <MyCustomModal onClose={this.handleClose.bind(this)}>
            <h1>Hello from Modal</h1>
            <button onClick={this.handleClose.bind(this)}>Close</button>
          </MyCustomModal>
        )}
      </div>
    );
  }
}
```

## Options

| Name | Type | Description |
| --- | --- | --- | --- |
| `onClose` | `Function` | **Required.** A callback to handle an event that is attempting to close the modal. |
| `closeOnEsc` | `Boolean` | Should this modal call `onClose` when the `esc` key is pressed? |
| `closeOnBackdropClick` | `Boolean` | Should this modal call `onClose` when the backdrop is clicked? |
| `backdropClassName` | `String` | An optional `className` for the backdrop element. |
| `modalClassName` | `String` | An optional `className` for the modal element. |
| `backdropStyles` | `Object` | Optional `style` for the backdrop element. |
| `modalStyles` | `Object` | Optional `style` for the modal element. |

## Accessibility

One of ReactModal2's opinions is that modals should be as accessible as
possible. It does much of the work for you, but there's one little thing you
need to help it with.

In order to "hide" your application from screenreaders while a modal is open
you need to let ReactModal2 what the root element for your application is.

> Note: The root element should not be `document.body`.

```js
import ReactModal2 from 'react-modal2';

ReactModal2.setApplicationElement(document.getElementById('root'));
```

## FAQ

#### How do I close the modal?

ReactModal2 is designed to have no state, if you put it in the DOM then it will
render. So if you don't want to show it then simply do not render it in your
parent component. For this reason there is no `isOpen` property to pass.
