import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import ReactModal2 from '../src/index';

console.log(ReactModal2);

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

    var dom = <ReactModal2 onClose={onClose}/>;
    var instance = ReactDOM.render(dom, this.root);

    instance.handleDocumentKeydown({ keyCode: 27 });
    expect(called).to.be.true;
  });

  it('should not call `onClose` when the `esc` key is pressed but `closeOnEsc` is `false`', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = <ReactModal2 onClose={onClose} closeOnEsc={false}/>;
    var instance = ReactDOM.render(dom, this.root);

    instance.handleDocumentKeydown({ keyCode: 27 });
    expect(called).to.be.false;
  });

  it('should call `onClose` when the backdrop is clicked', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = <ReactModal2 onClose={onClose}/>;
    var instance = ReactDOM.render(dom, this.root);

    TestUtils.Simulate.mouseDown(instance.backdrop);
    TestUtils.Simulate.mouseUp(instance.backdrop);
    TestUtils.Simulate.click(instance.backdrop);

    expect(called).to.be.true;
  });

  it('should not call `onClose` when the backdrop is clicked but `closeOnBackdropClick` is `false`', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = <ReactModal2 onClose={onClose} closeOnBackdropClick={false}/>;
    var instance = ReactDOM.render(dom, this.root);

    TestUtils.Simulate.mouseDown(instance.backdrop);
    TestUtils.Simulate.mouseUp(instance.backdrop);
    TestUtils.Simulate.click(instance.backdrop);

    expect(called).to.be.false;
  });

  it('should not call `onClose` when the modal is the start target of a click', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = <ReactModal2 onClose={onClose}/>;
    var instance = ReactDOM.render(dom, this.root);

    TestUtils.Simulate.mouseDown(instance.modal);
    TestUtils.Simulate.mouseUp(instance.backdrop);
    TestUtils.Simulate.click(instance.backdrop);

    expect(called).to.be.false;
  });

  it('should not call `onClose` when the modal is the end target of a click', function() {
    var called = false;
    var onClose = function() { called = true; };

    var dom = <ReactModal2 onClose={onClose}/>;
    var instance = ReactDOM.render(dom, this.root);

    TestUtils.Simulate.mouseDown(instance.backdrop);
    TestUtils.Simulate.mouseUp(instance.modal);
    TestUtils.Simulate.click(instance.backdrop);

    expect(called).to.be.false;
  });
  
  it('should scope the focus on the modal when mounted', function() {
    var input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    var dom = <ReactModal2 onClose={function() {}}/>;
    var instance = ReactDOM.render(dom, this.root);

    expect(instance.modal).to.equal(document.activeElement);

    document.body.removeChild(input);
  });

  it('should return the focus on the modal when unmounted', function() {
    var input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    var dom = <ReactModal2 onClose={function() {}}/>;
    ReactDOM.render(dom, this.root);
    ReactDOM.unmountComponentAtNode(this.root);

    expect(input).to.equal(document.activeElement);

    document.body.removeChild(input);
  });

  it('should "hide" the applicationElement when mounted', function() {
    var applicationElement = document.createElement('div');
    document.body.appendChild(applicationElement);
    ReactModal2.getApplicationElement = () => applicationElement;

    var dom = <ReactModal2 onClose={function() {}}/>;
    ReactDOM.render(dom, this.root);

    expect(applicationElement.getAttribute('aria-hidden')).to.equal('true');

    document.body.removeChild(applicationElement);
    ReactModal2.getApplicationElement = () => {};
  });

  it('should "unhide" the applicationElement when mounted', function() {
    var applicationElement = document.createElement('div');
    document.body.appendChild(applicationElement);
    ReactModal2.getApplicationElement = () => applicationElement;

    var dom = <ReactModal2 onClose={function() {}}/>;
    ReactDOM.render(dom, this.root);
    ReactDOM.unmountComponentAtNode(this.root);

    expect(applicationElement.getAttribute('aria-hidden')).to.equal(null);

    document.body.removeChild(applicationElement);
    ReactModal2.getApplicationElement = () => {};
  });
});
