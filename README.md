# react-modal2

> Simple modal component for React.

- Unopionated
- Stateless (dumb component)
- Accessible
- Built via [reusable](https://github.com/cloudflare/react-gateway) [collection](https://github.com/cloudflare/a11y-focus-scope) of [modules](https://github.com/cloudflare/a11y-focus-store)

## Installation

```js
$ npm install --save react-modal2
```

## Usage

ReactModal2 tries to be as minimal as possible. This means it requires a little
bit of setup, but gives you complete flexibility to do what you want.

Let's start off with the actual API of ReactModal2:

```js
<ReactModal2
  // A callback that gets called whenever the `esc` key is pressed, or the
  // backdrop is clicked.
  onClose={this.handleClose.bind(this)}

  // Enable/Disable calling `onClose` when the `esc` key is pressed.
  closeOnEsc={true}

  // Enable/Disable calling `onClose` when the backdrop is clicked.
  closeOnBackdropClick={true}

  // Add a className to either the backdrop or modal element.
  backdropClassName='my-custom-backdrop-class'
  modalClassName='my-custom-modal-class'

  // Add styles to either the backdrop or modal element.
  backdropStyles={{ my: 'custom', backdrop: 'styles' }}
  modalStyles={{ my: 'custom', modal: 'styles' }}>
  ...
</ReactModal2>
```

If we use it like this it will simply render those two elements in the dom like
this:

```html
<div> <!-- Backdrop -->
  <div>...</div> <!-- Modal -->
</div>
```

However, you likely want to render the modal somewhere else in the DOM (in most
cases at the end of the `document.body`.

For this there is a separate library called [`ReactGateway`](https://github.com/cloudflare/react-gateway).
You can use it like this:

```js
<ReactGateway to={document.body}>
  <ReactModal2 ...>
    ...
  </ReactModal2>
</ReactGateway>
```

Now this might seem like a lot to do every time you want to render a modal, but
this is by design. You are meant to wrap ReactModal2 with your own component
that you use everywhere. Your component can add it's own DOM, styles,
animations, and behavior.

```js
import React from 'react';
import ReactModal2 from 'react-modal2';
import ReactGateway from 'react-gateway';

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

  render() {
    return (
      <ReactGateway>
        <ReactModal2
          onClose={this.props.onClose}
          closeOnEsc={this.props.closeOnEsc}
          closeOnBackdropClick={this.props.closeOnEsc}
          backdropClassName='my-custom-backdrop-class'
          modalClassName='my-custom-modal-class'>
          {this.props.children}
        </ReactModal2>
      </ReactGateway>
    );
  }
}
```

Then you have your own ideal API for working with modals.

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
        <button onClick={this.handleOpen.bind(this)}>Open</button>
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

## Props

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

#### How do I render the modal elsewhere in the DOM?

ReactModal2 will render whereever you put it, you need to use a separate library
to render it in another location. [`ReactGateway`](https://github.com/cloudflare/react-gateway)
is the recommended solution, it's easy as:

```js
<ReactGateway>
  <ReactModal2 ...>
    ...
  </ReactModal2>
</ReactGateway>
```
