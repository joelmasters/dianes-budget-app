import React from 'react';
import ReactDOM from 'react-dom';
import EditBucketInputs from './EditBucketInputs';

it('renders without crashing', () => {
  let bucket =  {
    name: 'test',
    left: 0,
    set: 0,
    endOfMonth: '',
    history: []}

  const div = document.createElement('div');
  ReactDOM.render(<EditBucketInputs bucket={bucket}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});