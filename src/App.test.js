import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NewPlanet from './components/NewPlanet';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Loading is being rendered on start', () => {
  const wrapper = shallow(<App />);
  const loading = <h1>Loading...</h1>;
  expect(wrapper.contains(loading)).toEqual(true);
});