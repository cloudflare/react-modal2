import React from 'react';
import Application from './Application';
import ReactDOM from 'react-dom';
import ReactModal2 from '../../src/index';

ReactModal2.getApplicationElement = () => document.getElementById('application');
ReactDOM.render(<Application/>, document.getElementById('root'));
