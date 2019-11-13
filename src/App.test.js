import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shouldUpdate } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('resets correctly', () => {
  expect(shouldUpdate(1, 30)).toEqual(true);
  expect(shouldUpdate(25, 24)).toEqual(false); 
  expect(shouldUpdate(1, 1)).toEqual(false);
});
