import React from 'react';
import ReactDOM from 'react-dom';
import EditBucket from './EditBucket';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditBucket />, div);
  ReactDOM.unmountComponentAtNode(div);
});