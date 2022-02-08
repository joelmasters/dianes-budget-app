import React from 'react';
import ReactDOM from 'react-dom';
import NewBucket from './NewBucket';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewBucket />, div);
  ReactDOM.unmountComponentAtNode(div);
});