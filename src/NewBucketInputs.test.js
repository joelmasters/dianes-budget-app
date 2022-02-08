import React from 'react';
import ReactDOM from 'react-dom';
import NewBucketInputs from './NewBucketInputs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewBucketInputs />, div);
  ReactDOM.unmountComponentAtNode(div);
});