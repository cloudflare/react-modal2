'use strict';

var expect = require('chai').expect;
var React = require('react');
var ReactDOM = require('react-dom');
var d = React.createElement;
var TestUtils = require('react-addons-test-utils');

var ReactModal2 = require('./');

describe('ReactModal2', function() {
  beforeEach(function() {
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(this.root);
    document.body.removeChild(this.root);
    delete this.root;
  });

  it('should call `onClose` when the `esc` key is pressed', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = d(ReactModal2, { onClose: onClose });
    var instance = ReactDOM.render(dom, this.root);

    instance.handleDocumentKeydown({ keyCode: 27 });
    expect(called).to.be.true;
  });

  it('should not call `onClose` when the `esc` key is pressed but `closeOnEsc` is `false`', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = d(ReactModal2, { onClose: onClose, closeOnEsc: false });
    var instance = ReactDOM.render(dom, this.root);

    instance.handleDocumentKeydown({ keyCode: 27 });
    expect(called).to.be.false;
  });

  it('should call `onClose` when the backdrop is clicked', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = d(ReactModal2, { onClose: onClose });
    var instance = ReactDOM.render(dom, this.root);

    TestUtils.Simulate.click(instance.refs.backdrop);

    expect(called).to.be.true;
  });

  it('should not call `onClose` when the backdrop is clicked but `closeOnBackdropClick` is `false`', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = d(ReactModal2, { onClose: onClose, closeOnBackdropClick: false });
    var instance = ReactDOM.render(dom, this.root);

    TestUtils.Simulate.click(instance.refs.backdrop);

    expect(called).to.be.false;
  });

  it('should not call `onClose` when the modal is clicked', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = d(ReactModal2, { onClose: onClose });
    var instance = ReactDOM.render(dom, this.root);

    TestUtils.Simulate.click(instance.refs.modal);

    expect(called).to.be.false;
  });

  it('should scope the focus on the modal when mounted', function() {
    var input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    var dom = d(ReactModal2, { onClose: function() {} });
    var instance = ReactDOM.render(dom, this.root);

    expect(instance.refs.modal).to.equal(document.activeElement);

    document.body.removeChild(input);
  });

  it('should return the focus on the modal when unmounted', function() {
    var input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    var dom = d(ReactModal2, { onClose: function() {} });
    ReactDOM.render(dom, this.root);
    ReactDOM.unmountComponentAtNode(this.root);

    expect(input).to.equal(document.activeElement);

    document.body.removeChild(input);
  });

  it('should "hide" the applicationElement when mounted', function() {
    var applicationElement = document.createElement('div');
    document.body.appendChild(applicationElement);
    ReactModal2.setApplicationElement(applicationElement);

    var dom = d(ReactModal2, { onClose: function() {} });
    ReactDOM.render(dom, this.root);

    expect(applicationElement.getAttribute('aria-hidden')).to.equal('true');

    document.body.removeChild(applicationElement);
    ReactModal2.setApplicationElement(null);
  });

  it('should "unhide" the applicationElement when mounted', function() {
    var applicationElement = document.createElement('div');
    document.body.appendChild(applicationElement);
    ReactModal2.setApplicationElement(applicationElement);

    var dom = d(ReactModal2, { onClose: function() {} });
    ReactDOM.render(dom, this.root);
    ReactDOM.unmountComponentAtNode(this.root);

    expect(applicationElement.getAttribute('aria-hidden')).to.equal(null);

    document.body.removeChild(applicationElement);
    ReactModal2.setApplicationElement(null);
  });
});
