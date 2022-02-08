import React from 'react';
import ReactDOM from 'react-dom';
import MainList from './MainList';

it('renders without crashing', () => {
  let buckets = [{
    name: 'test',
    left: 0,
    bucketClicked: () => {}
  }];

  const div = document.createElement('div');
  ReactDOM.render(<MainList buckets={buckets} />, div);
  ReactDOM.unmountComponentAtNode(div);
});