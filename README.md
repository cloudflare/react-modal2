# react-modal2

> Simple modal component for React.

- Unopionated
- Stateless (dumb component)
- Accessible
- Universal/Isomorphic
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

For this there is a separate library called
[React Gateway](https://github.com/cloudflare/react-gateway). You can use it
like this:

```js
import {
  Gateway,
  GatewayDest,
  GatewayProvider
} from 'react-gateway';
import ReactModal2 from 'react-modal2';

class Application extends React.Component {
  render() {
    return (
      <GatewayProvider>
        <div className="app">
          <div className="app-content">
            <h1>My Application</h1>
            <Gateway into="modal">
              <ReactModal2 backdropClassName="modal-backdrop" modalClassName="modal">
                ...
              </ReactModal2>
            </Gateway>
          </div>
          <GatewayDest name="modal" className="modal-container"/>
        </div>
      </GatewayProvider>
    );
  }
}
```

Which will render as:

```html
<div class="app">
  <div class="app-content">
    <h1>My Application</h1>
    <noscript/>
  </div>
  <div class="modal-container">
    <div class="modal-backdrop">
      <div class="modal">...</div>
    </div>
  </div>
</div>
```

Now this might seem like a lot to do every time you want to render a modal, but
this is by design. You are meant to wrap ReactModal2 with your own component
that you use everywhere. Your component can add it's own DOM, styles,
animations, and behavior.

```js
import React from 'react';
import {Gateway} from 'react-gateway';
import ReactModal2 from 'react-modal2';

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
      <Gateway into="modal">
        <ReactModal2
          onClose={this.props.onClose}
          closeOnEsc={this.props.closeOnEsc}
          closeOnBackdropClick={this.props.closeOnEsc}
          backdropClassName='my-custom-backdrop-class'
          modalClassName='my-custom-modal-class'>
          {this.props.children}
        </ReactModal2>
      </Gateway>
    );
  }
}
```

Then simply setup your application once:

```js
import {
  GatewayDest,
  GatewayProvider
} from 'react-gateway';

export default class Application extends React.Component {
  render() {
    return (
      <GatewayProvider>
        <div className="app">
          <div className="app-content">
            ...
          </div>
          <GatewayDest name="modal" className="modal-container"/>
        </div>
      </GatewayProvider>
    );
  }
}
```

Then you have your own ideal API for working with modals in any of your
components.

```js
import MyCustomModal from './my-custom-modal';

export default class MyComponent extends React.Component {
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
| --- | --- | --- |
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

> **Note:** The root element should not contain the `GatewayDest` or whereever
> the modal is getting rendered. This will break all the things.

```js
import ReactModal2 from 'react-modal2';

ReactModal2.getApplicationElement = () => document.getElementById('application');
```

## FAQ

#### How do I close the modal?

ReactModal2 is designed to have no state, if you put it in the DOM then it will
render. So if you don't want to show it then simply do not render it in your
parent component. For this reason there is no `isOpen` property to pass.
